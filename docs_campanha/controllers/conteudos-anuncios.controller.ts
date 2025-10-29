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
import { ConteudosAnunciosService } from '../services/conteudos-anuncios.service';
import { CampanhaLogService } from '../services/campanha-log.service';
import {
  CreateConteudosAnunciosDto,
  UpdateConteudosAnunciosDto,
} from '../dto/conteudos-anuncios.dto';

@ApiTags('docs_campanha')
@Controller('docs-campanha/conteudos-anuncios')
export class ConteudosAnunciosController {
  constructor(
    private readonly conteudosAnunciosService: ConteudosAnunciosService,
    private readonly logService: CampanhaLogService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Criar novo conteúdo/anúncio',
    description: 'Cria um novo registro de conteúdo/anúncio associado a uma campanha',
  })
  @ApiResponse({
    status: 201,
    description: 'Conteúdo/anúncio criado com sucesso',
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos fornecidos',
  })
  @ApiResponse({
    status: 404,
    description: 'Campanha não encontrada',
  })
  async create(@Body() createConteudosAnunciosDto: CreateConteudosAnunciosDto) {
    const conteudoAnuncio = await this.conteudosAnunciosService.create(createConteudosAnunciosDto);
    return {
      success: true,
      data: conteudoAnuncio,
      message: 'Conteúdo/anúncio criado com sucesso',
    };
  }

  @Get()
  @ApiOperation({
    summary: 'Listar todos os conteúdos/anúncios',
    description: 'Retorna todos os registros de conteúdos/anúncios cadastrados',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de conteúdos/anúncios retornada com sucesso',
  })
  async findAll() {
    const conteudosAnuncios = await this.conteudosAnunciosService.findAll();
    return {
      success: true,
      data: conteudosAnuncios,
      total: conteudosAnuncios.length,
      message: 'Conteúdos/anúncios listados com sucesso',
    };
  }

  @Get('campanha/:campanhaId')
  @ApiOperation({
    summary: 'Listar conteúdos/anúncios por campanha',
    description: 'Retorna todos os registros de conteúdos/anúncios de uma campanha específica',
  })
  @ApiParam({
    name: 'campanhaId',
    description: 'ID da campanha',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Conteúdos/anúncios da campanha retornados com sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'Campanha não encontrada',
  })
  async findByCampanha(@Param('campanhaId', ParseIntPipe) campanhaId: number) {
    const conteudosAnuncios = await this.conteudosAnunciosService.findByCampanha(campanhaId);
    return {
      success: true,
      data: conteudosAnuncios,
      total: conteudosAnuncios.length,
      message: 'Conteúdos/anúncios da campanha listados com sucesso',
    };
  }

  @Get('search/produto')
  @ApiOperation({
    summary: 'Buscar conteúdos/anúncios por produto',
    description: 'Busca registros que contenham o produto especificado',
  })
  @ApiQuery({
    name: 'q',
    description: 'Nome do produto para busca',
    example: 'Seguro Auto',
  })
  @ApiResponse({
    status: 200,
    description: 'Conteúdos/anúncios encontrados com sucesso',
  })
  async findByProduto(@Query('q') produto: string) {
    const conteudosAnuncios = await this.conteudosAnunciosService.findByProduto(produto);
    return {
      success: true,
      data: conteudosAnuncios,
      total: conteudosAnuncios.length,
      message: 'Busca realizada com sucesso',
    };
  }

  @Get('search/veiculo')
  @ApiOperation({
    summary: 'Buscar conteúdos/anúncios por veículo',
    description: 'Busca registros que contenham o veículo especificado',
  })
  @ApiQuery({
    name: 'q',
    description: 'Nome do veículo para busca',
    example: 'Facebook',
  })
  @ApiResponse({
    status: 200,
    description: 'Conteúdos/anúncios encontrados com sucesso',
  })
  async findByVeiculo(@Query('q') veiculo: string) {
    const conteudosAnuncios = await this.conteudosAnunciosService.findByVeiculo(veiculo);
    return {
      success: true,
      data: conteudosAnuncios,
      total: conteudosAnuncios.length,
      message: 'Busca realizada com sucesso',
    };
  }

  @Get('search/estrategia')
  @ApiOperation({
    summary: 'Buscar conteúdos/anúncios por estratégia',
    description: 'Busca registros que contenham a estratégia especificada',
  })
  @ApiQuery({
    name: 'q',
    description: 'Estratégia para busca',
    example: 'Conversão',
  })
  @ApiResponse({
    status: 200,
    description: 'Conteúdos/anúncios encontrados com sucesso',
  })
  async findByEstrategia(@Query('q') estrategia: string) {
    const conteudosAnuncios = await this.conteudosAnunciosService.findByEstrategia(estrategia);
    return {
      success: true,
      data: conteudosAnuncios,
      total: conteudosAnuncios.length,
      message: 'Busca realizada com sucesso',
    };
  }

  @Get('search/id-peca')
  @ApiOperation({
    summary: 'Buscar conteúdos/anúncios por ID da peça',
    description: 'Busca registros que contenham o ID da peça especificado',
  })
  @ApiQuery({
    name: 'q',
    description: 'ID da peça para busca',
    example: 'P001',
  })
  @ApiResponse({
    status: 200,
    description: 'Conteúdos/anúncios encontrados com sucesso',
  })
  async findByIdPeca(@Query('q') idPeca: string) {
    const conteudosAnuncios = await this.conteudosAnunciosService.findByIdPeca(idPeca);
    return {
      success: true,
      data: conteudosAnuncios,
      total: conteudosAnuncios.length,
      message: 'Busca realizada com sucesso',
    };
  }

  @Get('search/formato')
  @ApiOperation({
    summary: 'Buscar conteúdos/anúncios por formato',
    description: 'Busca registros que contenham o formato especificado',
  })
  @ApiQuery({
    name: 'q',
    description: 'Formato para busca',
    example: 'Banner',
  })
  @ApiResponse({
    status: 200,
    description: 'Conteúdos/anúncios encontrados com sucesso',
  })
  async findByFormato(@Query('q') formato: string) {
    const conteudosAnuncios = await this.conteudosAnunciosService.findByFormato(formato);
    return {
      success: true,
      data: conteudosAnuncios,
      total: conteudosAnuncios.length,
      message: 'Busca realizada com sucesso',
    };
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Buscar conteúdo/anúncio por ID',
    description: 'Retorna um registro específico de conteúdo/anúncio pelo ID',
  })
  @ApiParam({
    name: 'id',
    description: 'ID do conteúdo/anúncio',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Conteúdo/anúncio encontrado com sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'Conteúdo/anúncio não encontrado',
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const conteudoAnuncio = await this.conteudosAnunciosService.findOne(id);
    return {
      success: true,
      data: conteudoAnuncio,
      message: 'Conteúdo/anúncio encontrado com sucesso',
    };
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Atualizar conteúdo/anúncio',
    description: 'Atualiza dados de um registro de conteúdo/anúncio existente',
  })
  @ApiParam({
    name: 'id',
    description: 'ID do conteúdo/anúncio',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Conteúdo/anúncio atualizado com sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'Conteúdo/anúncio não encontrado',
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateConteudosAnunciosDto: UpdateConteudosAnunciosDto,
  ) {
    const conteudoAnuncio = await this.conteudosAnunciosService.update(id, updateConteudosAnunciosDto);
    return {
      success: true,
      data: conteudoAnuncio,
      message: 'Conteúdo/anúncio atualizado com sucesso',
    };
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Excluir conteúdo/anúncio',
    description: 'Remove um registro de conteúdo/anúncio do sistema',
  })
  @ApiParam({
    name: 'id',
    description: 'ID do conteúdo/anúncio',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Conteúdo/anúncio excluído com sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'Conteúdo/anúncio não encontrado',
  })
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.conteudosAnunciosService.remove(id);
    return {
      success: true,
      message: 'Conteúdo/anúncio excluído com sucesso',
    };
  }

  @Get(':id/logs')
  @ApiOperation({
    summary: 'Buscar logs de um conteúdo/anúncio',
    description: 'Retorna o histórico de alterações de um registro específico de conteúdo/anúncio',
  })
  @ApiParam({
    name: 'id',
    description: 'ID do conteúdo/anúncio',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Logs do conteúdo/anúncio retornados com sucesso',
  })
  async getConteudoAnuncioLogs(@Param('id', ParseIntPipe) id: number) {
    const logs = await this.logService.getLogsByEntity('ConteudosAnuncios', id);
    return {
      success: true,
      data: logs,
      total: logs.length,
      message: 'Logs recuperados com sucesso',
    };
  }
}