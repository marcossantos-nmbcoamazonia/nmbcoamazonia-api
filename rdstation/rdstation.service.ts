import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { MongoClient, Db } from 'mongodb';

interface TokenStore {
  access_token: string;
  refresh_token: string;
  expires_at: number; // timestamp ms
}

@Injectable()
export class RdStationService {
  private readonly logger = new Logger(RdStationService.name);

  private readonly clientId = process.env.RDSTATION_CLIENT_ID ?? '';
  private readonly clientSecret = process.env.RDSTATION_CLIENT_SECRET ?? '';
  private readonly redirectUri = process.env.RDSTATION_REDIRECT_URI ?? '';
  private readonly tokenUrl = 'https://api.rd.services/auth/token';
  private readonly authBaseUrl = 'https://api.rd.services/auth';
  private readonly apiBaseUrl = 'https://api.rd.services';

  private db: Db | null = null;

  // ─── MongoDB connection ───────────────────────────────────────────────────

  private async getDb(): Promise<Db> {
    if (this.db) return this.db;
    const client = new MongoClient(process.env.DB_MONBO ?? '');
    await client.connect();
    this.db = client.db('rdstation');
    return this.db;
  }

  // ─── Token persistence (MongoDB) ─────────────────────────────────────────

  private async readTokens(): Promise<TokenStore | null> {
    try {
      const db = await this.getDb();
      const doc = await db.collection('tokens').findOne({ _id: 'rdstation' as any });
      if (!doc) return null;
      return {
        access_token: doc.access_token,
        refresh_token: doc.refresh_token,
        expires_at: doc.expires_at,
      };
    } catch (err) {
      this.logger.error('Erro ao ler tokens do MongoDB:', err);
      return null;
    }
  }

  private async writeTokens(tokens: TokenStore): Promise<void> {
    try {
      const db = await this.getDb();
      await db.collection('tokens').updateOne(
        { _id: 'rdstation' as any },
        { $set: { ...tokens, updated_at: new Date() } },
        { upsert: true },
      );
      this.logger.log('Tokens RD Station salvos no MongoDB.');
    } catch (err) {
      this.logger.error('Erro ao salvar tokens no MongoDB:', err);
    }
  }

  // ─── OAuth URL ────────────────────────────────────────────────────────────

  getAuthorizationUrl(): string {
    const params = new URLSearchParams({
      client_id: this.clientId,
      redirect_uri: this.redirectUri,
    });
    return `${this.authBaseUrl}/dialog?${params.toString()}`;
  }

  // ─── Salvar tokens manualmente (code já obtido externamente) ─────────────

  async saveTokensManually(accessToken: string, refreshToken: string, expiresIn = 86400): Promise<void> {
    await this.writeTokens({
      access_token: accessToken,
      refresh_token: refreshToken,
      expires_at: Date.now() + expiresIn * 1000,
    });
  }

  // ─── Token exchange (via callback) ───────────────────────────────────────

  async exchangeCodeForTokens(code: string): Promise<void> {
    const response = await axios.post(
      `${this.tokenUrl}?token_by=code`,
      {
        client_id: this.clientId,
        client_secret: this.clientSecret,
        code,
      },
      { headers: { 'Content-Type': 'application/json' } },
    );

    const { access_token, refresh_token, expires_in } = response.data;
    await this.writeTokens({
      access_token,
      refresh_token,
      expires_at: Date.now() + (expires_in ?? 86400) * 1000,
    });
  }

  // ─── Token refresh ────────────────────────────────────────────────────────

  private async refreshAccessToken(refreshToken: string): Promise<TokenStore> {
    const response = await axios.post(
      `${this.tokenUrl}?token_by=refresh_token`,
      {
        client_id: this.clientId,
        client_secret: this.clientSecret,
        refresh_token: refreshToken,
      },
      { headers: { 'Content-Type': 'application/json' } },
    );

    const { access_token, refresh_token, expires_in } = response.data;
    const store: TokenStore = {
      access_token,
      refresh_token: refresh_token ?? refreshToken,
      expires_at: Date.now() + (expires_in ?? 86400) * 1000,
    };

    await this.writeTokens(store);
    this.logger.log('Access token RD Station renovado.');
    return store;
  }

  // ─── Get valid access token (com renovação automática) ───────────────────

  async getValidAccessToken(): Promise<string> {
    let store = await this.readTokens();

    if (!store) {
      throw new Error('RD Station não autorizado. Acesse /rdstation/auth ou /rdstation/set-tokens.');
    }

    // Tentar usar o token atual; se retornar 401, renovar
    try {
      const test = await axios.get(`${this.apiBaseUrl}/platform/contacts?page_size=1`, {
        headers: { Authorization: `Bearer ${store.access_token}` },
        validateStatus: (s) => s < 500,
      });

      if (test.status === 401) {
        this.logger.log('Access token expirado, renovando via refresh_token...');
        store = await this.refreshAccessToken(store.refresh_token);
      }
    } catch {
      // Se a verificação falhar por outro motivo, tenta renovar mesmo assim
      store = await this.refreshAccessToken(store.refresh_token);
    }

    return store.access_token;
  }

  // ─── Leads / Contacts ────────────────────────────────────────────────────

  async getLeads(params: { page?: number; pageSize?: number; email?: string } = {}): Promise<any> {
    const accessToken = await this.getValidAccessToken();
    const { page = 1, pageSize = 100, email } = params;

    const query: Record<string, any> = { page, page_size: pageSize };
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

  async getConversions(params: { page?: number; pageSize?: number } = {}): Promise<any> {
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

  async isAuthorized(): Promise<boolean> {
    const tokens = await this.readTokens();
    return tokens !== null;
  }
}
