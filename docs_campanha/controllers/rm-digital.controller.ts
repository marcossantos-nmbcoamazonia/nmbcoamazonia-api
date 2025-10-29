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
import { RMDigitalService } from '../services/rm-digital.service';
import { CampanhaLogService } from '../services/campanha-log.service';
import {
  CreateRMDigitalDto,
  UpdateRMDigitalDto,
} from '../dto/rm-digital.dto';

@ApiTags('docs_campanha')
@Controller('docs-campanha/rm-digital')
export class RMDigitalController {
  constructor(
    private readonly rmDigitalService: RMDigitalService,
    private readonly logService: CampanhaLogService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Criar novo RM Digital',
    description: 'Cria um novo registro de RM Digital associado a uma campanha',
  })
  @ApiResponse({
    status: 201,
    description: 'RM Digital criado com sucesso',
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos fornecidos',
  })
  @ApiResponse({
    status: 404,
    description: 'Campanha não encontrada',
  })
  async create(@Body() createRMDigitalDto: CreateRMDigitalDto) {
    const rmDigital = await this.rmDigitalService.create(createRMDigitalDto);
    return {
      success: true,
      data: rmDigital,
      message: 'RM Digital criado com sucesso',
    };
  }

  @Get()
  @ApiOperation({
    summary: 'Listar todos os RM Digitais',
    description: 'Retorna todos os registros de RM Digital cadastrados',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de RM Digitais retornada com sucesso',
  })
  async findAll() {
    const rmDigitais = await this.rmDigitalService.findAll();
    return {
      success: true,
      data: rmDigitais,
      total: rmDigitais.length,
      message: 'RM Digitais listados com sucesso',
    };
  }

  @Get('campanha/:campanhaId')
  @ApiOperation({
    summary: 'Listar RM Digitais por campanha',
    description: 'Retorna todos os registros de RM Digital de uma campanha específica',
  })
  @ApiParam({
    name: 'campanhaId',
    description: 'ID da campanha',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'RM Digitais da campanha retornados com sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'Campanha não encontrada',
  })
  async findByCampanha(@Param('campanhaId', ParseIntPipe) campanhaId: number) {
    const rmDigitais = await this.rmDigitalService.findByCampanha(campanhaId);
    return {
      success: true,
      data: rmDigitais,
      total: rmDigitais.length,
      message: 'RM Digitais da campanha listados com sucesso',
    };
  }

  @Get('search/veiculo')
  @ApiOperation({
    summary: 'Buscar RM Digitais por veículo',
    description: 'Busca registros de RM Digital que contenham o veículo especificado',
  })
  @ApiQuery({
    name: 'q',
    description: 'Nome do veículo para busca',
    example: 'Instagram',
  })
  @ApiResponse({
    status: 200,
    description: 'RM Digitais encontrados com sucesso',
  })
  async findByVeiculo(@Query('q') veiculo: string) {
    const rmDigitais = await this.rmDigitalService.findByVeiculo(veiculo);
    return {
      success: true,
      data: rmDigitais,
      total: rmDigitais.length,
      message: 'Busca realizada com sucesso',
    };
  }

  @Get('search/tipo-midia')
  @ApiOperation({
    summary: 'Buscar RM Digitais por tipo de mídia',
    description: 'Busca registros de RM Digital que contenham o tipo de mídia especificado',
  })
  @ApiQuery({
    name: 'q',
    description: 'Tipo de mídia para busca',
    example: 'Social Media',
  })
  @ApiResponse({
    status: 200,
    description: 'RM Digitais encontrados com sucesso',
  })
  async findByTipoMidia(@Query('q') tipoMidia: string) {
    const rmDigitais = await this.rmDigitalService.findByTipoMidia(tipoMidia);
    return {
      success: true,
      data: rmDigitais,
      total: rmDigitais.length,
      message: 'Busca realizada com sucesso',
    };
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Buscar RM Digital por ID',
    description: 'Retorna um registro específico de RM Digital pelo ID',
  })
  @ApiParam({
    name: 'id',
    description: 'ID do RM Digital',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'RM Digital encontrado com sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'RM Digital não encontrado',
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const rmDigital = await this.rmDigitalService.findOne(id);
    return {
      success: true,
      data: rmDigital,
      message: 'RM Digital encontrado com sucesso',
    };
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Atualizar RM Digital',
    description: 'Atualiza dados de um registro de RM Digital existente',
  })
  @ApiParam({
    name: 'id',
    description: 'ID do RM Digital',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'RM Digital atualizado com sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'RM Digital não encontrado',
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRMDigitalDto: UpdateRMDigitalDto,
  ) {
    const rmDigital = await this.rmDigitalService.update(id, updateRMDigitalDto);
    return {
      success: true,
      data: rmDigital,
      message: 'RM Digital atualizado com sucesso',
    };
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Excluir RM Digital',
    description: 'Remove um registro de RM Digital do sistema',
  })
  @ApiParam({
    name: 'id',
    description: 'ID do RM Digital',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'RM Digital excluído com sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'RM Digital não encontrado',
  })
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.rmDigitalService.remove(id);
    return {
      success: true,
      message: 'RM Digital excluído com sucesso',
    };
  }

  @Get(':id/logs')
  @ApiOperation({
    summary: 'Buscar logs de um RM Digital',
    description: 'Retorna o histórico de alterações de um registro específico de RM Digital',
  })
  @ApiParam({
    name: 'id',
    description: 'ID do RM Digital',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Logs do RM Digital retornados com sucesso',
  })
  async getRMDigitalLogs(@Param('id', ParseIntPipe) id: number) {
    const logs = await this.logService.getLogsByEntity('RMDigital', id);
    return {
      success: true,
      data: logs,
      total: logs.length,
      message: 'Logs recuperados com sucesso',
    };
  }
}