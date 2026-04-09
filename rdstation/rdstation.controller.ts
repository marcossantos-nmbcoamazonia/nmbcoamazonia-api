import { Controller, Get, Query, Redirect, Res } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { RdStationService } from './rdstation.service';

@ApiTags('rdstation')
@Controller('rdstation')
export class RdStationController {
  constructor(private readonly rdStationService: RdStationService) {}

  // ─── 1. Iniciar fluxo OAuth ───────────────────────────────────────────────
  @Get('auth')
  @ApiOperation({
    summary: 'Iniciar autorização OAuth RD Station',
    description: 'Redireciona para a tela de autorização do RD Station. Acesse pelo navegador uma única vez.',
  })
  @Redirect()
  auth() {
    const url = this.rdStationService.getAuthorizationUrl();
    return { url, statusCode: 302 };
  }

  // ─── 2. Callback OAuth ────────────────────────────────────────────────────
  @Get('callback')
  @ApiOperation({
    summary: 'Callback OAuth RD Station',
    description: 'Endpoint chamado pelo RD Station após autorização. Troca o code pelo access_token.',
  })
  @ApiQuery({ name: 'code', required: true, description: 'Código de autorização retornado pelo RD Station' })
  async callback(@Query('code') code: string, @Res() res: Response) {
    try {
      await this.rdStationService.exchangeCodeForTokens(code);
      return res.status(200).send(`
        <html>
          <body style="font-family: sans-serif; text-align: center; padding: 60px;">
            <h2 style="color: #16a34a;">✅ RD Station autorizado com sucesso!</h2>
            <p>Você pode fechar esta janela.</p>
          </body>
        </html>
      `);
    } catch (error) {
      return res.status(500).send(`
        <html>
          <body style="font-family: sans-serif; text-align: center; padding: 60px;">
            <h2 style="color: #dc2626;">❌ Erro ao autorizar</h2>
            <p>${error.message}</p>
          </body>
        </html>
      `);
    }
  }

  // ─── 3. Status da autorização ─────────────────────────────────────────────
  @Get('status')
  @ApiOperation({ summary: 'Verificar status da autorização RD Station' })
  status() {
    const authorized = this.rdStationService.isAuthorized();
    return {
      success: true,
      authorized,
      message: authorized
        ? 'RD Station autorizado. Tokens disponíveis.'
        : 'RD Station não autorizado. Acesse /rdstation/auth.',
    };
  }

  // ─── 4. Buscar contatos / leads ───────────────────────────────────────────
  @Get('leads')
  @ApiOperation({
    summary: 'Buscar contatos/leads do RD Station',
    description: 'Retorna os contatos cadastrados no RD Station Marketing.',
  })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Página (padrão: 1)' })
  @ApiQuery({ name: 'page_size', required: false, type: Number, description: 'Itens por página (padrão: 100, máx: 125)' })
  @ApiQuery({ name: 'email', required: false, type: String, description: 'Filtrar por e-mail' })
  @ApiResponse({ status: 200, description: 'Contatos retornados com sucesso' })
  @ApiResponse({ status: 401, description: 'RD Station não autorizado' })
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
      return {
        success: false,
        error: error.message,
        hint: 'Acesse /rdstation/auth para autorizar o RD Station.',
      };
    }
  }

  // ─── 5. Buscar conversões ─────────────────────────────────────────────────
  @Get('conversions')
  @ApiOperation({
    summary: 'Buscar conversões do RD Station',
    description: 'Retorna as conversões registradas no RD Station Marketing.',
  })
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
      return {
        success: false,
        error: error.message,
        hint: 'Acesse /rdstation/auth para autorizar o RD Station.',
      };
    }
  }
}
