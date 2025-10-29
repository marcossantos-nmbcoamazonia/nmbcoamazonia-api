import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Campanha } from '../entities/campanha.entity';
import { CreateCampanhaDto, UpdateCampanhaDto } from '../dto/campanha.dto';
import { CampanhaLogService } from './campanha-log.service';

@Injectable()
export class CampanhaService {
  private readonly logger = new Logger(CampanhaService.name);
  private campanhas: Campanha[] = []; // Simulação de banco de dados em memória
  private nextId = 1;

  constructor(private readonly logService: CampanhaLogService) {}

  async create(createCampanhaDto: CreateCampanhaDto): Promise<Campanha> {
    try {
      const campanha = new Campanha({
        id: this.nextId++,
        ...createCampanhaDto,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      this.campanhas.push(campanha);
      
      // Log da operação
      await this.logService.logOperation({
        entityType: 'Campanha',
        entityId: campanha.id,
        operation: 'CREATE',
        changes: createCampanhaDto,
        userId: 'system', // Em produção, pegar do contexto de autenticação
      });

      this.logger.log(`Campanha criada com ID: ${campanha.id}`);
      return campanha;
    } catch (error) {
      this.logger.error(`Erro ao criar campanha: ${error.message}`);
      throw error;
    }
  }

  async findAll(): Promise<Campanha[]> {
    try {
      this.logger.log(`Buscando todas as campanhas. Total: ${this.campanhas.length}`);
      return this.campanhas;
    } catch (error) {
      this.logger.error(`Erro ao buscar campanhas: ${error.message}`);
      throw error;
    }
  }

  async findOne(id: number): Promise<Campanha> {
    try {
      const campanha = this.campanhas.find(c => c.id === id);
      
      if (!campanha) {
        throw new NotFoundException(`Campanha com ID ${id} não encontrada`);
      }

      this.logger.log(`Campanha encontrada: ${campanha.nomeCampanha}`);
      return campanha;
    } catch (error) {
      this.logger.error(`Erro ao buscar campanha ID ${id}: ${error.message}`);
      throw error;
    }
  }

  async update(id: number, updateCampanhaDto: UpdateCampanhaDto): Promise<Campanha> {
    try {
      const campanhaIndex = this.campanhas.findIndex(c => c.id === id);
      
      if (campanhaIndex === -1) {
        throw new NotFoundException(`Campanha com ID ${id} não encontrada`);
      }

      const campanha = this.campanhas[campanhaIndex];
      const oldData = { ...campanha };

      // Atualizar campos
      Object.assign(campanha, updateCampanhaDto, { updatedAt: new Date() });
      this.campanhas[campanhaIndex] = campanha;

      // Log da operação
      await this.logService.logOperation({
        entityType: 'Campanha',
        entityId: id,
        operation: 'UPDATE',
        changes: updateCampanhaDto,
        oldData,
        userId: 'system',
      });

      this.logger.log(`Campanha ID ${id} atualizada`);
      return campanha;
    } catch (error) {
      this.logger.error(`Erro ao atualizar campanha ID ${id}: ${error.message}`);
      throw error;
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const campanhaIndex = this.campanhas.findIndex(c => c.id === id);
      
      if (campanhaIndex === -1) {
        throw new NotFoundException(`Campanha com ID ${id} não encontrada`);
      }

      const campanha = this.campanhas[campanhaIndex];
      this.campanhas.splice(campanhaIndex, 1);

      // Log da operação
      await this.logService.logOperation({
        entityType: 'Campanha',
        entityId: id,
        operation: 'DELETE',
        oldData: campanha,
        userId: 'system',
      });

      this.logger.log(`Campanha ID ${id} removida`);
    } catch (error) {
      this.logger.error(`Erro ao remover campanha ID ${id}: ${error.message}`);
      throw error;
    }
  }

  async findByNumeroAcao(numeroAcao: string): Promise<Campanha[]> {
    try {
      const campanhas = this.campanhas.filter(c => 
        c.numeroAcao.toLowerCase().includes(numeroAcao.toLowerCase())
      );
      
      this.logger.log(`Encontradas ${campanhas.length} campanhas com número da ação: ${numeroAcao}`);
      return campanhas;
    } catch (error) {
      this.logger.error(`Erro ao buscar campanhas por número da ação: ${error.message}`);
      throw error;
    }
  }

  async findByNumeroProjeto(numeroProjeto: string): Promise<Campanha[]> {
    try {
      const campanhas = this.campanhas.filter(c => 
        c.numeroProjeto.toLowerCase().includes(numeroProjeto.toLowerCase())
      );
      
      this.logger.log(`Encontradas ${campanhas.length} campanhas com número do projeto: ${numeroProjeto}`);
      return campanhas;
    } catch (error) {
      this.logger.error(`Erro ao buscar campanhas por número do projeto: ${error.message}`);
      throw error;
    }
  }
}