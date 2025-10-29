import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { CampanhaService } from '../services/campanha.service';
import { CampanhaLogService } from '../services/campanha-log.service';
import {
  CreateCampanhaDto,
  UpdateCampanhaDto,
  CampanhaResponseDto,
} from '../dto/campanha.dto';

@ApiTags('docs_campanha')
@Controller('docs-campanha/campanhas')
export class CampanhaController {
  constructor(
    private readonly campanhaService: CampanhaService,
    private readonly logService: CampanhaLogService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Criar nova campanha',
    description: 'Cria uma nova campanha no sistema',
  })
  @ApiResponse({
    status: 201,
    description: 'Campanha criada com sucesso',
    type: CampanhaResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos fornecidos',
  })
  async create(@Body() createCampanhaDto: CreateCampanhaDto) {
    const campanha = await this.campanhaService.create(createCampanhaDto);
    return {
      success: true,
      data: campanha,
      message: 'Campanha criada com sucesso',
    };
  }

  @Get()
  @ApiOperation({
    summary: 'Listar todas as campanhas',
    description: 'Retorna todas as campanhas cadastradas no sistema',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de campanhas retornada com sucesso',
    type: [CampanhaResponseDto],
  })
  async findAll() {
    const campanhas = await this.campanhaService.findAll();
    return {
      success: true,
      data: campanhas,
      total: campanhas.length,
      message: 'Campanhas listadas com sucesso',
    };
  }

  @Get('search/numero-acao')
  @ApiOperation({
    summary: 'Buscar campanhas por número da ação',
    description: 'Busca campanhas que contenham o número da ação especificado',
  })
  @ApiQuery({
    name: 'q',
    description: 'Número da ação para busca',
    example: 'A2024/001',
  })
  @ApiResponse({
    status: 200,
    description: 'Campanhas encontradas com sucesso',
    type: [CampanhaResponseDto],
  })
  async findByNumeroAcao(@Query('q') numeroAcao: string) {
    const campanhas = await this.campanhaService.findByNumeroAcao(numeroAcao);
    return {
      success: true,
      data: campanhas,
      total: campanhas.length,
      message: 'Busca realizada com sucesso',
    };
  }

  @Get('search/numero-projeto')
  @ApiOperation({
    summary: 'Buscar campanhas por número do projeto',
    description: 'Busca campanhas que contenham o número do projeto especificado',
  })
  @ApiQuery({
    name: 'q',
    description: 'Número do projeto para busca',
    example: 'P2024/001',
  })
  @ApiResponse({
    status: 200,
    description: 'Campanhas encontradas com sucesso',
    type: [CampanhaResponseDto],
  })
  async findByNumeroProjeto(@Query('q') numeroProjeto: string) {
    const campanhas = await this.campanhaService.findByNumeroProjeto(numeroProjeto);
    return {
      success: true,
      data: campanhas,
      total: campanhas.length,
      message: 'Busca realizada com sucesso',
    };
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Buscar campanha por ID',
    description: 'Retorna uma campanha específica pelo ID',
  })
  @ApiParam({
    name: 'id',
    description: 'ID da campanha',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Campanha encontrada com sucesso',
    type: CampanhaResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Campanha não encontrada',
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const campanha = await this.campanhaService.findOne(id);
    return {
      success: true,
      data: campanha,
      message: 'Campanha encontrada com sucesso',
    };
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Atualizar campanha',
    description: 'Atualiza dados de uma campanha existente',
  })
  @ApiParam({
    name: 'id',
    description: 'ID da campanha',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Campanha atualizada com sucesso',
    type: CampanhaResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Campanha não encontrada',
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCampanhaDto: UpdateCampanhaDto,
  ) {
    const campanha = await this.campanhaService.update(id, updateCampanhaDto);
    return {
      success: true,
      data: campanha,
      message: 'Campanha atualizada com sucesso',
    };
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Excluir campanha',
    description: 'Remove uma campanha do sistema',
  })
  @ApiParam({
    name: 'id',
    description: 'ID da campanha',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Campanha excluída com sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'Campanha não encontrada',
  })
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.campanhaService.remove(id);
    return {
      success: true,
      message: 'Campanha excluída com sucesso',
    };
  }

  @Get(':id/logs')
  @ApiOperation({
    summary: 'Buscar logs de uma campanha',
    description: 'Retorna o histórico de alterações de uma campanha específica',
  })
  @ApiParam({
    name: 'id',
    description: 'ID da campanha',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Logs da campanha retornados com sucesso',
  })
  async getCampanhaLogs(@Param('id', ParseIntPipe) id: number) {
    const logs = await this.logService.getLogsByEntity('Campanha', id);
    return {
      success: true,
      data: logs,
      total: logs.length,
      message: 'Logs recuperados com sucesso',
    };
  }
}