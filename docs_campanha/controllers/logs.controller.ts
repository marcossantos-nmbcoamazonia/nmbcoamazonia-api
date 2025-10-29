import {
  Controller,
  Get,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
} from '@nestjs/swagger';
import { CampanhaLogService } from '../services/campanha-log.service';

@ApiTags('docs_campanha')
@Controller('docs-campanha/logs')
export class LogsController {
  constructor(private readonly logService: CampanhaLogService) {}

  @Get()
  @ApiOperation({
    summary: 'Listar todos os logs',
    description: 'Retorna todos os logs de alterações do sistema de campanhas',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de logs retornada com sucesso',
  })
  async getAllLogs() {
    const logs = await this.logService.getAllLogs();
    return {
      success: true,
      data: logs,
      total: logs.length,
      message: 'Logs listados com sucesso',
    };
  }

  @Get('entity')
  @ApiOperation({
    summary: 'Buscar logs por entidade',
    description: 'Retorna logs de uma entidade específica (Campanha, RMDigital, etc.)',
  })
  @ApiQuery({
    name: 'type',
    description: 'Tipo da entidade',
    example: 'Campanha',
  })
  @ApiQuery({
    name: 'id',
    description: 'ID da entidade',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Logs da entidade retornados com sucesso',
  })
  async getLogsByEntity(
    @Query('type') entityType: string,
    @Query('id', ParseIntPipe) entityId: number,
  ) {
    const logs = await this.logService.getLogsByEntity(entityType, entityId);
    return {
      success: true,
      data: logs,
      total: logs.length,
      message: 'Logs da entidade recuperados com sucesso',
    };
  }

  @Get('user')
  @ApiOperation({
    summary: 'Buscar logs por usuário',
    description: 'Retorna todos os logs de alterações feitas por um usuário específico',
  })
  @ApiQuery({
    name: 'userId',
    description: 'ID do usuário',
    example: 'user123',
  })
  @ApiResponse({
    status: 200,
    description: 'Logs do usuário retornados com sucesso',
  })
  async getLogsByUser(@Query('userId') userId: string) {
    const logs = await this.logService.getLogsByUser(userId);
    return {
      success: true,
      data: logs,
      total: logs.length,
      message: 'Logs do usuário recuperados com sucesso',
    };
  }

  @Get('date-range')
  @ApiOperation({
    summary: 'Buscar logs por período',
    description: 'Retorna logs de alterações dentro de um período específico',
  })
  @ApiQuery({
    name: 'startDate',
    description: 'Data de início (ISO string)',
    example: '2024-12-01T00:00:00.000Z',
  })
  @ApiQuery({
    name: 'endDate',
    description: 'Data de fim (ISO string)',
    example: '2024-12-31T23:59:59.000Z',
  })
  @ApiResponse({
    status: 200,
    description: 'Logs do período retornados com sucesso',
  })
  async getLogsByDateRange(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    const logs = await this.logService.getLogsByDateRange(
      new Date(startDate),
      new Date(endDate),
    );
    return {
      success: true,
      data: logs,
      total: logs.length,
      message: 'Logs do período recuperados com sucesso',
    };
  }
}