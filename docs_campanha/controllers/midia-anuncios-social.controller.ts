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
import { MidiaAnunciosSocialService } from '../services/midia-anuncios-social.service';
import { CampanhaLogService } from '../services/campanha-log.service';
import {
  CreateMidiaAnunciosSocialDto,
  UpdateMidiaAnunciosSocialDto,
} from '../dto/midia-anuncios-social.dto';

@ApiTags('docs_campanha')
@Controller('docs-campanha/midia-anuncios-social')
export class MidiaAnunciosSocialController {
  constructor(
    private readonly midiaAnunciosSocialService: MidiaAnunciosSocialService,
    private readonly logService: CampanhaLogService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Criar nova mídia/anúncio social',
    description: 'Cria um novo registro de mídia/anúncio social associado a uma campanha',
  })
  @ApiResponse({
    status: 201,
    description: 'Mídia/anúncio social criado com sucesso',
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos fornecidos',
  })
  @ApiResponse({
    status: 404,
    description: 'Campanha não encontrada',
  })
  async create(@Body() createMidiaAnunciosSocialDto: CreateMidiaAnunciosSocialDto) {
    const midiaAnuncioSocial = await this.midiaAnunciosSocialService.create(createMidiaAnunciosSocialDto);
    return {
      success: true,
      data: midiaAnuncioSocial,
      message: 'Mídia/anúncio social criado com sucesso',
    };
  }

  @Get()
  @ApiOperation({
    summary: 'Listar todas as mídias/anúncios sociais',
    description: 'Retorna todos os registros de mídias/anúncios sociais cadastrados',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de mídias/anúncios sociais retornada com sucesso',
  })
  async findAll() {
    const midiaAnunciosSociais = await this.midiaAnunciosSocialService.findAll();
    return {
      success: true,
      data: midiaAnunciosSociais,
      total: midiaAnunciosSociais.length,
      message: 'Mídias/anúncios sociais listados com sucesso',
    };
  }

  @Get('campanha/:campanhaId')
  @ApiOperation({
    summary: 'Listar mídias/anúncios sociais por campanha',
    description: 'Retorna todos os registros de mídias/anúncios sociais de uma campanha específica',
  })
  @ApiParam({
    name: 'campanhaId',
    description: 'ID da campanha',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Mídias/anúncios sociais da campanha retornados com sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'Campanha não encontrada',
  })
  async findByCampanha(@Param('campanhaId', ParseIntPipe) campanhaId: number) {
    const midiaAnunciosSociais = await this.midiaAnunciosSocialService.findByCampanha(campanhaId);
    return {
      success: true,
      data: midiaAnunciosSociais,
      total: midiaAnunciosSociais.length,
      message: 'Mídias/anúncios sociais da campanha listados com sucesso',
    };
  }

  @Get('search/responsavel')
  @ApiOperation({
    summary: 'Buscar mídias/anúncios sociais por responsável',
    description: 'Busca registros que contenham o responsável especificado',
  })
  @ApiQuery({
    name: 'q',
    description: 'Nome do responsável para busca',
    example: 'João Silva',
  })
  @ApiResponse({
    status: 200,
    description: 'Mídias/anúncios sociais encontrados com sucesso',
  })
  async findByResponsavel(@Query('q') responsavel: string) {
    const midiaAnunciosSociais = await this.midiaAnunciosSocialService.findByResponsavel(responsavel);
    return {
      success: true,
      data: midiaAnunciosSociais,
      total: midiaAnunciosSociais.length,
      message: 'Busca realizada com sucesso',
    };
  }

  @Get('search/status')
  @ApiOperation({
    summary: 'Buscar mídias/anúncios sociais por status',
    description: 'Busca registros que contenham o status especificado',
  })
  @ApiQuery({
    name: 'q',
    description: 'Status para busca',
    example: 'Ativo',
  })
  @ApiResponse({
    status: 200,
    description: 'Mídias/anúncios sociais encontrados com sucesso',
  })
  async findByStatus(@Query('q') status: string) {
    const midiaAnunciosSociais = await this.midiaAnunciosSocialService.findByStatus(status);
    return {
      success: true,
      data: midiaAnunciosSociais,
      total: midiaAnunciosSociais.length,
      message: 'Busca realizada com sucesso',
    };
  }

  @Get('search/veiculo')
  @ApiOperation({
    summary: 'Buscar mídias/anúncios sociais por veículo',
    description: 'Busca registros que contenham o veículo especificado',
  })
  @ApiQuery({
    name: 'q',
    description: 'Veículo para busca',
    example: 'Instagram',
  })
  @ApiResponse({
    status: 200,
    description: 'Mídias/anúncios sociais encontrados com sucesso',
  })
  async findByVeiculo(@Query('q') veiculo: string) {
    const midiaAnunciosSociais = await this.midiaAnunciosSocialService.findByVeiculo(veiculo);
    return {
      success: true,
      data: midiaAnunciosSociais,
      total: midiaAnunciosSociais.length,
      message: 'Busca realizada com sucesso',
    };
  }

  @Get('search/produto')
  @ApiOperation({
    summary: 'Buscar mídias/anúncios sociais por produto',
    description: 'Busca registros que contenham o produto especificado',
  })
  @ApiQuery({
    name: 'q',
    description: 'Produto para busca',
    example: 'Seguro Vida',
  })
  @ApiResponse({
    status: 200,
    description: 'Mídias/anúncios sociais encontrados com sucesso',
  })
  async findByProduto(@Query('q') produto: string) {
    const midiaAnunciosSociais = await this.midiaAnunciosSocialService.findByProduto(produto);
    return {
      success: true,
      data: midiaAnunciosSociais,
      total: midiaAnunciosSociais.length,
      message: 'Busca realizada com sucesso',
    };
  }

  @Get('search/agencia')
  @ApiOperation({
    summary: 'Buscar mídias/anúncios sociais por agência',
    description: 'Busca registros que contenham a agência especificada',
  })
  @ApiQuery({
    name: 'q',
    description: 'Agência para busca',
    example: 'Agência Digital XYZ',
  })
  @ApiResponse({
    status: 200,
    description: 'Mídias/anúncios sociais encontrados com sucesso',
  })
  async findByAgencia(@Query('q') agencia: string) {
    const midiaAnunciosSociais = await this.midiaAnunciosSocialService.findByAgencia(agencia);
    return {
      success: true,
      data: midiaAnunciosSociais,
      total: midiaAnunciosSociais.length,
      message: 'Busca realizada com sucesso',
    };
  }

  @Get('search/formato')
  @ApiOperation({
    summary: 'Buscar mídias/anúncios sociais por formato',
    description: 'Busca registros que contenham o formato especificado',
  })
  @ApiQuery({
    name: 'q',
    description: 'Formato para busca',
    example: 'Stories',
  })
  @ApiResponse({
    status: 200,
    description: 'Mídias/anúncios sociais encontrados com sucesso',
  })
  async findByFormato(@Query('q') formato: string) {
    const midiaAnunciosSociais = await this.midiaAnunciosSocialService.findByFormato(formato);
    return {
      success: true,
      data: midiaAnunciosSociais,
      total: midiaAnunciosSociais.length,
      message: 'Busca realizada com sucesso',
    };
  }

  @Get('search/estrategia')
  @ApiOperation({
    summary: 'Buscar mídias/anúncios sociais por estratégia',
    description: 'Busca registros que contenham a estratégia especificada',
  })
  @ApiQuery({
    name: 'q',
    description: 'Estratégia para busca',
    example: 'Engajamento',
  })
  @ApiResponse({
    status: 200,
    description: 'Mídias/anúncios sociais encontrados com sucesso',
  })
  async findByEstrategia(@Query('q') estrategia: string) {
    const midiaAnunciosSociais = await this.midiaAnunciosSocialService.findByEstrategia(estrategia);
    return {
      success: true,
      data: midiaAnunciosSociais,
      total: midiaAnunciosSociais.length,
      message: 'Busca realizada com sucesso',
    };
  }

  @Get('search/tipo-audiencia')
  @ApiOperation({
    summary: 'Buscar mídias/anúncios sociais por tipo de audiência',
    description: 'Busca registros que contenham o tipo de audiência especificado',
  })
  @ApiQuery({
    name: 'q',
    description: 'Tipo de audiência para busca',
    example: 'Lookalike',
  })
  @ApiResponse({
    status: 200,
    description: 'Mídias/anúncios sociais encontrados com sucesso',
  })
  async findByTipoAudiencia(@Query('q') tipoAudiencia: string) {
    const midiaAnunciosSociais = await this.midiaAnunciosSocialService.findByTipoAudiencia(tipoAudiencia);
    return {
      success: true,
      data: midiaAnunciosSociais,
      total: midiaAnunciosSociais.length,
      message: 'Busca realizada com sucesso',
    };
  }

  @Get('search/objetivo')
  @ApiOperation({
    summary: 'Buscar mídias/anúncios sociais por objetivo',
    description: 'Busca registros que contenham o objetivo especificado',
  })
  @ApiQuery({
    name: 'q',
    description: 'Objetivo para busca',
    example: 'Gerar leads qualificados',
  })
  @ApiResponse({
    status: 200,
    description: 'Mídias/anúncios sociais encontrados com sucesso',
  })
  async findByObjetivo(@Query('q') objetivo: string) {
    const midiaAnunciosSociais = await this.midiaAnunciosSocialService.findByObjetivo(objetivo);
    return {
      success: true,
      data: midiaAnunciosSociais,
      total: midiaAnunciosSociais.length,
      message: 'Busca realizada com sucesso',
    };
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Buscar mídia/anúncio social por ID',
    description: 'Retorna um registro específico de mídia/anúncio social pelo ID',
  })
  @ApiParam({
    name: 'id',
    description: 'ID da mídia/anúncio social',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Mídia/anúncio social encontrado com sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'Mídia/anúncio social não encontrado',
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const midiaAnuncioSocial = await this.midiaAnunciosSocialService.findOne(id);
    return {
      success: true,
      data: midiaAnuncioSocial,
      message: 'Mídia/anúncio social encontrado com sucesso',
    };
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Atualizar mídia/anúncio social',
    description: 'Atualiza dados de um registro de mídia/anúncio social existente',
  })
  @ApiParam({
    name: 'id',
    description: 'ID da mídia/anúncio social',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Mídia/anúncio social atualizado com sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'Mídia/anúncio social não encontrado',
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMidiaAnunciosSocialDto: UpdateMidiaAnunciosSocialDto,
  ) {
    const midiaAnuncioSocial = await this.midiaAnunciosSocialService.update(id, updateMidiaAnunciosSocialDto);
    return {
      success: true,
      data: midiaAnuncioSocial,
      message: 'Mídia/anúncio social atualizado com sucesso',
    };
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Excluir mídia/anúncio social',
    description: 'Remove um registro de mídia/anúncio social do sistema',
  })
  @ApiParam({
    name: 'id',
    description: 'ID da mídia/anúncio social',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Mídia/anúncio social excluído com sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'Mídia/anúncio social não encontrado',
  })
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.midiaAnunciosSocialService.remove(id);
    return {
      success: true,
      message: 'Mídia/anúncio social excluído com sucesso',
    };
  }

  @Get(':id/logs')
  @ApiOperation({
    summary: 'Buscar logs de uma mídia/anúncio social',
    description: 'Retorna o histórico de alterações de um registro específico de mídia/anúncio social',
  })
  @ApiParam({
    name: 'id',
    description: 'ID da mídia/anúncio social',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Logs da mídia/anúncio social retornados com sucesso',
  })
  async getMidiaAnuncioSocialLogs(@Param('id', ParseIntPipe) id: number) {
    const logs = await this.logService.getLogsByEntity('MidiaAnunciosSocial', id);
    return {
      success: true,
      data: logs,
      total: logs.length,
      message: 'Logs recuperados com sucesso',
    };
  }
}