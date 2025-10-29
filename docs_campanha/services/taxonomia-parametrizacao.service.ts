import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { TaxonomiaParametrizacao } from '../entities/taxonomia-parametrizacao.entity';
import { CreateTaxonomiaParametrizacaoDto, UpdateTaxonomiaParametrizacaoDto } from '../dto/taxonomia-parametrizacao.dto';
import { CampanhaLogService } from './campanha-log.service';
import { CampanhaService } from './campanha.service';

@Injectable()
export class TaxonomiaParametrizacaoService {
  private readonly logger = new Logger(TaxonomiaParametrizacaoService.name);
  private taxonomiaParametrizacoes: TaxonomiaParametrizacao[] = []; // Simulação de banco de dados em memória
  private nextId = 1;

  constructor(
    private readonly logService: CampanhaLogService,
    private readonly campanhaService: CampanhaService,
  ) {}

  async create(createTaxonomiaParametrizacaoDto: CreateTaxonomiaParametrizacaoDto): Promise<TaxonomiaParametrizacao> {
    try {
      // Verificar se a campanha existe
      await this.campanhaService.findOne(createTaxonomiaParametrizacaoDto.campanhaId);

      const taxonomiaParametrizacao = new TaxonomiaParametrizacao({
        id: this.nextId++,
        ...createTaxonomiaParametrizacaoDto,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      this.taxonomiaParametrizacoes.push(taxonomiaParametrizacao);
      
      // Log da operação
      await this.logService.logOperation({
        entityType: 'TaxonomiaParametrizacao',
        entityId: taxonomiaParametrizacao.id,
        operation: 'CREATE',
        changes: createTaxonomiaParametrizacaoDto,
        userId: 'system',
      });

      this.logger.log(`Taxonomia/Parametrização criada com ID: ${taxonomiaParametrizacao.id}`);
      return taxonomiaParametrizacao;
    } catch (error) {
      this.logger.error(`Erro ao criar Taxonomia/Parametrização: ${error.message}`);
      throw error;
    }
  }

  async findAll(): Promise<TaxonomiaParametrizacao[]> {
    try {
      this.logger.log(`Buscando todas as Taxonomias/Parametrizações. Total: ${this.taxonomiaParametrizacoes.length}`);
      return this.taxonomiaParametrizacoes;
    } catch (error) {
      this.logger.error(`Erro ao buscar Taxonomias/Parametrizações: ${error.message}`);
      throw error;
    }
  }

  async findByCampanha(campanhaId: number): Promise<TaxonomiaParametrizacao[]> {
    try {
      // Verificar se a campanha existe
      await this.campanhaService.findOne(campanhaId);

      const taxonomiasCampanha = this.taxonomiaParametrizacoes.filter(tp => tp.campanhaId === campanhaId);
      
      this.logger.log(`Encontradas ${taxonomiasCampanha.length} Taxonomias/Parametrizações para campanha ${campanhaId}`);
      return taxonomiasCampanha;
    } catch (error) {
      this.logger.error(`Erro ao buscar Taxonomias/Parametrizações por campanha: ${error.message}`);
      throw error;
    }
  }

  async findOne(id: number): Promise<TaxonomiaParametrizacao> {
    try {
      const taxonomiaParametrizacao = this.taxonomiaParametrizacoes.find(tp => tp.id === id);
      
      if (!taxonomiaParametrizacao) {
        throw new NotFoundException(`Taxonomia/Parametrização com ID ${id} não encontrada`);
      }

      this.logger.log(`Taxonomia/Parametrização encontrada: ${taxonomiaParametrizacao.id}`);
      return taxonomiaParametrizacao;
    } catch (error) {
      this.logger.error(`Erro ao buscar Taxonomia/Parametrização ID ${id}: ${error.message}`);
      throw error;
    }
  }

  async update(id: number, updateTaxonomiaParametrizacaoDto: UpdateTaxonomiaParametrizacaoDto): Promise<TaxonomiaParametrizacao> {
    try {
      const taxonomiaIndex = this.taxonomiaParametrizacoes.findIndex(tp => tp.id === id);
      
      if (taxonomiaIndex === -1) {
        throw new NotFoundException(`Taxonomia/Parametrização com ID ${id} não encontrada`);
      }

      const taxonomiaParametrizacao = this.taxonomiaParametrizacoes[taxonomiaIndex];
      const oldData = { ...taxonomiaParametrizacao };

      // Atualizar campos
      Object.assign(taxonomiaParametrizacao, updateTaxonomiaParametrizacaoDto, { updatedAt: new Date() });
      this.taxonomiaParametrizacoes[taxonomiaIndex] = taxonomiaParametrizacao;

      // Log da operação
      await this.logService.logOperation({
        entityType: 'TaxonomiaParametrizacao',
        entityId: id,
        operation: 'UPDATE',
        changes: updateTaxonomiaParametrizacaoDto,
        oldData,
        userId: 'system',
      });

      this.logger.log(`Taxonomia/Parametrização ID ${id} atualizada`);
      return taxonomiaParametrizacao;
    } catch (error) {
      this.logger.error(`Erro ao atualizar Taxonomia/Parametrização ID ${id}: ${error.message}`);
      throw error;
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const taxonomiaIndex = this.taxonomiaParametrizacoes.findIndex(tp => tp.id === id);
      
      if (taxonomiaIndex === -1) {
        throw new NotFoundException(`Taxonomia/Parametrização com ID ${id} não encontrada`);
      }

      const taxonomiaParametrizacao = this.taxonomiaParametrizacoes[taxonomiaIndex];
      this.taxonomiaParametrizacoes.splice(taxonomiaIndex, 1);

      // Log da operação
      await this.logService.logOperation({
        entityType: 'TaxonomiaParametrizacao',
        entityId: id,
        operation: 'DELETE',
        oldData: taxonomiaParametrizacao,
        userId: 'system',
      });

      this.logger.log(`Taxonomia/Parametrização ID ${id} removida`);
    } catch (error) {
      this.logger.error(`Erro ao remover Taxonomia/Parametrização ID ${id}: ${error.message}`);
      throw error;
    }
  }

  async findByAdvertiser(advertiser: string): Promise<TaxonomiaParametrizacao[]> {
    try {
      const taxonomias = this.taxonomiaParametrizacoes.filter(tp => 
        tp.advertiser && tp.advertiser.toLowerCase().includes(advertiser.toLowerCase())
      );
      
      this.logger.log(`Encontradas ${taxonomias.length} Taxonomias/Parametrizações com advertiser: ${advertiser}`);
      return taxonomias;
    } catch (error) {
      this.logger.error(`Erro ao buscar Taxonomias/Parametrizações por advertiser: ${error.message}`);
      throw error;
    }
  }

  async findByVeiculoPlataforma(veiculo: string): Promise<TaxonomiaParametrizacao[]> {
    try {
      const taxonomias = this.taxonomiaParametrizacoes.filter(tp => 
        tp.veiculoPlataformaPublisher && tp.veiculoPlataformaPublisher.toLowerCase().includes(veiculo.toLowerCase())
      );
      
      this.logger.log(`Encontradas ${taxonomias.length} Taxonomias/Parametrizações com veículo/plataforma: ${veiculo}`);
      return taxonomias;
    } catch (error) {
      this.logger.error(`Erro ao buscar Taxonomias/Parametrizações por veículo/plataforma: ${error.message}`);
      throw error;
    }
  }

  async findByAgencia(agencia: string): Promise<TaxonomiaParametrizacao[]> {
    try {
      const taxonomias = this.taxonomiaParametrizacoes.filter(tp => 
        tp.agencia && tp.agencia.toLowerCase().includes(agencia.toLowerCase())
      );
      
      this.logger.log(`Encontradas ${taxonomias.length} Taxonomias/Parametrizações com agência: ${agencia}`);
      return taxonomias;
    } catch (error) {
      this.logger.error(`Erro ao buscar Taxonomias/Parametrizações por agência: ${error.message}`);
      throw error;
    }
  }

  async findByCanal(canal: string): Promise<TaxonomiaParametrizacao[]> {
    try {
      const taxonomias = this.taxonomiaParametrizacoes.filter(tp => 
        tp.canal && tp.canal.toLowerCase().includes(canal.toLowerCase())
      );
      
      this.logger.log(`Encontradas ${taxonomias.length} Taxonomias/Parametrizações com canal: ${canal}`);
      return taxonomias;
    } catch (error) {
      this.logger.error(`Erro ao buscar Taxonomias/Parametrizações por canal: ${error.message}`);
      throw error;
    }
  }

  async findByDispositivo(dispositivo: string): Promise<TaxonomiaParametrizacao[]> {
    try {
      const taxonomias = this.taxonomiaParametrizacoes.filter(tp => 
        tp.dispositivo && tp.dispositivo.toLowerCase().includes(dispositivo.toLowerCase())
      );
      
      this.logger.log(`Encontradas ${taxonomias.length} Taxonomias/Parametrizações com dispositivo: ${dispositivo}`);
      return taxonomias;
    } catch (error) {
      this.logger.error(`Erro ao buscar Taxonomias/Parametrizações por dispositivo: ${error.message}`);
      throw error;
    }
  }

  async findByTipoCompra(tipoCompra: string): Promise<TaxonomiaParametrizacao[]> {
    try {
      const taxonomias = this.taxonomiaParametrizacoes.filter(tp => 
        tp.tipoCompraCm && tp.tipoCompraCm.toLowerCase().includes(tipoCompra.toLowerCase())
      );
      
      this.logger.log(`Encontradas ${taxonomias.length} Taxonomias/Parametrizações com tipo de compra: ${tipoCompra}`);
      return taxonomias;
    } catch (error) {
      this.logger.error(`Erro ao buscar Taxonomias/Parametrizações por tipo de compra: ${error.message}`);
      throw error;
    }
  }

  async findByGoal(goal: string): Promise<TaxonomiaParametrizacao[]> {
    try {
      const taxonomias = this.taxonomiaParametrizacoes.filter(tp => 
        tp.goal && tp.goal.toLowerCase().includes(goal.toLowerCase())
      );
      
      this.logger.log(`Encontradas ${taxonomias.length} Taxonomias/Parametrizações com goal: ${goal}`);
      return taxonomias;
    } catch (error) {
      this.logger.error(`Erro ao buscar Taxonomias/Parametrizações por goal: ${error.message}`);
      throw error;
    }
  }

  async findByInventoryType(inventoryType: string): Promise<TaxonomiaParametrizacao[]> {
    try {
      const taxonomias = this.taxonomiaParametrizacoes.filter(tp => 
        tp.inventoryType && tp.inventoryType.toLowerCase().includes(inventoryType.toLowerCase())
      );
      
      this.logger.log(`Encontradas ${taxonomias.length} Taxonomias/Parametrizações com inventory type: ${inventoryType}`);
      return taxonomias;
    } catch (error) {
      this.logger.error(`Erro ao buscar Taxonomias/Parametrizações por inventory type: ${error.message}`);
      throw error;
    }
  }

  async findByFormatoCriativo(formato: string): Promise<TaxonomiaParametrizacao[]> {
    try {
      const taxonomias = this.taxonomiaParametrizacoes.filter(tp => 
        tp.formatoCriativo && tp.formatoCriativo.toLowerCase().includes(formato.toLowerCase())
      );
      
      this.logger.log(`Encontradas ${taxonomias.length} Taxonomias/Parametrizações com formato criativo: ${formato}`);
      return taxonomias;
    } catch (error) {
      this.logger.error(`Erro ao buscar Taxonomias/Parametrizações por formato criativo: ${error.message}`);
      throw error;
    }
  }

  async findByTecnologiaAdserver(tecnologia: string): Promise<TaxonomiaParametrizacao[]> {
    try {
      const taxonomias = this.taxonomiaParametrizacoes.filter(tp => 
        tp.tecnologiaAdserverCm && tp.tecnologiaAdserverCm.toLowerCase().includes(tecnologia.toLowerCase())
      );
      
      this.logger.log(`Encontradas ${taxonomias.length} Taxonomias/Parametrizações com tecnologia adserver: ${tecnologia}`);
      return taxonomias;
    } catch (error) {
      this.logger.error(`Erro ao buscar Taxonomias/Parametrizações por tecnologia adserver: ${error.message}`);
      throw error;
    }
  }

  async findByNumeroAcaoPac(numeroAcao: string): Promise<TaxonomiaParametrizacao[]> {
    try {
      const taxonomias = this.taxonomiaParametrizacoes.filter(tp => 
        tp.numeroAcaoPac && tp.numeroAcaoPac.toLowerCase().includes(numeroAcao.toLowerCase())
      );
      
      this.logger.log(`Encontradas ${taxonomias.length} Taxonomias/Parametrizações com número ação PAC: ${numeroAcao}`);
      return taxonomias;
    } catch (error) {
      this.logger.error(`Erro ao buscar Taxonomias/Parametrizações por número ação PAC: ${error.message}`);
      throw error;
    }
  }

  async findByNumeroProjeto(numeroProjeto: string): Promise<TaxonomiaParametrizacao[]> {
    try {
      const taxonomias = this.taxonomiaParametrizacoes.filter(tp => 
        tp.numeroProjeto && tp.numeroProjeto.toLowerCase().includes(numeroProjeto.toLowerCase())
      );
      
      this.logger.log(`Encontradas ${taxonomias.length} Taxonomias/Parametrizações com número projeto: ${numeroProjeto}`);
      return taxonomias;
    } catch (error) {
      this.logger.error(`Erro ao buscar Taxonomias/Parametrizações por número projeto: ${error.message}`);
      throw error;
    }
  }
}