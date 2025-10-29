import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ConteudosAnuncios } from '../entities/conteudos-anuncios.entity';
import { CreateConteudosAnunciosDto, UpdateConteudosAnunciosDto } from '../dto/conteudos-anuncios.dto';
import { CampanhaLogService } from './campanha-log.service';
import { CampanhaService } from './campanha.service';

@Injectable()
export class ConteudosAnunciosService {
  private readonly logger = new Logger(ConteudosAnunciosService.name);
  private conteudosAnuncios: ConteudosAnuncios[] = []; // Simulação de banco de dados em memória
  private nextId = 1;

  constructor(
    private readonly logService: CampanhaLogService,
    private readonly campanhaService: CampanhaService,
  ) {}

  async create(createConteudosAnunciosDto: CreateConteudosAnunciosDto): Promise<ConteudosAnuncios> {
    try {
      // Verificar se a campanha existe
      await this.campanhaService.findOne(createConteudosAnunciosDto.campanhaId);

      const conteudoAnuncio = new ConteudosAnuncios({
        id: this.nextId++,
        ...createConteudosAnunciosDto,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      this.conteudosAnuncios.push(conteudoAnuncio);
      
      // Log da operação
      await this.logService.logOperation({
        entityType: 'ConteudosAnuncios',
        entityId: conteudoAnuncio.id,
        operation: 'CREATE',
        changes: createConteudosAnunciosDto,
        userId: 'system',
      });

      this.logger.log(`Conteúdo/Anúncio criado com ID: ${conteudoAnuncio.id}`);
      return conteudoAnuncio;
    } catch (error) {
      this.logger.error(`Erro ao criar Conteúdo/Anúncio: ${error.message}`);
      throw error;
    }
  }

  async findAll(): Promise<ConteudosAnuncios[]> {
    try {
      this.logger.log(`Buscando todos os Conteúdos/Anúncios. Total: ${this.conteudosAnuncios.length}`);
      return this.conteudosAnuncios;
    } catch (error) {
      this.logger.error(`Erro ao buscar Conteúdos/Anúncios: ${error.message}`);
      throw error;
    }
  }

  async findByCampanha(campanhaId: number): Promise<ConteudosAnuncios[]> {
    try {
      // Verificar se a campanha existe
      await this.campanhaService.findOne(campanhaId);

      const conteudosCampanha = this.conteudosAnuncios.filter(ca => ca.campanhaId === campanhaId);
      
      this.logger.log(`Encontrados ${conteudosCampanha.length} Conteúdos/Anúncios para campanha ${campanhaId}`);
      return conteudosCampanha;
    } catch (error) {
      this.logger.error(`Erro ao buscar Conteúdos/Anúncios por campanha: ${error.message}`);
      throw error;
    }
  }

  async findOne(id: number): Promise<ConteudosAnuncios> {
    try {
      const conteudoAnuncio = this.conteudosAnuncios.find(ca => ca.id === id);
      
      if (!conteudoAnuncio) {
        throw new NotFoundException(`Conteúdo/Anúncio com ID ${id} não encontrado`);
      }

      this.logger.log(`Conteúdo/Anúncio encontrado: ${conteudoAnuncio.id}`);
      return conteudoAnuncio;
    } catch (error) {
      this.logger.error(`Erro ao buscar Conteúdo/Anúncio ID ${id}: ${error.message}`);
      throw error;
    }
  }

  async update(id: number, updateConteudosAnunciosDto: UpdateConteudosAnunciosDto): Promise<ConteudosAnuncios> {
    try {
      const conteudoIndex = this.conteudosAnuncios.findIndex(ca => ca.id === id);
      
      if (conteudoIndex === -1) {
        throw new NotFoundException(`Conteúdo/Anúncio com ID ${id} não encontrado`);
      }

      const conteudoAnuncio = this.conteudosAnuncios[conteudoIndex];
      const oldData = { ...conteudoAnuncio };

      // Atualizar campos
      Object.assign(conteudoAnuncio, updateConteudosAnunciosDto, { updatedAt: new Date() });
      this.conteudosAnuncios[conteudoIndex] = conteudoAnuncio;

      // Log da operação
      await this.logService.logOperation({
        entityType: 'ConteudosAnuncios',
        entityId: id,
        operation: 'UPDATE',
        changes: updateConteudosAnunciosDto,
        oldData,
        userId: 'system',
      });

      this.logger.log(`Conteúdo/Anúncio ID ${id} atualizado`);
      return conteudoAnuncio;
    } catch (error) {
      this.logger.error(`Erro ao atualizar Conteúdo/Anúncio ID ${id}: ${error.message}`);
      throw error;
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const conteudoIndex = this.conteudosAnuncios.findIndex(ca => ca.id === id);
      
      if (conteudoIndex === -1) {
        throw new NotFoundException(`Conteúdo/Anúncio com ID ${id} não encontrado`);
      }

      const conteudoAnuncio = this.conteudosAnuncios[conteudoIndex];
      this.conteudosAnuncios.splice(conteudoIndex, 1);

      // Log da operação
      await this.logService.logOperation({
        entityType: 'ConteudosAnuncios',
        entityId: id,
        operation: 'DELETE',
        oldData: conteudoAnuncio,
        userId: 'system',
      });

      this.logger.log(`Conteúdo/Anúncio ID ${id} removido`);
    } catch (error) {
      this.logger.error(`Erro ao remover Conteúdo/Anúncio ID ${id}: ${error.message}`);
      throw error;
    }
  }

  async findByProduto(produto: string): Promise<ConteudosAnuncios[]> {
    try {
      const conteudos = this.conteudosAnuncios.filter(ca => 
        ca.produto && ca.produto.toLowerCase().includes(produto.toLowerCase())
      );
      
      this.logger.log(`Encontrados ${conteudos.length} Conteúdos/Anúncios com produto: ${produto}`);
      return conteudos;
    } catch (error) {
      this.logger.error(`Erro ao buscar Conteúdos/Anúncios por produto: ${error.message}`);
      throw error;
    }
  }

  async findByVeiculo(veiculo: string): Promise<ConteudosAnuncios[]> {
    try {
      const conteudos = this.conteudosAnuncios.filter(ca => 
        ca.veiculo && ca.veiculo.toLowerCase().includes(veiculo.toLowerCase())
      );
      
      this.logger.log(`Encontrados ${conteudos.length} Conteúdos/Anúncios com veículo: ${veiculo}`);
      return conteudos;
    } catch (error) {
      this.logger.error(`Erro ao buscar Conteúdos/Anúncios por veículo: ${error.message}`);
      throw error;
    }
  }

  async findByEstrategia(estrategia: string): Promise<ConteudosAnuncios[]> {
    try {
      const conteudos = this.conteudosAnuncios.filter(ca => 
        ca.estrategia && ca.estrategia.toLowerCase().includes(estrategia.toLowerCase())
      );
      
      this.logger.log(`Encontrados ${conteudos.length} Conteúdos/Anúncios com estratégia: ${estrategia}`);
      return conteudos;
    } catch (error) {
      this.logger.error(`Erro ao buscar Conteúdos/Anúncios por estratégia: ${error.message}`);
      throw error;
    }
  }

  async findByIdPeca(idPeca: string): Promise<ConteudosAnuncios[]> {
    try {
      const conteudos = this.conteudosAnuncios.filter(ca => 
        ca.idPeca && ca.idPeca.toLowerCase().includes(idPeca.toLowerCase())
      );
      
      this.logger.log(`Encontrados ${conteudos.length} Conteúdos/Anúncios com ID da peça: ${idPeca}`);
      return conteudos;
    } catch (error) {
      this.logger.error(`Erro ao buscar Conteúdos/Anúncios por ID da peça: ${error.message}`);
      throw error;
    }
  }

  async findByFormato(formato: string): Promise<ConteudosAnuncios[]> {
    try {
      const conteudos = this.conteudosAnuncios.filter(ca => 
        ca.formato && ca.formato.toLowerCase().includes(formato.toLowerCase())
      );
      
      this.logger.log(`Encontrados ${conteudos.length} Conteúdos/Anúncios com formato: ${formato}`);
      return conteudos;
    } catch (error) {
      this.logger.error(`Erro ao buscar Conteúdos/Anúncios por formato: ${error.message}`);
      throw error;
    }
  }
}