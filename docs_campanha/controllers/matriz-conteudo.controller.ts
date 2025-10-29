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
import { MatrizConteudoService } from '../services/matriz-conteudo.service';
import { CampanhaLogService } from '../services/campanha-log.service';
import {
  CreateMatrizConteudoDto,
  UpdateMatrizConteudoDto,
} from '../dto/matriz-conteudo.dto';

@ApiTags('docs_campanha')
@Controller('docs-campanha/matriz-conteudo')
export class MatrizConteudoController {
  constructor(
    private readonly matrizConteudoService: MatrizConteudoService,
    private readonly logService: CampanhaLogService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Criar nova matriz de conteúdo',
    description: 'Cria um novo registro de matriz de conteúdo associado a uma campanha',
  })
  @ApiResponse({
    status: 201,
    description: 'Matriz de conteúdo criada com sucesso',
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos fornecidos',
  })
  @ApiResponse({
    status: 404,
    description: 'Campanha não encontrada',
  })
  async create(@Body() createMatrizConteudoDto: CreateMatrizConteudoDto) {
    const matrizConteudo = await this.matrizConteudoService.create(createMatrizConteudoDto);
    return {
      success: true,
      data: matrizConteudo,
      message: 'Matriz de conteúdo criada com sucesso',
    };
  }

  @Get()
  @ApiOperation({
    summary: 'Listar todas as matrizes de conteúdo',
    description: 'Retorna todos os registros de matrizes de conteúdo cadastrados',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de matrizes de conteúdo retornada com sucesso',
  })
  async findAll() {
    const matrizConteudos = await this.matrizConteudoService.findAll();
    return {
      success: true,
      data: matrizConteudos,
      total: matrizConteudos.length,
      message: 'Matrizes de conteúdo listadas com sucesso',
    };
  }

  @Get('campanha/:campanhaId')
  @ApiOperation({
    summary: 'Listar matrizes de conteúdo por campanha',
    description: 'Retorna todos os registros de matrizes de conteúdo de uma campanha específica',
  })
  @ApiParam({
    name: 'campanhaId',
    description: 'ID da campanha',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Matrizes de conteúdo da campanha retornadas com sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'Campanha não encontrada',
  })
  async findByCampanha(@Param('campanhaId', ParseIntPipe) campanhaId: number) {
    const matrizConteudos = await this.matrizConteudoService.findByCampanha(campanhaId);
    return {
      success: true,
      data: matrizConteudos,
      total: matrizConteudos.length,
      message: 'Matrizes de conteúdo da campanha listadas com sucesso',
    };
  }

  @Get('search/produto')
  @ApiOperation({
    summary: 'Buscar matrizes de conteúdo por produto',
    description: 'Busca registros que contenham o produto especificado',
  })
  @ApiQuery({
    name: 'q',
    description: 'Nome do produto para busca',
    example: 'Seguro Residencial',
  })
  @ApiResponse({
    status: 200,
    description: 'Matrizes de conteúdo encontradas com sucesso',
  })
  async findByProduto(@Query('q') produto: string) {
    const matrizConteudos = await this.matrizConteudoService.findByProduto(produto);
    return {
      success: true,
      data: matrizConteudos,
      total: matrizConteudos.length,
      message: 'Busca realizada com sucesso',
    };
  }

  @Get('search/status')
  @ApiOperation({
    summary: 'Buscar matrizes de conteúdo por status',
    description: 'Busca registros que contenham o status especificado',
  })
  @ApiQuery({
    name: 'q',
    description: 'Status para busca',
    example: 'Aprovado',
  })
  @ApiResponse({
    status: 200,
    description: 'Matrizes de conteúdo encontradas com sucesso',
  })
  async findByStatus(@Query('q') status: string) {
    const matrizConteudos = await this.matrizConteudoService.findByStatus(status);
    return {
      success: true,
      data: matrizConteudos,
      total: matrizConteudos.length,
      message: 'Busca realizada com sucesso',
    };
  }

  @Get('search/fase')
  @ApiOperation({
    summary: 'Buscar matrizes de conteúdo por fase',
    description: 'Busca registros que contenham a fase especificada',
  })
  @ApiQuery({
    name: 'q',
    description: 'Fase para busca',
    example: 'Produção',
  })
  @ApiResponse({
    status: 200,
    description: 'Matrizes de conteúdo encontradas com sucesso',
  })
  async findByFase(@Query('q') fase: string) {
    const matrizConteudos = await this.matrizConteudoService.findByFase(fase);
    return {
      success: true,
      data: matrizConteudos,
      total: matrizConteudos.length,
      message: 'Busca realizada com sucesso',
    };
  }

  @Get('search/veiculo')
  @ApiOperation({
    summary: 'Buscar matrizes de conteúdo por veículo',
    description: 'Busca registros que contenham o veículo especificado',
  })
  @ApiQuery({
    name: 'q',
    description: 'Veículo para busca',
    example: 'YouTube',
  })
  @ApiResponse({
    status: 200,
    description: 'Matrizes de conteúdo encontradas com sucesso',
  })
  async findByVeiculo(@Query('q') veiculo: string) {
    const matrizConteudos = await this.matrizConteudoService.findByVeiculo(veiculo);
    return {
      success: true,
      data: matrizConteudos,
      total: matrizConteudos.length,
      message: 'Busca realizada com sucesso',
    };
  }

  @Get('search/objetivo-midia')
  @ApiOperation({
    summary: 'Buscar matrizes de conteúdo por objetivo de mídia',
    description: 'Busca registros que contenham o objetivo de mídia especificado',
  })
  @ApiQuery({
    name: 'q',
    description: 'Objetivo de mídia para busca',
    example: 'Brand Awareness',
  })
  @ApiResponse({
    status: 200,
    description: 'Matrizes de conteúdo encontradas com sucesso',
  })
  async findByObjetivoMidia(@Query('q') objetivoMidia: string) {
    const matrizConteudos = await this.matrizConteudoService.findByObjetivoMidia(objetivoMidia);
    return {
      success: true,
      data: matrizConteudos,
      total: matrizConteudos.length,
      message: 'Busca realizada com sucesso',
    };
  }

  @Get('search/periodo')
  @ApiOperation({
    summary: 'Buscar matrizes de conteúdo por período',
    description: 'Busca registros que contenham o período especificado',
  })
  @ApiQuery({
    name: 'q',
    description: 'Período para busca',
    example: 'Dezembro 2024',
  })
  @ApiResponse({
    status: 200,
    description: 'Matrizes de conteúdo encontradas com sucesso',
  })
  async findByPeriodo(@Query('q') periodo: string) {
    const matrizConteudos = await this.matrizConteudoService.findByPeriodo(periodo);
    return {
      success: true,
      data: matrizConteudos,
      total: matrizConteudos.length,
      message: 'Busca realizada com sucesso',
    };
  }

  @Get('search/tipo-midia')
  @ApiOperation({
    summary: 'Buscar matrizes de conteúdo por tipo de mídia',
    description: 'Busca registros que contenham o tipo de mídia especificado',
  })
  @ApiQuery({
    name: 'q',
    description: 'Tipo de mídia para busca',
    example: 'Video',
  })
  @ApiResponse({
    status: 200,
    description: 'Matrizes de conteúdo encontradas com sucesso',
  })
  async findByTipoMidia(@Query('q') tipoMidia: string) {
    const matrizConteudos = await this.matrizConteudoService.findByTipoMidia(tipoMidia);
    return {
      success: true,
      data: matrizConteudos,
      total: matrizConteudos.length,
      message: 'Busca realizada com sucesso',
    };
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Buscar matriz de conteúdo por ID',
    description: 'Retorna um registro específico de matriz de conteúdo pelo ID',
  })
  @ApiParam({
    name: 'id',
    description: 'ID da matriz de conteúdo',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Matriz de conteúdo encontrada com sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'Matriz de conteúdo não encontrada',
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const matrizConteudo = await this.matrizConteudoService.findOne(id);
    return {
      success: true,
      data: matrizConteudo,
      message: 'Matriz de conteúdo encontrada com sucesso',
    };
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Atualizar matriz de conteúdo',
    description: 'Atualiza dados de um registro de matriz de conteúdo existente',
  })
  @ApiParam({
    name: 'id',
    description: 'ID da matriz de conteúdo',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Matriz de conteúdo atualizada com sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'Matriz de conteúdo não encontrada',
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMatrizConteudoDto: UpdateMatrizConteudoDto,
  ) {
    const matrizConteudo = await this.matrizConteudoService.update(id, updateMatrizConteudoDto);
    return {
      success: true,
      data: matrizConteudo,
      message: 'Matriz de conteúdo atualizada com sucesso',
    };
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Excluir matriz de conteúdo',
    description: 'Remove um registro de matriz de conteúdo do sistema',
  })
  @ApiParam({
    name: 'id',
    description: 'ID da matriz de conteúdo',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Matriz de conteúdo excluída com sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'Matriz de conteúdo não encontrada',
  })
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.matrizConteudoService.remove(id);
    return {
      success: true,
      message: 'Matriz de conteúdo excluída com sucesso',
    };
  }

  @Get(':id/logs')
  @ApiOperation({
    summary: 'Buscar logs de uma matriz de conteúdo',
    description: 'Retorna o histórico de alterações de um registro específico de matriz de conteúdo',
  })
  @ApiParam({
    name: 'id',
    description: 'ID da matriz de conteúdo',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Logs da matriz de conteúdo retornados com sucesso',
  })
  async getMatrizConteudoLogs(@Param('id', ParseIntPipe) id: number) {
    const logs = await this.logService.getLogsByEntity('MatrizConteudo', id);
    return {
      success: true,
      data: logs,
      total: logs.length,
      message: 'Logs recuperados com sucesso',
    };
  }
}