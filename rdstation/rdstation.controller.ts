import { Controller, Get, Post, Body, Query, Redirect, Res } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiBody, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { RdStationService } from './rdstation.service';

@ApiTags('rdstation')
@Controller('rdstation')
export class RdStationController {
  constructor(private readonly rdStationService: RdStationService) {}

  // ─── 1. Iniciar fluxo OAuth ───────────────────────────────────────────────
  @Get('auth')
  @ApiOperation({ summary: 'Iniciar autorização OAuth RD Station' })
  @Redirect()
  auth() {
    const url = this.rdStationService.getAuthorizationUrl();
    return { url, statusCode: 302 };
  }

  // ─── 2. Callback OAuth ────────────────────────────────────────────────────
  @Get('callback')
  @ApiOperation({ summary: 'Callback OAuth — troca code por tokens' })
  @ApiQuery({ name: 'code', required: true })
  async callback(@Query('code') code: string, @Res() res: Response) {
    try {
      await this.rdStationService.exchangeCodeForTokens(code);
      return res.status(200).send(`
        <html><body style="font-family:sans-serif;text-align:center;padding:60px">
          <h2 style="color:#16a34a">✅ RD Station autorizado com sucesso!</h2>
          <p>Você pode fechar esta janela.</p>
        </body></html>
      `);
    } catch (error) {
      return res.status(500).send(`
        <html><body style="font-family:sans-serif;text-align:center;padding:60px">
          <h2 style="color:#dc2626">❌ Erro ao autorizar</h2>
          <p>${error.message}</p>
        </body></html>
      `);
    }
  }

  // ─── 3. Injetar tokens manualmente ───────────────────────────────────────
  @Post('set-tokens')
  @ApiOperation({
    summary: 'Salvar tokens manualmente',
    description: 'Use este endpoint para salvar o access_token e refresh_token obtidos manualmente via curl.',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        access_token: { type: 'string' },
        refresh_token: { type: 'string' },
        expires_in: { type: 'number', description: 'Segundos até expirar (padrão: 86400)' },
      },
      required: ['access_token', 'refresh_token'],
    },
  })
  async setTokens(
    @Body('access_token') accessToken: string,
    @Body('refresh_token') refreshToken: string,
    @Body('expires_in') expiresIn?: number,
  ) {
    try {
      await this.rdStationService.saveTokensManually(accessToken, refreshToken, expiresIn ?? 86400);
      return { success: true, message: 'Tokens salvos com sucesso.' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // ─── 3b. Diagnóstico ──────────────────────────────────────────────────────
  @Get('diagnose')
  @ApiOperation({ summary: 'Diagnóstico de conexão MongoDB e tokens' })
  async diagnose() {
    return this.rdStationService.diagnose();
  }

  // ─── 4. Status ────────────────────────────────────────────────────────────
  @Get('status')
  @ApiOperation({ summary: 'Verificar status da autorização RD Station' })
  async status() {
    const authorized = await this.rdStationService.isAuthorized();
    return {
      success: true,
      authorized,
      message: authorized
        ? 'RD Station autorizado.'
        : 'RD Station não autorizado. Use POST /rdstation/set-tokens ou GET /rdstation/auth.',
    };
  }

  // ─── 5. Leads / Contacts ─────────────────────────────────────────────────
  @Get('leads')
  @ApiOperation({ summary: 'Buscar contatos/leads do RD Station' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'page_size', required: false, type: Number })
  @ApiQuery({ name: 'email', required: false, type: String })
  @ApiResponse({ status: 200, description: 'Contatos retornados com sucesso' })
  async getLeads(
    @Query('page') page?: number,
    @Query('page_size') pageSize?: number,
    @Query('email') email?: string,
  ) {
    try {
      const data = await this.rdStationService.getLeads({
        page: page ? Number(page) : 1,
        pageSize: pageSize ? Math.min(Number(pageSize), 125) : 100,
        email,
      });
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // ─── 6. Conversions ──────────────────────────────────────────────────────
  @Get('conversions')
  @ApiOperation({ summary: 'Buscar conversões do RD Station' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'page_size', required: false, type: Number })
  async getConversions(
    @Query('page') page?: number,
    @Query('page_size') pageSize?: number,
  ) {
    try {
      const data = await this.rdStationService.getConversions({
        page: page ? Number(page) : 1,
        pageSize: pageSize ? Math.min(Number(pageSize), 125) : 100,
      });
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
