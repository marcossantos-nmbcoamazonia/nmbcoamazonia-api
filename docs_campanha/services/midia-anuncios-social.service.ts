import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { MidiaAnunciosSocial } from '../entities/midia-anuncios-social.entity';
import { CreateMidiaAnunciosSocialDto, UpdateMidiaAnunciosSocialDto } from '../dto/midia-anuncios-social.dto';
import { CampanhaLogService } from './campanha-log.service';
import { CampanhaService } from './campanha.service';

@Injectable()
export class MidiaAnunciosSocialService {
  private readonly logger = new Logger(MidiaAnunciosSocialService.name);
  private midiaAnunciosSociais: MidiaAnunciosSocial[] = []; // Simulação de banco de dados em memória
  private nextId = 1;

  constructor(
    private readonly logService: CampanhaLogService,
    private readonly campanhaService: CampanhaService,
  ) {}

  async create(createMidiaAnunciosSocialDto: CreateMidiaAnunciosSocialDto): Promise<MidiaAnunciosSocial> {
    try {
      // Verificar se a campanha existe
      await this.campanhaService.findOne(createMidiaAnunciosSocialDto.campanhaId);

      const midiaAnuncioSocial = new MidiaAnunciosSocial({
        id: this.nextId++,
        ...createMidiaAnunciosSocialDto,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      this.midiaAnunciosSociais.push(midiaAnuncioSocial);
      
      // Log da operação
      await this.logService.logOperation({
        entityType: 'MidiaAnunciosSocial',
        entityId: midiaAnuncioSocial.id,
        operation: 'CREATE',
        changes: createMidiaAnunciosSocialDto,
        userId: 'system',
      });

      this.logger.log(`Mídia/Anúncio Social criado com ID: ${midiaAnuncioSocial.id}`);
      return midiaAnuncioSocial;
    } catch (error) {
      this.logger.error(`Erro ao criar Mídia/Anúncio Social: ${error.message}`);
      throw error;
    }
  }

  async findAll(): Promise<MidiaAnunciosSocial[]> {
    try {
      this.logger.log(`Buscando todos os Mídia/Anúncios Sociais. Total: ${this.midiaAnunciosSociais.length}`);
      return this.midiaAnunciosSociais;
    } catch (error) {
      this.logger.error(`Erro ao buscar Mídia/Anúncios Sociais: ${error.message}`);
      throw error;
    }
  }

  async findByCampanha(campanhaId: number): Promise<MidiaAnunciosSocial[]> {
    try {
      // Verificar se a campanha existe
      await this.campanhaService.findOne(campanhaId);

      const midiasCampanha = this.midiaAnunciosSociais.filter(mas => mas.campanhaId === campanhaId);
      
      this.logger.log(`Encontrados ${midiasCampanha.length} Mídia/Anúncios Sociais para campanha ${campanhaId}`);
      return midiasCampanha;
    } catch (error) {
      this.logger.error(`Erro ao buscar Mídia/Anúncios Sociais por campanha: ${error.message}`);
      throw error;
    }
  }

  async findOne(id: number): Promise<MidiaAnunciosSocial> {
    try {
      const midiaAnuncioSocial = this.midiaAnunciosSociais.find(mas => mas.id === id);
      
      if (!midiaAnuncioSocial) {
        throw new NotFoundException(`Mídia/Anúncio Social com ID ${id} não encontrado`);
      }

      this.logger.log(`Mídia/Anúncio Social encontrado: ${midiaAnuncioSocial.id}`);
      return midiaAnuncioSocial;
    } catch (error) {
      this.logger.error(`Erro ao buscar Mídia/Anúncio Social ID ${id}: ${error.message}`);
      throw error;
    }
  }

  async update(id: number, updateMidiaAnunciosSocialDto: UpdateMidiaAnunciosSocialDto): Promise<MidiaAnunciosSocial> {
    try {
      const midiaIndex = this.midiaAnunciosSociais.findIndex(mas => mas.id === id);
      
      if (midiaIndex === -1) {
        throw new NotFoundException(`Mídia/Anúncio Social com ID ${id} não encontrado`);
      }

      const midiaAnuncioSocial = this.midiaAnunciosSociais[midiaIndex];
      const oldData = { ...midiaAnuncioSocial };

      // Atualizar campos
      Object.assign(midiaAnuncioSocial, updateMidiaAnunciosSocialDto, { updatedAt: new Date() });
      this.midiaAnunciosSociais[midiaIndex] = midiaAnuncioSocial;

      // Log da operação
      await this.logService.logOperation({
        entityType: 'MidiaAnunciosSocial',
        entityId: id,
        operation: 'UPDATE',
        changes: updateMidiaAnunciosSocialDto,
        oldData,
        userId: 'system',
      });

      this.logger.log(`Mídia/Anúncio Social ID ${id} atualizado`);
      return midiaAnuncioSocial;
    } catch (error) {
      this.logger.error(`Erro ao atualizar Mídia/Anúncio Social ID ${id}: ${error.message}`);
      throw error;
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const midiaIndex = this.midiaAnunciosSociais.findIndex(mas => mas.id === id);
      
      if (midiaIndex === -1) {
        throw new NotFoundException(`Mídia/Anúncio Social com ID ${id} não encontrado`);
      }

      const midiaAnuncioSocial = this.midiaAnunciosSociais[midiaIndex];
      this.midiaAnunciosSociais.splice(midiaIndex, 1);

      // Log da operação
      await this.logService.logOperation({
        entityType: 'MidiaAnunciosSocial',
        entityId: id,
        operation: 'DELETE',
        oldData: midiaAnuncioSocial,
        userId: 'system',
      });

      this.logger.log(`Mídia/Anúncio Social ID ${id} removido`);
    } catch (error) {
      this.logger.error(`Erro ao remover Mídia/Anúncio Social ID ${id}: ${error.message}`);
      throw error;
    }
  }

  async findByResponsavel(responsavel: string): Promise<MidiaAnunciosSocial[]> {
    try {
      const midias = this.midiaAnunciosSociais.filter(mas => 
        mas.responsavel && mas.responsavel.toLowerCase().includes(responsavel.toLowerCase())
      );
      
      this.logger.log(`Encontrados ${midias.length} Mídia/Anúncios Sociais com responsável: ${responsavel}`);
      return midias;
    } catch (error) {
      this.logger.error(`Erro ao buscar Mídia/Anúncios Sociais por responsável: ${error.message}`);
      throw error;
    }
  }

  async findByStatus(status: string): Promise<MidiaAnunciosSocial[]> {
    try {
      const midias = this.midiaAnunciosSociais.filter(mas => 
        mas.status && mas.status.toLowerCase().includes(status.toLowerCase())
      );
      
      this.logger.log(`Encontrados ${midias.length} Mídia/Anúncios Sociais com status: ${status}`);
      return midias;
    } catch (error) {
      this.logger.error(`Erro ao buscar Mídia/Anúncios Sociais por status: ${error.message}`);
      throw error;
    }
  }

  async findByVeiculo(veiculo: string): Promise<MidiaAnunciosSocial[]> {
    try {
      const midias = this.midiaAnunciosSociais.filter(mas => 
        mas.veiculo && mas.veiculo.toLowerCase().includes(veiculo.toLowerCase())
      );
      
      this.logger.log(`Encontrados ${midias.length} Mídia/Anúncios Sociais com veículo: ${veiculo}`);
      return midias;
    } catch (error) {
      this.logger.error(`Erro ao buscar Mídia/Anúncios Sociais por veículo: ${error.message}`);
      throw error;
    }
  }

  async findByProduto(produto: string): Promise<MidiaAnunciosSocial[]> {
    try {
      const midias = this.midiaAnunciosSociais.filter(mas => 
        mas.produto && mas.produto.toLowerCase().includes(produto.toLowerCase())
      );
      
      this.logger.log(`Encontrados ${midias.length} Mídia/Anúncios Sociais com produto: ${produto}`);
      return midias;
    } catch (error) {
      this.logger.error(`Erro ao buscar Mídia/Anúncios Sociais por produto: ${error.message}`);
      throw error;
    }
  }

  async findByAgencia(agencia: string): Promise<MidiaAnunciosSocial[]> {
    try {
      const midias = this.midiaAnunciosSociais.filter(mas => 
        mas.agencia && mas.agencia.toLowerCase().includes(agencia.toLowerCase())
      );
      
      this.logger.log(`Encontrados ${midias.length} Mídia/Anúncios Sociais com agência: ${agencia}`);
      return midias;
    } catch (error) {
      this.logger.error(`Erro ao buscar Mídia/Anúncios Sociais por agência: ${error.message}`);
      throw error;
    }
  }

  async findByFormato(formato: string): Promise<MidiaAnunciosSocial[]> {
    try {
      const midias = this.midiaAnunciosSociais.filter(mas => 
        mas.formato && mas.formato.toLowerCase().includes(formato.toLowerCase())
      );
      
      this.logger.log(`Encontrados ${midias.length} Mídia/Anúncios Sociais com formato: ${formato}`);
      return midias;
    } catch (error) {
      this.logger.error(`Erro ao buscar Mídia/Anúncios Sociais por formato: ${error.message}`);
      throw error;
    }
  }

  async findByEstrategia(estrategia: string): Promise<MidiaAnunciosSocial[]> {
    try {
      const midias = this.midiaAnunciosSociais.filter(mas => 
        mas.estrategia && mas.estrategia.toLowerCase().includes(estrategia.toLowerCase())
      );
      
      this.logger.log(`Encontrados ${midias.length} Mídia/Anúncios Sociais com estratégia: ${estrategia}`);
      return midias;
    } catch (error) {
      this.logger.error(`Erro ao buscar Mídia/Anúncios Sociais por estratégia: ${error.message}`);
      throw error;
    }
  }

  async findByTipoAudiencia(tipoAudiencia: string): Promise<MidiaAnunciosSocial[]> {
    try {
      const midias = this.midiaAnunciosSociais.filter(mas => 
        mas.tipoAudiencia && mas.tipoAudiencia.toLowerCase().includes(tipoAudiencia.toLowerCase())
      );
      
      this.logger.log(`Encontrados ${midias.length} Mídia/Anúncios Sociais com tipo de audiência: ${tipoAudiencia}`);
      return midias;
    } catch (error) {
      this.logger.error(`Erro ao buscar Mídia/Anúncios Sociais por tipo de audiência: ${error.message}`);
      throw error;
    }
  }

  async findByObjetivo(objetivo: string): Promise<MidiaAnunciosSocial[]> {
    try {
      const midias = this.midiaAnunciosSociais.filter(mas => 
        mas.objetivo && mas.objetivo.toLowerCase().includes(objetivo.toLowerCase())
      );
      
      this.logger.log(`Encontrados ${midias.length} Mídia/Anúncios Sociais com objetivo: ${objetivo}`);
      return midias;
    } catch (error) {
      this.logger.error(`Erro ao buscar Mídia/Anúncios Sociais por objetivo: ${error.message}`);
      throw error;
    }
  }
}