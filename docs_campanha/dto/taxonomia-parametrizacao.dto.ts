import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsDateString, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTaxonomiaParametrizacaoDto {
  @ApiProperty({
    description: 'ID da campanha associada',
    example: 1
  })
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  campanhaId: number;

  @ApiProperty({
    description: 'Plano de Mídia - Versão',
    example: 'V1.0',
    required: false
  })
  @IsString()
  @IsOptional()
  planoMidiaVersao?: string;

  @ApiProperty({
    description: 'Plano de Mídia - Linha',
    example: 'Linha 1',
    required: false
  })
  @IsString()
  @IsOptional()
  planoMidiaLinha?: string;

  @ApiProperty({
    description: 'Advertiser',
    example: 'Brasil Seguradora',
    required: false
  })
  @IsString()
  @IsOptional()
  advertiser?: string;

  @ApiProperty({
    description: 'Advertiser (Abreviado)',
    example: 'BRS',
    required: false
  })
  @IsString()
  @IsOptional()
  advertiserAbreviado?: string;

  @ApiProperty({
    description: 'Nome do Projeto/Campanha',
    example: 'Campanha Black Friday 2024',
    required: false
  })
  @IsString()
  @IsOptional()
  nomeProjetoCampanha?: string;

  @ApiProperty({
    description: 'Argumento',
    example: 'Proteção e economia',
    required: false
  })
  @IsString()
  @IsOptional()
  argumento?: string;

  @ApiProperty({
    description: 'Número Ação PAC (Axxxx/xxxxx)',
    example: 'A2024/00123',
    required: false
  })
  @IsString()
  @IsOptional()
  numeroAcaoPac?: string;

  @ApiProperty({
    description: 'Número Projeto (Pxxxx/xxxxx)',
    example: 'P2024/00456',
    required: false
  })
  @IsString()
  @IsOptional()
  numeroProjeto?: string;

  @ApiProperty({
    description: 'Nome da Campanha (CM)',
    example: 'CM_BlackFriday_2024',
    required: false
  })
  @IsString()
  @IsOptional()
  nomeCampanhaCm?: string;

  @ApiProperty({
    description: 'Veículo/Plataforma/Publisher (CM e DV)',
    example: 'Google Ads',
    required: false
  })
  @IsString()
  @IsOptional()
  veiculoPlataformaPublisher?: string;

  @ApiProperty({
    description: 'Inventory Type (DV)',
    example: 'Premium',
    required: false
  })
  @IsString()
  @IsOptional()
  inventoryType?: string;

  @ApiProperty({
    description: 'Goal',
    example: 'Conversions',
    required: false
  })
  @IsString()
  @IsOptional()
  goal?: string;

  @ApiProperty({
    description: 'Optimization IO (DV)',
    example: 'CPA',
    required: false
  })
  @IsString()
  @IsOptional()
  optimizationIo?: string;

  @ApiProperty({
    description: 'Targeting Macro (DV - IO)',
    example: 'Age 25-45',
    required: false
  })
  @IsString()
  @IsOptional()
  targetingMacroIo?: string;

  @ApiProperty({
    description: 'Detalhamento, Segmentação, Macro (DV - IO)',
    example: 'Interests: Insurance, Finance',
    required: false
  })
  @IsString()
  @IsOptional()
  detalhamentoSegmentacaoIo?: string;

  @ApiProperty({
    description: 'Targeting Macro (DV - Line Item)',
    example: 'Gender: All',
    required: false
  })
  @IsString()
  @IsOptional()
  targetingMacroLineItem?: string;

  @ApiProperty({
    description: 'Detalhamento, Segmentação Macro (DV - Line Item)',
    example: 'Location: Brazil',
    required: false
  })
  @IsString()
  @IsOptional()
  detalhamentoSegmentacaoLineItem?: string;

  @ApiProperty({
    description: 'Targeting Macro (CM)',
    example: 'Custom Audiences',
    required: false
  })
  @IsString()
  @IsOptional()
  targetingMacroCm?: string;

  @ApiProperty({
    description: 'Praça',
    example: 'Nacional',
    required: false
  })
  @IsString()
  @IsOptional()
  praca?: string;

  @ApiProperty({
    description: 'Canal',
    example: 'Digital',
    required: false
  })
  @IsString()
  @IsOptional()
  canal?: string;

  @ApiProperty({
    description: 'Agência',
    example: 'Agência ABC',
    required: false
  })
  @IsString()
  @IsOptional()
  agencia?: string;

  @ApiProperty({
    description: 'Mês de Referência',
    example: 'Dezembro 2024',
    required: false
  })
  @IsString()
  @IsOptional()
  mesReferencia?: string;

  @ApiProperty({
    description: 'Optimization (Line Item)',
    example: 'CTR',
    required: false
  })
  @IsString()
  @IsOptional()
  optimizationLineItem?: string;

  @ApiProperty({
    description: 'Tipo de Mídia / Line Item Type',
    example: 'Display',
    required: false
  })
  @IsString()
  @IsOptional()
  tipoMidiaLineItemType?: string;

  @ApiProperty({
    description: 'Tipo de Compra (CM)',
    example: 'Programmatic',
    required: false
  })
  @IsString()
  @IsOptional()
  tipoCompraCm?: string;

  @ApiProperty({
    description: 'Tecnologia Adserver (CM)',
    example: 'Google Ad Manager',
    required: false
  })
  @IsString()
  @IsOptional()
  tecnologiaAdserverCm?: string;

  @ApiProperty({
    description: 'Formato de Criativo',
    example: 'Banner 300x250',
    required: false
  })
  @IsString()
  @IsOptional()
  formatoCriativo?: string;

  @ApiProperty({
    description: 'Dimensão',
    example: '300x250',
    required: false
  })
  @IsString()
  @IsOptional()
  dimensao?: string;

  @ApiProperty({
    description: 'Dispositivo',
    example: 'Desktop',
    required: false
  })
  @IsString()
  @IsOptional()
  dispositivo?: string;

  @ApiProperty({
    description: 'ID do Parâmetro',
    example: 'PAR001',
    required: false
  })
  @IsString()
  @IsOptional()
  idParametro?: string;

  @ApiProperty({
    description: 'Linha Criativa (CM e Criativo)',
    example: 'Criativo Principal',
    required: false
  })
  @IsString()
  @IsOptional()
  linhaCriativa?: string;

  @ApiProperty({
    description: 'Conteúdo da Peça',
    example: 'Banner promocional Black Friday',
    required: false
  })
  @IsString()
  @IsOptional()
  conteudoPeca?: string;

  @ApiProperty({
    description: 'Data Prevista de Início (CM)',
    example: '2024-12-01T00:00:00.000Z',
    required: false
  })
  @IsDateString()
  @IsOptional()
  dataPrevistaInicioCm?: string;

  @ApiProperty({
    description: 'Data Prevista de Finalização (CM)',
    example: '2024-12-31T23:59:59.000Z',
    required: false
  })
  @IsDateString()
  @IsOptional()
  dataPrevistaFinalizacaoCm?: string;

  @ApiProperty({
    description: 'INSERTION ORDER DSP',
    example: 'IO_001_BRS_2024',
    required: false
  })
  @IsString()
  @IsOptional()
  insertionOrderDsp?: string;

  @ApiProperty({
    description: 'LINE ITEM DSP',
    example: 'LI_001_Banner_Desktop',
    required: false
  })
  @IsString()
  @IsOptional()
  lineItemDsp?: string;

  @ApiProperty({
    description: 'CONTAGEM CARACTERES',
    example: 50,
    required: false
  })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  contagemCaracteres?: number;

  @ApiProperty({
    description: 'LINE ITEM PLACEMENT CM',
    example: 'PLC_Homepage_Banner',
    required: false
  })
  @IsString()
  @IsOptional()
  lineItemPlacementCm?: string;

  @ApiProperty({
    description: 'CREATIVE DSP / CREATIVE CM',
    example: 'CRV_BlackFriday_Banner_300x250',
    required: false
  })
  @IsString()
  @IsOptional()
  creativeDspCm?: string;

  @ApiProperty({
    description: 'URL DE DESTINO',
    example: 'https://example.com/blackfriday',
    required: false
  })
  @IsString()
  @IsOptional()
  urlDestino?: string;

  @ApiProperty({
    description: 'NOME ANÚNCIO',
    example: 'Black Friday 2024 - Seguros',
    required: false
  })
  @IsString()
  @IsOptional()
  nomeAnuncio?: string;

  @ApiProperty({
    description: 'URL DE DESTINO - PARAMETRIZADA',
    example: 'https://example.com/blackfriday?utm_source=google&utm_medium=display&utm_campaign=blackfriday2024',
    required: false
  })
  @IsString()
  @IsOptional()
  urlDestinoParametrizada?: string;
}

export class UpdateTaxonomiaParametrizacaoDto {
  @ApiProperty({
    description: 'Plano de Mídia - Versão',
    example: 'V1.0',
    required: false
  })
  @IsString()
  @IsOptional()
  planoMidiaVersao?: string;

  @ApiProperty({
    description: 'Plano de Mídia - Linha',
    example: 'Linha 1',
    required: false
  })
  @IsString()
  @IsOptional()
  planoMidiaLinha?: string;

  @ApiProperty({
    description: 'Advertiser',
    example: 'Brasil Seguradora',
    required: false
  })
  @IsString()
  @IsOptional()
  advertiser?: string;

  @ApiProperty({
    description: 'Advertiser (Abreviado)',
    example: 'BRS',
    required: false
  })
  @IsString()
  @IsOptional()
  advertiserAbreviado?: string;

  @ApiProperty({
    description: 'Nome do Projeto/Campanha',
    example: 'Campanha Black Friday 2024',
    required: false
  })
  @IsString()
  @IsOptional()
  nomeProjetoCampanha?: string;

  @ApiProperty({
    description: 'Argumento',
    example: 'Proteção e economia',
    required: false
  })
  @IsString()
  @IsOptional()
  argumento?: string;

  @ApiProperty({
    description: 'Número Ação PAC (Axxxx/xxxxx)',
    example: 'A2024/00123',
    required: false
  })
  @IsString()
  @IsOptional()
  numeroAcaoPac?: string;

  @ApiProperty({
    description: 'Número Projeto (Pxxxx/xxxxx)',
    example: 'P2024/00456',
    required: false
  })
  @IsString()
  @IsOptional()
  numeroProjeto?: string;

  @ApiProperty({
    description: 'Nome da Campanha (CM)',
    example: 'CM_BlackFriday_2024',
    required: false
  })
  @IsString()
  @IsOptional()
  nomeCampanhaCm?: string;

  @ApiProperty({
    description: 'Veículo/Plataforma/Publisher (CM e DV)',
    example: 'Google Ads',
    required: false
  })
  @IsString()
  @IsOptional()
  veiculoPlataformaPublisher?: string;

  @ApiProperty({
    description: 'Inventory Type (DV)',
    example: 'Premium',
    required: false
  })
  @IsString()
  @IsOptional()
  inventoryType?: string;

  @ApiProperty({
    description: 'Goal',
    example: 'Conversions',
    required: false
  })
  @IsString()
  @IsOptional()
  goal?: string;

  @ApiProperty({
    description: 'Optimization IO (DV)',
    example: 'CPA',
    required: false
  })
  @IsString()
  @IsOptional()
  optimizationIo?: string;

  @ApiProperty({
    description: 'Targeting Macro (DV - IO)',
    example: 'Age 25-45',
    required: false
  })
  @IsString()
  @IsOptional()
  targetingMacroIo?: string;

  @ApiProperty({
    description: 'Detalhamento, Segmentação, Macro (DV - IO)',
    example: 'Interests: Insurance, Finance',
    required: false
  })
  @IsString()
  @IsOptional()
  detalhamentoSegmentacaoIo?: string;

  @ApiProperty({
    description: 'Targeting Macro (DV - Line Item)',
    example: 'Gender: All',
    required: false
  })
  @IsString()
  @IsOptional()
  targetingMacroLineItem?: string;

  @ApiProperty({
    description: 'Detalhamento, Segmentação Macro (DV - Line Item)',
    example: 'Location: Brazil',
    required: false
  })
  @IsString()
  @IsOptional()
  detalhamentoSegmentacaoLineItem?: string;

  @ApiProperty({
    description: 'Targeting Macro (CM)',
    example: 'Custom Audiences',
    required: false
  })
  @IsString()
  @IsOptional()
  targetingMacroCm?: string;

  @ApiProperty({
    description: 'Praça',
    example: 'Nacional',
    required: false
  })
  @IsString()
  @IsOptional()
  praca?: string;

  @ApiProperty({
    description: 'Canal',
    example: 'Digital',
    required: false
  })
  @IsString()
  @IsOptional()
  canal?: string;

  @ApiProperty({
    description: 'Agência',
    example: 'Agência ABC',
    required: false
  })
  @IsString()
  @IsOptional()
  agencia?: string;

  @ApiProperty({
    description: 'Mês de Referência',
    example: 'Dezembro 2024',
    required: false
  })
  @IsString()
  @IsOptional()
  mesReferencia?: string;

  @ApiProperty({
    description: 'Optimization (Line Item)',
    example: 'CTR',
    required: false
  })
  @IsString()
  @IsOptional()
  optimizationLineItem?: string;

  @ApiProperty({
    description: 'Tipo de Mídia / Line Item Type',
    example: 'Display',
    required: false
  })
  @IsString()
  @IsOptional()
  tipoMidiaLineItemType?: string;

  @ApiProperty({
    description: 'Tipo de Compra (CM)',
    example: 'Programatic',
    required: false
  })
  @IsString()
  @IsOptional()
  tipoCompraCm?: string;

  @ApiProperty({
    description: 'Tecnologia Adserver (CM)',
    example: 'Google Ad Manager',
    required: false
  })
  @IsString()
  @IsOptional()
  tecnologiaAdserverCm?: string;

  @ApiProperty({
    description: 'Formato de Criativo',
    example: 'Banner 300x250',
    required: false
  })
  @IsString()
  @IsOptional()
  formatoCriativo?: string;

  @ApiProperty({
    description: 'Dimensão',
    example: '300x250',
    required: false
  })
  @IsString()
  @IsOptional()
  dimensao?: string;

  @ApiProperty({
    description: 'Dispositivo',
    example: 'Desktop',
    required: false
  })
  @IsString()
  @IsOptional()
  dispositivo?: string;

  @ApiProperty({
    description: 'ID do Parâmetro',
    example: 'PAR001',
    required: false
  })
  @IsString()
  @IsOptional()
  idParametro?: string;

  @ApiProperty({
    description: 'Linha Criativa (CM e Criativo)',
    example: 'Criativo Principal',
    required: false
  })
  @IsString()
  @IsOptional()
  linhaCriativa?: string;

  @ApiProperty({
    description: 'Conteúdo da Peça',
    example: 'Banner promocional Black Friday',
    required: false
  })
  @IsString()
  @IsOptional()
  conteudoPeca?: string;

  @ApiProperty({
    description: 'Data Prevista de Início (CM)',
    example: '2024-12-01T00:00:00.000Z',
    required: false
  })
  @IsDateString()
  @IsOptional()
  dataPrevistaInicioCm?: string;

  @ApiProperty({
    description: 'Data Prevista de Finalização (CM)',
    example: '2024-12-31T23:59:59.000Z',
    required: false
  })
  @IsDateString()
  @IsOptional()
  dataPrevistaFinalizacaoCm?: string;

  @ApiProperty({
    description: 'INSERTION ORDER DSP',
    example: 'IO_001_BRS_2024',
    required: false
  })
  @IsString()
  @IsOptional()
  insertionOrderDsp?: string;

  @ApiProperty({
    description: 'LINE ITEM DSP',
    example: 'LI_001_Banner_Desktop',
    required: false
  })
  @IsString()
  @IsOptional()
  lineItemDsp?: string;

  @ApiProperty({
    description: 'CONTAGEM CARACTERES',
    example: 50,
    required: false
  })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  contagemCaracteres?: number;

  @ApiProperty({
    description: 'LINE ITEM PLACEMENT CM',
    example: 'PLC_Homepage_Banner',
    required: false
  })
  @IsString()
  @IsOptional()
  lineItemPlacementCm?: string;

  @ApiProperty({
    description: 'CREATIVE DSP / CREATIVE CM',
    example: 'CRV_BlackFriday_Banner_300x250',
    required: false
  })
  @IsString()
  @IsOptional()
  creativeDspCm?: string;

  @ApiProperty({
    description: 'URL DE DESTINO',
    example: 'https://example.com/blackfriday',
    required: false
  })
  @IsString()
  @IsOptional()
  urlDestino?: string;

  @ApiProperty({
    description: 'NOME ANÚNCIO',
    example: 'Black Friday 2024 - Seguros',
    required: false
  })
  @IsString()
  @IsOptional()
  nomeAnuncio?: string;

  @ApiProperty({
    description: 'URL DE DESTINO - PARAMETRIZADA',
    example: 'https://example.com/blackfriday?utm_source=google&utm_medium=display&utm_campaign=blackfriday2024',
    required: false
  })
  @IsString()
  @IsOptional()
  urlDestinoParametrizada?: string;
}