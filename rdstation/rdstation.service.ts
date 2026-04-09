import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';

// Arquivo local para persistir tokens entre restarts (simples e sem dependência de DB)
const TOKEN_FILE = path.join(__dirname, '..', '..', '.rdstation-tokens.json');

interface TokenStore {
  access_token: string;
  refresh_token: string;
  expires_at: number; // timestamp ms
}

@Injectable()
export class RdStationService {
  private readonly logger = new Logger(RdStationService.name);

  private readonly clientId = process.env.RDSTATION_CLIENT_ID;
  private readonly clientSecret = process.env.RDSTATION_CLIENT_SECRET;
  private readonly redirectUri = process.env.RDSTATION_REDIRECT_URI;
  private readonly authBaseUrl = 'https://api.rd.services/auth';
  private readonly apiBaseUrl = 'https://api.rd.services';

  // ─── Token persistence ────────────────────────────────────────────────────

  private readTokens(): TokenStore | null {
    try {
      if (fs.existsSync(TOKEN_FILE)) {
        return JSON.parse(fs.readFileSync(TOKEN_FILE, 'utf8'));
      }
    } catch {
      // ignore
    }
    return null;
  }

  private writeTokens(tokens: TokenStore): void {
    fs.writeFileSync(TOKEN_FILE, JSON.stringify(tokens, null, 2), 'utf8');
  }

  // ─── OAuth URLs ───────────────────────────────────────────────────────────

  getAuthorizationUrl(): string {
    const params = new URLSearchParams({
      client_id: this.clientId,
      redirect_uri: this.redirectUri,
    });
    return `${this.authBaseUrl}/dialog?${params.toString()}`;
  }

  // ─── Token exchange ───────────────────────────────────────────────────────

  async exchangeCodeForTokens(code: string): Promise<void> {
    const response = await axios.post(`${this.authBaseUrl}/token`, {
      client_id: this.clientId,
      client_secret: this.clientSecret,
      redirect_uri: this.redirectUri,
      code,
    });

    const { access_token, refresh_token, expires_in } = response.data;
    this.writeTokens({
      access_token,
      refresh_token,
      expires_at: Date.now() + expires_in * 1000,
    });

    this.logger.log('Tokens RD Station salvos com sucesso.');
  }

  // ─── Token refresh ────────────────────────────────────────────────────────

  private async refreshAccessToken(refreshToken: string): Promise<TokenStore> {
    const response = await axios.post(`${this.authBaseUrl}/token`, {
      client_id: this.clientId,
      client_secret: this.clientSecret,
      refresh_token: refreshToken,
    });

    const { access_token, refresh_token, expires_in } = response.data;
    const store: TokenStore = {
      access_token,
      refresh_token: refresh_token || refreshToken,
      expires_at: Date.now() + expires_in * 1000,
    };

    this.writeTokens(store);
    this.logger.log('Access token RD Station renovado.');
    return store;
  }

  // ─── Get valid access token ───────────────────────────────────────────────

  async getValidAccessToken(): Promise<string> {
    let store = this.readTokens();

    if (!store) {
      throw new Error('RD Station não autorizado. Acesse /rdstation/auth para iniciar.');
    }

    // Renovar se expirar em menos de 5 minutos
    if (Date.now() >= store.expires_at - 5 * 60 * 1000) {
      store = await this.refreshAccessToken(store.refresh_token);
    }

    return store.access_token;
  }

  // ─── Leads / Conversions ─────────────────────────────────────────────────

  async getLeads(params: {
    page?: number;
    pageSize?: number;
    email?: string;
  } = {}): Promise<any> {
    const accessToken = await this.getValidAccessToken();

    const { page = 1, pageSize = 100, email } = params;

    const query: Record<string, any> = {
      page,
      page_size: pageSize,
    };

    if (email) query.email = email;

    const response = await axios.get(`${this.apiBaseUrl}/platform/contacts`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      params: query,
    });

    return response.data;
  }

  async getConversions(params: {
    page?: number;
    pageSize?: number;
  } = {}): Promise<any> {
    const accessToken = await this.getValidAccessToken();
    const { page = 1, pageSize = 100 } = params;

    const response = await axios.get(`${this.apiBaseUrl}/platform/conversions`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      params: { page, page_size: pageSize },
    });

    return response.data;
  }

  isAuthorized(): boolean {
    return this.readTokens() !== null;
  }
}
