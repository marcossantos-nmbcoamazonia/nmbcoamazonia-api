import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { RMDigital } from '../entities/rm-digital.entity';
import { CreateRMDigitalDto, UpdateRMDigitalDto } from '../dto/rm-digital.dto';
import { CampanhaLogService } from './campanha-log.service';
import { CampanhaService } from './campanha.service';

@Injectable()
export class RMDigitalService {
  private readonly logger = new Logger(RMDigitalService.name);
  private rmDigitais: RMDigital[] = []; // Simulação de banco de dados em memória
  private nextId = 1;

  constructor(
    private readonly logService: CampanhaLogService,
    private readonly campanhaService: CampanhaService,
  ) {}

  async create(createRMDigitalDto: CreateRMDigitalDto): Promise<RMDigital> {
    try {
      // Verificar se a campanha existe
      await this.campanhaService.findOne(createRMDigitalDto.campanhaId);

      const rmDigital = new RMDigital({
        id: this.nextId++,
        ...createRMDigitalDto,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      this.rmDigitais.push(rmDigital);
      
      // Log da operação
      await this.logService.logOperation({
        entityType: 'RMDigital',
        entityId: rmDigital.id,
        operation: 'CREATE',
        changes: createRMDigitalDto,
        userId: 'system',
      });

      this.logger.log(`RM Digital criado com ID: ${rmDigital.id}`);
      return rmDigital;
    } catch (error) {
      this.logger.error(`Erro ao criar RM Digital: ${error.message}`);
      throw error;
    }
  }

  async findAll(): Promise<RMDigital[]> {
    try {
      this.logger.log(`Buscando todos os RM Digitais. Total: ${this.rmDigitais.length}`);
      return this.rmDigitais;
    } catch (error) {
      this.logger.error(`Erro ao buscar RM Digitais: ${error.message}`);
      throw error;
    }
  }

  async findByCampanha(campanhaId: number): Promise<RMDigital[]> {
    try {
      // Verificar se a campanha existe
      await this.campanhaService.findOne(campanhaId);

      const rmDigitaisCampanha = this.rmDigitais.filter(rm => rm.campanhaId === campanhaId);
      
      this.logger.log(`Encontrados ${rmDigitaisCampanha.length} RM Digitais para campanha ${campanhaId}`);
      return rmDigitaisCampanha;
    } catch (error) {
      this.logger.error(`Erro ao buscar RM Digitais por campanha: ${error.message}`);
      throw error;
    }
  }

  async findOne(id: number): Promise<RMDigital> {
    try {
      const rmDigital = this.rmDigitais.find(rm => rm.id === id);
      
      if (!rmDigital) {
        throw new NotFoundException(`RM Digital com ID ${id} não encontrado`);
      }

      this.logger.log(`RM Digital encontrado: ${rmDigital.id}`);
      return rmDigital;
    } catch (error) {
      this.logger.error(`Erro ao buscar RM Digital ID ${id}: ${error.message}`);
      throw error;
    }
  }

  async update(id: number, updateRMDigitalDto: UpdateRMDigitalDto): Promise<RMDigital> {
    try {
      const rmDigitalIndex = this.rmDigitais.findIndex(rm => rm.id === id);
      
      if (rmDigitalIndex === -1) {
        throw new NotFoundException(`RM Digital com ID ${id} não encontrado`);
      }

      const rmDigital = this.rmDigitais[rmDigitalIndex];
      const oldData = { ...rmDigital };

      // Atualizar campos
      Object.assign(rmDigital, updateRMDigitalDto, { updatedAt: new Date() });
      this.rmDigitais[rmDigitalIndex] = rmDigital;

      // Log da operação
      await this.logService.logOperation({
        entityType: 'RMDigital',
        entityId: id,
        operation: 'UPDATE',
        changes: updateRMDigitalDto,
        oldData,
        userId: 'system',
      });

      this.logger.log(`RM Digital ID ${id} atualizado`);
      return rmDigital;
    } catch (error) {
      this.logger.error(`Erro ao atualizar RM Digital ID ${id}: ${error.message}`);
      throw error;
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const rmDigitalIndex = this.rmDigitais.findIndex(rm => rm.id === id);
      
      if (rmDigitalIndex === -1) {
        throw new NotFoundException(`RM Digital com ID ${id} não encontrado`);
      }

      const rmDigital = this.rmDigitais[rmDigitalIndex];
      this.rmDigitais.splice(rmDigitalIndex, 1);

      // Log da operação
      await this.logService.logOperation({
        entityType: 'RMDigital',
        entityId: id,
        operation: 'DELETE',
        oldData: rmDigital,
        userId: 'system',
      });

      this.logger.log(`RM Digital ID ${id} removido`);
    } catch (error) {
      this.logger.error(`Erro ao remover RM Digital ID ${id}: ${error.message}`);
      throw error;
    }
  }

  async findByVeiculo(veiculo: string): Promise<RMDigital[]> {
    try {
      const rmDigitais = this.rmDigitais.filter(rm => 
        rm.veiculo && rm.veiculo.toLowerCase().includes(veiculo.toLowerCase())
      );
      
      this.logger.log(`Encontrados ${rmDigitais.length} RM Digitais com veículo: ${veiculo}`);
      return rmDigitais;
    } catch (error) {
      this.logger.error(`Erro ao buscar RM Digitais por veículo: ${error.message}`);
      throw error;
    }
  }

  async findByTipoMidia(tipoMidia: string): Promise<RMDigital[]> {
    try {
      const rmDigitais = this.rmDigitais.filter(rm => 
        rm.tipoMidia && rm.tipoMidia.toLowerCase().includes(tipoMidia.toLowerCase())
      );
      
      this.logger.log(`Encontrados ${rmDigitais.length} RM Digitais com tipo de mídia: ${tipoMidia}`);
      return rmDigitais;
    } catch (error) {
      this.logger.error(`Erro ao buscar RM Digitais por tipo de mídia: ${error.message}`);
      throw error;
    }
  }
}