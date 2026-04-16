import { Controller, Get, Post, Body, Query } from '@nestjs/common'
import { AnalysisService } from './analysis.service'

@Controller('analysis')
export class AnalysisController {
  constructor(private readonly analysisService: AnalysisService) {}

  @Get('cache')
  async getCache(
    @Query('dataKey') dataKey: string,
    @Query('date') date?: string,
  ) {
    if (!dataKey) return { error: 'dataKey é obrigatório' }
    const doc = await this.analysisService.get(dataKey, date)
    if (!doc) return { cached: false, message: 'Análise não encontrada' }
    return { analysis: doc.analysis, cached: true, timestamp: doc.timestamp }
  }

  @Post('cache')
  async setCache(
    @Body() body: { dataKey: string; analysis: string },
  ) {
    const { dataKey, analysis } = body
    if (!dataKey || !analysis) return { error: 'dataKey e analysis são obrigatórios' }
    await this.analysisService.set(dataKey, analysis)
    return { cached: false, message: 'Análise salva', timestamp: new Date().toISOString() }
  }
}
