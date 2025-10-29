import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsDateString, IsOptional } from 'class-validator';

export class TaxonomiaParametrizacao {
  @ApiProperty({
    description: 'ID único do registro',
    example: '1'
  })
  id: number;

  @ApiProperty({
    description: 'ID da campanha associada',
    example: 1
  })
  @IsNumber()
  @IsNotEmpty()
  campanhaId: number;

  @ApiProperty({
    description: 'Plano de Mídia - Versão',
    example: 'V1.0'
  })
  @IsString()
  @IsOptional()
  planoMidiaVersao?: string;

  @ApiProperty({
    description: 'Plano de Mídia - Linha',
    example: 'Linha 1'
  })
  @IsString()
  @IsOptional()
  planoMidiaLinha?: string;

  @ApiProperty({
    description: 'Advertiser',
    example: 'Brasil Seguradora'
  })
  @IsString()
  @IsOptional()
  advertiser?: string;

  @ApiProperty({
    description: 'Advertiser (Abreviado)',
    example: 'BRS'
  })
  @IsString()
  @IsOptional()
  advertiserAbreviado?: string;

  @ApiProperty({
    description: 'Nome do Projeto/Campanha',
    example: 'Campanha Black Friday 2024'
  })
  @IsString()
  @IsOptional()
  nomeProjetoCampanha?: string;

  @ApiProperty({
    description: 'Argumento',
    example: 'Proteção e economia'
  })
  @IsString()
  @IsOptional()
  argumento?: string;

  @ApiProperty({
    description: 'Número Ação PAC (Axxxx/xxxxx)',
    example: 'A2024/00123'
  })
  @IsString()
  @IsOptional()
  numeroAcaoPac?: string;

  @ApiProperty({
    description: 'Número Projeto (Pxxxx/xxxxx)',
    example: 'P2024/00456'
  })
  @IsString()
  @IsOptional()
  numeroProjeto?: string;

  @ApiProperty({
    description: 'Nome da Campanha (CM)',
    example: 'CM_BlackFriday_2024'
  })
  @IsString()
  @IsOptional()
  nomeCampanhaCm?: string;

  @ApiProperty({
    description: 'Veículo/Plataforma/Publisher (CM e DV)',
    example: 'Google Ads'
  })
  @IsString()
  @IsOptional()
  veiculoPlataformaPublisher?: string;

  @ApiProperty({
    description: 'Inventory Type (DV)',
    example: 'Premium'
  })
  @IsString()
  @IsOptional()
  inventoryType?: string;

  @ApiProperty({
    description: 'Goal',
    example: 'Conversions'
  })
  @IsString()
  @IsOptional()
  goal?: string;

  @ApiProperty({
    description: 'Optimization IO (DV)',
    example: 'CPA'
  })
  @IsString()
  @IsOptional()
  optimizationIo?: string;

  @ApiProperty({
    description: 'Targeting Macro (DV - IO)',
    example: 'Age 25-45'
  })
  @IsString()
  @IsOptional()
  targetingMacroIo?: string;

  @ApiProperty({
    description: 'Detalhamento, Segmentação, Macro (DV - IO)',
    example: 'Interests: Insurance, Finance'
  })
  @IsString()
  @IsOptional()
  detalhamentoSegmentacaoIo?: string;

  @ApiProperty({
    description: 'Targeting Macro (DV - Line Item)',
    example: 'Gender: All'
  })
  @IsString()
  @IsOptional()
  targetingMacroLineItem?: string;

  @ApiProperty({
    description: 'Detalhamento, Segmentação Macro (DV - Line Item)',
    example: 'Location: Brazil'
  })
  @IsString()
  @IsOptional()
  detalhamentoSegmentacaoLineItem?: string;

  @ApiProperty({
    description: 'Targeting Macro (CM)',
    example: 'Custom Audiences'
  })
  @IsString()
  @IsOptional()
  targetingMacroCm?: string;

  @ApiProperty({
    description: 'Praça',
    example: 'Nacional'
  })
  @IsString()
  @IsOptional()
  praca?: string;

  @ApiProperty({
    description: 'Canal',
    example: 'Digital'
  })
  @IsString()
  @IsOptional()
  canal?: string;

  @ApiProperty({
    description: 'Agência',
    example: 'Agência ABC'
  })
  @IsString()
  @IsOptional()
  agencia?: string;

  @ApiProperty({
    description: 'Mês de Referência',
    example: 'Dezembro 2024'
  })
  @IsString()
  @IsOptional()
  mesReferencia?: string;

  @ApiProperty({
    description: 'Optimization (Line Item)',
    example: 'CTR'
  })
  @IsString()
  @IsOptional()
  optimizationLineItem?: string;

  @ApiProperty({
    description: 'Tipo de Mídia / Line Item Type',
    example: 'Display'
  })
  @IsString()
  @IsOptional()
  tipoMidiaLineItemType?: string;

  @ApiProperty({
    description: 'Tipo de Compra (CM)',
    example: 'Programmatic'
  })
  @IsString()
  @IsOptional()
  tipoCompraCm?: string;

  @ApiProperty({
    description: 'Tecnologia Adserver (CM)',
    example: 'Google Ad Manager'
  })
  @IsString()
  @IsOptional()
  tecnologiaAdserverCm?: string;

  @ApiProperty({
    description: 'Formato de Criativo',
    example: 'Banner 300x250'
  })
  @IsString()
  @IsOptional()
  formatoCriativo?: string;

  @ApiProperty({
    description: 'Dimensão',
    example: '300x250'
  })
  @IsString()
  @IsOptional()
  dimensao?: string;

  @ApiProperty({
    description: 'Dispositivo',
    example: 'Desktop'
  })
  @IsString()
  @IsOptional()
  dispositivo?: string;

  @ApiProperty({
    description: 'ID do Parâmetro',
    example: 'PAR001'
  })
  @IsString()
  @IsOptional()
  idParametro?: string;

  @ApiProperty({
    description: 'Linha Criativa (CM e Criativo)',
    example: 'Criativo Principal'
  })
  @IsString()
  @IsOptional()
  linhaCriativa?: string;

  @ApiProperty({
    description: 'Conteúdo da Peça',
    example: 'Banner promocional Black Friday'
  })
  @IsString()
  @IsOptional()
  conteudoPeca?: string;

  @ApiProperty({
    description: 'Data Prevista de Início (CM)',
    example: '2024-12-01T00:00:00.000Z'
  })
  @IsDateString()
  @IsOptional()
  dataPrevistaInicioCm?: string;

  @ApiProperty({
    description: 'Data Prevista de Finalização (CM)',
    example: '2024-12-31T23:59:59.000Z'
  })
  @IsDateString()
  @IsOptional()
  dataPrevistaFinalizacaoCm?: string;

  @ApiProperty({
    description: 'INSERTION ORDER DSP',
    example: 'IO_001_BRS_2024'
  })
  @IsString()
  @IsOptional()
  insertionOrderDsp?: string;

  @ApiProperty({
    description: 'LINE ITEM DSP',
    example: 'LI_001_Banner_Desktop'
  })
  @IsString()
  @IsOptional()
  lineItemDsp?: string;

  @ApiProperty({
    description: 'CONTAGEM CARACTERES',
    example: 50
  })
  @IsNumber()
  @IsOptional()
  contagemCaracteres?: number;

  @ApiProperty({
    description: 'LINE ITEM PLACEMENT CM',
    example: 'PLC_Homepage_Banner'
  })
  @IsString()
  @IsOptional()
  lineItemPlacementCm?: string;

  @ApiProperty({
    description: 'CREATIVE DSP / CREATIVE CM',
    example: 'CRV_BlackFriday_Banner_300x250'
  })
  @IsString()
  @IsOptional()
  creativeDspCm?: string;

  @ApiProperty({
    description: 'URL DE DESTINO',
    example: 'https://example.com/blackfriday'
  })
  @IsString()
  @IsOptional()
  urlDestino?: string;

  @ApiProperty({
    description: 'NOME ANÚNCIO',
    example: 'Black Friday 2024 - Seguros'
  })
  @IsString()
  @IsOptional()
  nomeAnuncio?: string;

  @ApiProperty({
    description: 'URL DE DESTINO - PARAMETRIZADA',
    example: 'https://example.com/blackfriday?utm_source=google&utm_medium=display&utm_campaign=blackfriday2024'
  })
  @IsString()
  @IsOptional()
  urlDestinoParametrizada?: string;

  @ApiProperty({
    description: 'Data de criação do registro'
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Data de atualização do registro'
  })
  updatedAt: Date;

  constructor(partial: Partial<TaxonomiaParametrizacao>) {
    Object.assign(this, partial);
  }
}