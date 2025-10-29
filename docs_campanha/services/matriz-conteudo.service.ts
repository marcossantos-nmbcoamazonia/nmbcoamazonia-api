import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { MatrizConteudo } from '../entities/matriz-conteudo.entity';
import { CreateMatrizConteudoDto, UpdateMatrizConteudoDto } from '../dto/matriz-conteudo.dto';
import { CampanhaLogService } from './campanha-log.service';
import { CampanhaService } from './campanha.service';

@Injectable()
export class MatrizConteudoService {
  private readonly logger = new Logger(MatrizConteudoService.name);
  private matrizConteudos: MatrizConteudo[] = []; // Simulação de banco de dados em memória
  private nextId = 1;

  constructor(
    private readonly logService: CampanhaLogService,
    private readonly campanhaService: CampanhaService,
  ) {}

  async create(createMatrizConteudoDto: CreateMatrizConteudoDto): Promise<MatrizConteudo> {
    try {
      // Verificar se a campanha existe
      await this.campanhaService.findOne(createMatrizConteudoDto.campanhaId);

      const matrizConteudo = new MatrizConteudo({
        id: this.nextId++,
        ...createMatrizConteudoDto,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      this.matrizConteudos.push(matrizConteudo);
      
      // Log da operação
      await this.logService.logOperation({
        entityType: 'MatrizConteudo',
        entityId: matrizConteudo.id,
        operation: 'CREATE',
        changes: createMatrizConteudoDto,
        userId: 'system',
      });

      this.logger.log(`Matriz de Conteúdo criada com ID: ${matrizConteudo.id}`);
      return matrizConteudo;
    } catch (error) {
      this.logger.error(`Erro ao criar Matriz de Conteúdo: ${error.message}`);
      throw error;
    }
  }

  async findAll(): Promise<MatrizConteudo[]> {
    try {
      this.logger.log(`Buscando todas as Matrizes de Conteúdo. Total: ${this.matrizConteudos.length}`);
      return this.matrizConteudos;
    } catch (error) {
      this.logger.error(`Erro ao buscar Matrizes de Conteúdo: ${error.message}`);
      throw error;
    }
  }

  async findByCampanha(campanhaId: number): Promise<MatrizConteudo[]> {
    try {
      // Verificar se a campanha existe
      await this.campanhaService.findOne(campanhaId);

      const matrizCampanha = this.matrizConteudos.filter(mc => mc.campanhaId === campanhaId);
      
      this.logger.log(`Encontradas ${matrizCampanha.length} Matrizes de Conteúdo para campanha ${campanhaId}`);
      return matrizCampanha;
    } catch (error) {
      this.logger.error(`Erro ao buscar Matrizes de Conteúdo por campanha: ${error.message}`);
      throw error;
    }
  }

  async findOne(id: number): Promise<MatrizConteudo> {
    try {
      const matrizConteudo = this.matrizConteudos.find(mc => mc.id === id);
      
      if (!matrizConteudo) {
        throw new NotFoundException(`Matriz de Conteúdo com ID ${id} não encontrada`);
      }

      this.logger.log(`Matriz de Conteúdo encontrada: ${matrizConteudo.id}`);
      return matrizConteudo;
    } catch (error) {
      this.logger.error(`Erro ao buscar Matriz de Conteúdo ID ${id}: ${error.message}`);
      throw error;
    }
  }

  async update(id: number, updateMatrizConteudoDto: UpdateMatrizConteudoDto): Promise<MatrizConteudo> {
    try {
      const matrizIndex = this.matrizConteudos.findIndex(mc => mc.id === id);
      
      if (matrizIndex === -1) {
        throw new NotFoundException(`Matriz de Conteúdo com ID ${id} não encontrada`);
      }

      const matrizConteudo = this.matrizConteudos[matrizIndex];
      const oldData = { ...matrizConteudo };

      // Atualizar campos
      Object.assign(matrizConteudo, updateMatrizConteudoDto, { updatedAt: new Date() });
      this.matrizConteudos[matrizIndex] = matrizConteudo;

      // Log da operação
      await this.logService.logOperation({
        entityType: 'MatrizConteudo',
        entityId: id,
        operation: 'UPDATE',
        changes: updateMatrizConteudoDto,
        oldData,
        userId: 'system',
      });

      this.logger.log(`Matriz de Conteúdo ID ${id} atualizada`);
      return matrizConteudo;
    } catch (error) {
      this.logger.error(`Erro ao atualizar Matriz de Conteúdo ID ${id}: ${error.message}`);
      throw error;
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const matrizIndex = this.matrizConteudos.findIndex(mc => mc.id === id);
      
      if (matrizIndex === -1) {
        throw new NotFoundException(`Matriz de Conteúdo com ID ${id} não encontrada`);
      }

      const matrizConteudo = this.matrizConteudos[matrizIndex];
      this.matrizConteudos.splice(matrizIndex, 1);

      // Log da operação
      await this.logService.logOperation({
        entityType: 'MatrizConteudo',
        entityId: id,
        operation: 'DELETE',
        oldData: matrizConteudo,
        userId: 'system',
      });

      this.logger.log(`Matriz de Conteúdo ID ${id} removida`);
    } catch (error) {
      this.logger.error(`Erro ao remover Matriz de Conteúdo ID ${id}: ${error.message}`);
      throw error;
    }
  }

  async findByProduto(produto: string): Promise<MatrizConteudo[]> {
    try {
      const matrizes = this.matrizConteudos.filter(mc => 
        mc.produto && mc.produto.toLowerCase().includes(produto.toLowerCase())
      );
      
      this.logger.log(`Encontradas ${matrizes.length} Matrizes de Conteúdo com produto: ${produto}`);
      return matrizes;
    } catch (error) {
      this.logger.error(`Erro ao buscar Matrizes de Conteúdo por produto: ${error.message}`);
      throw error;
    }
  }

  async findByStatus(status: string): Promise<MatrizConteudo[]> {
    try {
      const matrizes = this.matrizConteudos.filter(mc => 
        mc.status && mc.status.toLowerCase().includes(status.toLowerCase())
      );
      
      this.logger.log(`Encontradas ${matrizes.length} Matrizes de Conteúdo com status: ${status}`);
      return matrizes;
    } catch (error) {
      this.logger.error(`Erro ao buscar Matrizes de Conteúdo por status: ${error.message}`);
      throw error;
    }
  }

  async findByFase(fase: string): Promise<MatrizConteudo[]> {
    try {
      const matrizes = this.matrizConteudos.filter(mc => 
        mc.fase && mc.fase.toLowerCase().includes(fase.toLowerCase())
      );
      
      this.logger.log(`Encontradas ${matrizes.length} Matrizes de Conteúdo com fase: ${fase}`);
      return matrizes;
    } catch (error) {
      this.logger.error(`Erro ao buscar Matrizes de Conteúdo por fase: ${error.message}`);
      throw error;
    }
  }

  async findByVeiculo(veiculo: string): Promise<MatrizConteudo[]> {
    try {
      const matrizes = this.matrizConteudos.filter(mc => 
        mc.veiculo && mc.veiculo.toLowerCase().includes(veiculo.toLowerCase())
      );
      
      this.logger.log(`Encontradas ${matrizes.length} Matrizes de Conteúdo com veículo: ${veiculo}`);
      return matrizes;
    } catch (error) {
      this.logger.error(`Erro ao buscar Matrizes de Conteúdo por veículo: ${error.message}`);
      throw error;
    }
  }

  async findByObjetivoMidia(objetivoMidia: string): Promise<MatrizConteudo[]> {
    try {
      const matrizes = this.matrizConteudos.filter(mc => 
        mc.objetivoMidia && mc.objetivoMidia.toLowerCase().includes(objetivoMidia.toLowerCase())
      );
      
      this.logger.log(`Encontradas ${matrizes.length} Matrizes de Conteúdo com objetivo de mídia: ${objetivoMidia}`);
      return matrizes;
    } catch (error) {
      this.logger.error(`Erro ao buscar Matrizes de Conteúdo por objetivo de mídia: ${error.message}`);
      throw error;
    }
  }

  async findByPeriodo(periodo: string): Promise<MatrizConteudo[]> {
    try {
      const matrizes = this.matrizConteudos.filter(mc => 
        mc.periodo && mc.periodo.toLowerCase().includes(periodo.toLowerCase())
      );
      
      this.logger.log(`Encontradas ${matrizes.length} Matrizes de Conteúdo com período: ${periodo}`);
      return matrizes;
    } catch (error) {
      this.logger.error(`Erro ao buscar Matrizes de Conteúdo por período: ${error.message}`);
      throw error;
    }
  }

  async findByTipoMidia(tipoMidia: string): Promise<MatrizConteudo[]> {
    try {
      const matrizes = this.matrizConteudos.filter(mc => 
        mc.tipoMidia && mc.tipoMidia.toLowerCase().includes(tipoMidia.toLowerCase())
      );
      
      this.logger.log(`Encontradas ${matrizes.length} Matrizes de Conteúdo com tipo de mídia: ${tipoMidia}`);
      return matrizes;
    } catch (error) {
      this.logger.error(`Erro ao buscar Matrizes de Conteúdo por tipo de mídia: ${error.message}`);
      throw error;
    }
  }
}