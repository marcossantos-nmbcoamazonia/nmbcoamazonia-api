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
import { TaxonomiaParametrizacaoService } from '../services/taxonomia-parametrizacao.service';
import { CampanhaLogService } from '../services/campanha-log.service';
import {
  CreateTaxonomiaParametrizacaoDto,
  UpdateTaxonomiaParametrizacaoDto,
} from '../dto/taxonomia-parametrizacao.dto';

@ApiTags('docs_campanha')
@Controller('docs-campanha/taxonomia-parametrizacao')
export class TaxonomiaParametrizacaoController {
  constructor(
    private readonly taxonomiaParametrizacaoService: TaxonomiaParametrizacaoService,
    private readonly logService: CampanhaLogService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Criar nova taxonomia/parametrização',
    description: 'Cria um novo registro de taxonomia/parametrização associado a uma campanha',
  })
  @ApiResponse({
    status: 201,
    description: 'Taxonomia/parametrização criada com sucesso',
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos fornecidos',
  })
  @ApiResponse({
    status: 404,
    description: 'Campanha não encontrada',
  })
  async create(@Body() createTaxonomiaParametrizacaoDto: CreateTaxonomiaParametrizacaoDto) {
    const taxonomiaParametrizacao = await this.taxonomiaParametrizacaoService.create(createTaxonomiaParametrizacaoDto);
    return {
      success: true,
      data: taxonomiaParametrizacao,
      message: 'Taxonomia/parametrização criada com sucesso',
    };
  }

  @Get()
  @ApiOperation({
    summary: 'Listar todas as taxonomias/parametrizações',
    description: 'Retorna todos os registros de taxonomias/parametrizações cadastrados',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de taxonomias/parametrizações retornada com sucesso',
  })
  async findAll() {
    const taxonomiaParametrizacoes = await this.taxonomiaParametrizacaoService.findAll();
    return {
      success: true,
      data: taxonomiaParametrizacoes,
      total: taxonomiaParametrizacoes.length,
      message: 'Taxonomias/parametrizações listadas com sucesso',
    };
  }

  @Get('campanha/:campanhaId')
  @ApiOperation({
    summary: 'Listar taxonomias/parametrizações por campanha',
    description: 'Retorna todos os registros de taxonomias/parametrizações de uma campanha específica',
  })
  @ApiParam({
    name: 'campanhaId',
    description: 'ID da campanha',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Taxonomias/parametrizações da campanha retornadas com sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'Campanha não encontrada',
  })
  async findByCampanha(@Param('campanhaId', ParseIntPipe) campanhaId: number) {
    const taxonomiaParametrizacoes = await this.taxonomiaParametrizacaoService.findByCampanha(campanhaId);
    return {
      success: true,
      data: taxonomiaParametrizacoes,
      total: taxonomiaParametrizacoes.length,
      message: 'Taxonomias/parametrizações da campanha listadas com sucesso',
    };
  }

  @Get('search/advertiser')
  @ApiOperation({
    summary: 'Buscar taxonomias/parametrizações por advertiser',
    description: 'Busca registros que contenham o advertiser especificado',
  })
  @ApiQuery({
    name: 'q',
    description: 'Advertiser para busca',
    example: 'Brasil Seguradora',
  })
  @ApiResponse({
    status: 200,
    description: 'Taxonomias/parametrizações encontradas com sucesso',
  })
  async findByAdvertiser(@Query('q') advertiser: string) {
    const taxonomiaParametrizacoes = await this.taxonomiaParametrizacaoService.findByAdvertiser(advertiser);
    return {
      success: true,
      data: taxonomiaParametrizacoes,
      total: taxonomiaParametrizacoes.length,
      message: 'Busca realizada com sucesso',
    };
  }

  @Get('search/veiculo-plataforma')
  @ApiOperation({
    summary: 'Buscar taxonomias/parametrizações por veículo/plataforma',
    description: 'Busca registros que contenham o veículo/plataforma especificado',
  })
  @ApiQuery({
    name: 'q',
    description: 'Veículo/plataforma para busca',
    example: 'Google Ads',
  })
  @ApiResponse({
    status: 200,
    description: 'Taxonomias/parametrizações encontradas com sucesso',
  })
  async findByVeiculoPlataforma(@Query('q') veiculo: string) {
    const taxonomiaParametrizacoes = await this.taxonomiaParametrizacaoService.findByVeiculoPlataforma(veiculo);
    return {
      success: true,
      data: taxonomiaParametrizacoes,
      total: taxonomiaParametrizacoes.length,
      message: 'Busca realizada com sucesso',
    };
  }

  @Get('search/agencia')
  @ApiOperation({
    summary: 'Buscar taxonomias/parametrizações por agência',
    description: 'Busca registros que contenham a agência especificada',
  })
  @ApiQuery({
    name: 'q',
    description: 'Agência para busca',
    example: 'Agência ABC',
  })
  @ApiResponse({
    status: 200,
    description: 'Taxonomias/parametrizações encontradas com sucesso',
  })
  async findByAgencia(@Query('q') agencia: string) {
    const taxonomiaParametrizacoes = await this.taxonomiaParametrizacaoService.findByAgencia(agencia);
    return {
      success: true,
      data: taxonomiaParametrizacoes,
      total: taxonomiaParametrizacoes.length,
      message: 'Busca realizada com sucesso',
    };
  }

  @Get('search/canal')
  @ApiOperation({
    summary: 'Buscar taxonomias/parametrizações por canal',
    description: 'Busca registros que contenham o canal especificado',
  })
  @ApiQuery({
    name: 'q',
    description: 'Canal para busca',
    example: 'Digital',
  })
  @ApiResponse({
    status: 200,
    description: 'Taxonomias/parametrizações encontradas com sucesso',
  })
  async findByCanal(@Query('q') canal: string) {
    const taxonomiaParametrizacoes = await this.taxonomiaParametrizacaoService.findByCanal(canal);
    return {
      success: true,
      data: taxonomiaParametrizacoes,
      total: taxonomiaParametrizacoes.length,
      message: 'Busca realizada com sucesso',
    };
  }

  @Get('search/dispositivo')
  @ApiOperation({
    summary: 'Buscar taxonomias/parametrizações por dispositivo',
    description: 'Busca registros que contenham o dispositivo especificado',
  })
  @ApiQuery({
    name: 'q',
    description: 'Dispositivo para busca',
    example: 'Desktop',
  })
  @ApiResponse({
    status: 200,
    description: 'Taxonomias/parametrizações encontradas com sucesso',
  })
  async findByDispositivo(@Query('q') dispositivo: string) {
    const taxonomiaParametrizacoes = await this.taxonomiaParametrizacaoService.findByDispositivo(dispositivo);
    return {
      success: true,
      data: taxonomiaParametrizacoes,
      total: taxonomiaParametrizacoes.length,
      message: 'Busca realizada com sucesso',
    };
  }

  @Get('search/tipo-compra')
  @ApiOperation({
    summary: 'Buscar taxonomias/parametrizações por tipo de compra',
    description: 'Busca registros que contenham o tipo de compra especificado',
  })
  @ApiQuery({
    name: 'q',
    description: 'Tipo de compra para busca',
    example: 'Programmatic',
  })
  @ApiResponse({
    status: 200,
    description: 'Taxonomias/parametrizações encontradas com sucesso',
  })
  async findByTipoCompra(@Query('q') tipoCompra: string) {
    const taxonomiaParametrizacoes = await this.taxonomiaParametrizacaoService.findByTipoCompra(tipoCompra);
    return {
      success: true,
      data: taxonomiaParametrizacoes,
      total: taxonomiaParametrizacoes.length,
      message: 'Busca realizada com sucesso',
    };
  }

  @Get('search/goal')
  @ApiOperation({
    summary: 'Buscar taxonomias/parametrizações por goal',
    description: 'Busca registros que contenham o goal especificado',
  })
  @ApiQuery({
    name: 'q',
    description: 'Goal para busca',
    example: 'Conversions',
  })
  @ApiResponse({
    status: 200,
    description: 'Taxonomias/parametrizações encontradas com sucesso',
  })
  async findByGoal(@Query('q') goal: string) {
    const taxonomiaParametrizacoes = await this.taxonomiaParametrizacaoService.findByGoal(goal);
    return {
      success: true,
      data: taxonomiaParametrizacoes,
      total: taxonomiaParametrizacoes.length,
      message: 'Busca realizada com sucesso',
    };
  }

  @Get('search/inventory-type')
  @ApiOperation({
    summary: 'Buscar taxonomias/parametrizações por inventory type',
    description: 'Busca registros que contenham o inventory type especificado',
  })
  @ApiQuery({
    name: 'q',
    description: 'Inventory type para busca',
    example: 'Premium',
  })
  @ApiResponse({
    status: 200,
    description: 'Taxonomias/parametrizações encontradas com sucesso',
  })
  async findByInventoryType(@Query('q') inventoryType: string) {
    const taxonomiaParametrizacoes = await this.taxonomiaParametrizacaoService.findByInventoryType(inventoryType);
    return {
      success: true,
      data: taxonomiaParametrizacoes,
      total: taxonomiaParametrizacoes.length,
      message: 'Busca realizada com sucesso',
    };
  }

  @Get('search/formato-criativo')
  @ApiOperation({
    summary: 'Buscar taxonomias/parametrizações por formato criativo',
    description: 'Busca registros que contenham o formato criativo especificado',
  })
  @ApiQuery({
    name: 'q',
    description: 'Formato criativo para busca',
    example: 'Banner 300x250',
  })
  @ApiResponse({
    status: 200,
    description: 'Taxonomias/parametrizações encontradas com sucesso',
  })
  async findByFormatoCriativo(@Query('q') formato: string) {
    const taxonomiaParametrizacoes = await this.taxonomiaParametrizacaoService.findByFormatoCriativo(formato);
    return {
      success: true,
      data: taxonomiaParametrizacoes,
      total: taxonomiaParametrizacoes.length,
      message: 'Busca realizada com sucesso',
    };
  }

  @Get('search/tecnologia-adserver')
  @ApiOperation({
    summary: 'Buscar taxonomias/parametrizações por tecnologia adserver',
    description: 'Busca registros que contenham a tecnologia adserver especificada',
  })
  @ApiQuery({
    name: 'q',
    description: 'Tecnologia adserver para busca',
    example: 'Google Ad Manager',
  })
  @ApiResponse({
    status: 200,
    description: 'Taxonomias/parametrizações encontradas com sucesso',
  })
  async findByTecnologiaAdserver(@Query('q') tecnologia: string) {
    const taxonomiaParametrizacoes = await this.taxonomiaParametrizacaoService.findByTecnologiaAdserver(tecnologia);
    return {
      success: true,
      data: taxonomiaParametrizacoes,
      total: taxonomiaParametrizacoes.length,
      message: 'Busca realizada com sucesso',
    };
  }

  @Get('search/numero-acao-pac')
  @ApiOperation({
    summary: 'Buscar taxonomias/parametrizações por número ação PAC',
    description: 'Busca registros que contenham o número ação PAC especificado',
  })
  @ApiQuery({
    name: 'q',
    description: 'Número ação PAC para busca',
    example: 'A2024/00123',
  })
  @ApiResponse({
    status: 200,
    description: 'Taxonomias/parametrizações encontradas com sucesso',
  })
  async findByNumeroAcaoPac(@Query('q') numeroAcao: string) {
    const taxonomiaParametrizacoes = await this.taxonomiaParametrizacaoService.findByNumeroAcaoPac(numeroAcao);
    return {
      success: true,
      data: taxonomiaParametrizacoes,
      total: taxonomiaParametrizacoes.length,
      message: 'Busca realizada com sucesso',
    };
  }

  @Get('search/numero-projeto')
  @ApiOperation({
    summary: 'Buscar taxonomias/parametrizações por número projeto',
    description: 'Busca registros que contenham o número projeto especificado',
  })
  @ApiQuery({
    name: 'q',
    description: 'Número projeto para busca',
    example: 'P2024/00456',
  })
  @ApiResponse({
    status: 200,
    description: 'Taxonomias/parametrizações encontradas com sucesso',
  })
  async findByNumeroProjeto(@Query('q') numeroProjeto: string) {
    const taxonomiaParametrizacoes = await this.taxonomiaParametrizacaoService.findByNumeroProjeto(numeroProjeto);
    return {
      success: true,
      data: taxonomiaParametrizacoes,
      total: taxonomiaParametrizacoes.length,
      message: 'Busca realizada com sucesso',
    };
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Buscar taxonomia/parametrização por ID',
    description: 'Retorna um registro específico de taxonomia/parametrização pelo ID',
  })
  @ApiParam({
    name: 'id',
    description: 'ID da taxonomia/parametrização',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Taxonomia/parametrização encontrada com sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'Taxonomia/parametrização não encontrada',
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const taxonomiaParametrizacao = await this.taxonomiaParametrizacaoService.findOne(id);
    return {
      success: true,
      data: taxonomiaParametrizacao,
      message: 'Taxonomia/parametrização encontrada com sucesso',
    };
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Atualizar taxonomia/parametrização',
    description: 'Atualiza dados de um registro de taxonomia/parametrização existente',
  })
  @ApiParam({
    name: 'id',
    description: 'ID da taxonomia/parametrização',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Taxonomia/parametrização atualizada com sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'Taxonomia/parametrização não encontrada',
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaxonomiaParametrizacaoDto: UpdateTaxonomiaParametrizacaoDto,
  ) {
    const taxonomiaParametrizacao = await this.taxonomiaParametrizacaoService.update(id, updateTaxonomiaParametrizacaoDto);
    return {
      success: true,
      data: taxonomiaParametrizacao,
      message: 'Taxonomia/parametrização atualizada com sucesso',
    };
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Excluir taxonomia/parametrização',
    description: 'Remove um registro de taxonomia/parametrização do sistema',
  })
  @ApiParam({
    name: 'id',
    description: 'ID da taxonomia/parametrização',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Taxonomia/parametrização excluída com sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'Taxonomia/parametrização não encontrada',
  })
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.taxonomiaParametrizacaoService.remove(id);
    return {
      success: true,
      message: 'Taxonomia/parametrização excluída com sucesso',
    };
  }

  @Get(':id/logs')
  @ApiOperation({
    summary: 'Buscar logs de uma taxonomia/parametrização',
    description: 'Retorna o histórico de alterações de um registro específico de taxonomia/parametrização',
  })
  @ApiParam({
    name: 'id',
    description: 'ID da taxonomia/parametrização',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Logs da taxonomia/parametrização retornados com sucesso',
  })
  async getTaxonomiaParametrizacaoLogs(@Param('id', ParseIntPipe) id: number) {
    const logs = await this.logService.getLogsByEntity('TaxonomiaParametrizacao', id);
    return {
      success: true,
      data: logs,
      total: logs.length,
      message: 'Logs recuperados com sucesso',
    };
  }
}