import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsDateString, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateMidiaAnunciosSocialDto {
  @ApiProperty({
    description: 'ID da campanha associada',
    example: 1
  })
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  campanhaId: number;

  @ApiProperty({
    description: 'Responsável',
    example: 'João Silva',
    required: false
  })
  @IsString()
  @IsOptional()
  responsavel?: string;

  @ApiProperty({
    description: 'Status',
    example: 'Ativo',
    required: false
  })
  @IsString()
  @IsOptional()
  status?: string;

  @ApiProperty({
    description: 'Data de início',
    example: '2024-12-01T00:00:00.000Z',
    required: false
  })
  @IsDateString()
  @IsOptional()
  dataInicio?: string;

  @ApiProperty({
    description: 'Data de término',
    example: '2024-12-31T23:59:59.000Z',
    required: false
  })
  @IsDateString()
  @IsOptional()
  dataTermino?: string;

  @ApiProperty({
    description: 'Agência',
    example: 'Agência Digital XYZ',
    required: false
  })
  @IsString()
  @IsOptional()
  agencia?: string;

  @ApiProperty({
    description: 'Projeto',
    example: 'Projeto Natal 2024',
    required: false
  })
  @IsString()
  @IsOptional()
  projeto?: string;

  @ApiProperty({
    description: 'ID da peça',
    example: 'PC001',
    required: false
  })
  @IsString()
  @IsOptional()
  idPeca?: string;

  @ApiProperty({
    description: 'Produto',
    example: 'Seguro Vida',
    required: false
  })
  @IsString()
  @IsOptional()
  produto?: string;

  @ApiProperty({
    description: 'Sub-produto',
    example: 'Seguro Vida Individual',
    required: false
  })
  @IsString()
  @IsOptional()
  subProduto?: string;

  @ApiProperty({
    description: 'Veículo',
    example: 'Instagram',
    required: false
  })
  @IsString()
  @IsOptional()
  veiculo?: string;

  @ApiProperty({
    description: 'Tipo de campanha',
    example: 'Awareness',
    required: false
  })
  @IsString()
  @IsOptional()
  tipoCampanha?: string;

  @ApiProperty({
    description: 'Formato',
    example: 'Stories',
    required: false
  })
  @IsString()
  @IsOptional()
  formato?: string;

  @ApiProperty({
    description: 'Estratégia',
    example: 'Engajamento',
    required: false
  })
  @IsString()
  @IsOptional()
  estrategia?: string;

  @ApiProperty({
    description: 'Praça',
    example: 'São Paulo',
    required: false
  })
  @IsString()
  @IsOptional()
  praca?: string;

  @ApiProperty({
    description: 'Dimensão',
    example: '1080x1920',
    required: false
  })
  @IsString()
  @IsOptional()
  dimensao?: string;

  @ApiProperty({
    description: 'Secundagem',
    example: '15s',
    required: false
  })
  @IsString()
  @IsOptional()
  secundagem?: string;

  @ApiProperty({
    description: 'Linha criativa',
    example: 'Criativo Emocional',
    required: false
  })
  @IsString()
  @IsOptional()
  linhaCriativa?: string;

  @ApiProperty({
    description: 'Objetivo',
    example: 'Gerar leads qualificados',
    required: false
  })
  @IsString()
  @IsOptional()
  objetivo?: string;

  @ApiProperty({
    description: 'Tipo de compra',
    example: 'Leilão',
    required: false
  })
  @IsString()
  @IsOptional()
  tipoCompra?: string;

  @ApiProperty({
    description: 'Informações adicionais (Teste, Fase, etc)',
    example: 'Teste A/B - Fase 1',
    required: false
  })
  @IsString()
  @IsOptional()
  informacoesAdicionais?: string;

  @ApiProperty({
    description: 'Tipo de audiência',
    example: 'Lookalike',
    required: false
  })
  @IsString()
  @IsOptional()
  tipoAudiencia?: string;

  @ApiProperty({
    description: 'Segmentação',
    example: 'Idade 30-50, Interesse em seguros',
    required: false
  })
  @IsString()
  @IsOptional()
  segmentacao?: string;

  @ApiProperty({
    description: 'Plano de mídia',
    example: 'Plano Q4 2024',
    required: false
  })
  @IsString()
  @IsOptional()
  planoMidia?: string;

  @ApiProperty({
    description: 'Argumento',
    example: 'Proteção para toda família',
    required: false
  })
  @IsString()
  @IsOptional()
  argumento?: string;

  @ApiProperty({
    description: 'Título',
    example: 'Proteja quem você ama',
    required: false
  })
  @IsString()
  @IsOptional()
  titulo?: string;

  @ApiProperty({
    description: 'Descrição',
    example: 'Seguro vida com as melhores condições do mercado',
    required: false
  })
  @IsString()
  @IsOptional()
  descricao?: string;

  @ApiProperty({
    description: 'Texto de apoio',
    example: 'Contrate online em poucos minutos',
    required: false
  })
  @IsString()
  @IsOptional()
  textoApoio?: string;

  @ApiProperty({
    description: 'CTA (Call to Action)',
    example: 'Simular agora',
    required: false
  })
  @IsString()
  @IsOptional()
  cta?: string;

  @ApiProperty({
    description: 'Nome da campanha',
    example: 'Campanha Seguro Vida - Dezembro 2024',
    required: false
  })
  @IsString()
  @IsOptional()
  nomeCampanha?: string;

  @ApiProperty({
    description: 'Grupo de anúncio',
    example: 'Grupo Lookalike - SP',
    required: false
  })
  @IsString()
  @IsOptional()
  grupoAnuncio?: string;

  @ApiProperty({
    description: 'Anúncio',
    example: 'Anúncio Stories - Família Feliz',
    required: false
  })
  @IsString()
  @IsOptional()
  anuncio?: string;

  @ApiProperty({
    description: 'URL de destino',
    example: 'https://example.com/seguro-vida',
    required: false
  })
  @IsString()
  @IsOptional()
  urlDestino?: string;

  @ApiProperty({
    description: 'URL tagueada',
    example: 'https://example.com/seguro-vida?utm_source=instagram&utm_medium=stories&utm_campaign=vida_dezembro',
    required: false
  })
  @IsString()
  @IsOptional()
  urlTagueada?: string;
}

export class UpdateMidiaAnunciosSocialDto {
  @ApiProperty({
    description: 'Responsável',
    example: 'João Silva',
    required: false
  })
  @IsString()
  @IsOptional()
  responsavel?: string;

  @ApiProperty({
    description: 'Status',
    example: 'Ativo',
    required: false
  })
  @IsString()
  @IsOptional()
  status?: string;

  @ApiProperty({
    description: 'Data de início',
    example: '2024-12-01T00:00:00.000Z',
    required: false
  })
  @IsDateString()
  @IsOptional()
  dataInicio?: string;

  @ApiProperty({
    description: 'Data de término',
    example: '2024-12-31T23:59:59.000Z',
    required: false
  })
  @IsDateString()
  @IsOptional()
  dataTermino?: string;

  @ApiProperty({
    description: 'Agência',
    example: 'Agência Digital XYZ',
    required: false
  })
  @IsString()
  @IsOptional()
  agencia?: string;

  @ApiProperty({
    description: 'Projeto',
    example: 'Projeto Natal 2024',
    required: false
  })
  @IsString()
  @IsOptional()
  projeto?: string;

  @ApiProperty({
    description: 'ID da peça',
    example: 'PC001',
    required: false
  })
  @IsString()
  @IsOptional()
  idPeca?: string;

  @ApiProperty({
    description: 'Produto',
    example: 'Seguro Vida',
    required: false
  })
  @IsString()
  @IsOptional()
  produto?: string;

  @ApiProperty({
    description: 'Sub-produto',
    example: 'Seguro Vida Individual',
    required: false
  })
  @IsString()
  @IsOptional()
  subProduto?: string;

  @ApiProperty({
    description: 'Veículo',
    example: 'Instagram',
    required: false
  })
  @IsString()
  @IsOptional()
  veiculo?: string;

  @ApiProperty({
    description: 'Tipo de campanha',
    example: 'Awareness',
    required: false
  })
  @IsString()
  @IsOptional()
  tipoCampanha?: string;

  @ApiProperty({
    description: 'Formato',
    example: 'Stories',
    required: false
  })
  @IsString()
  @IsOptional()
  formato?: string;

  @ApiProperty({
    description: 'Estratégia',
    example: 'Engajamento',
    required: false
  })
  @IsString()
  @IsOptional()
  estrategia?: string;

  @ApiProperty({
    description: 'Praça',
    example: 'São Paulo',
    required: false
  })
  @IsString()
  @IsOptional()
  praca?: string;

  @ApiProperty({
    description: 'Dimensão',
    example: '1080x1920',
    required: false
  })
  @IsString()
  @IsOptional()
  dimensao?: string;

  @ApiProperty({
    description: 'Secundagem',
    example: '15s',
    required: false
  })
  @IsString()
  @IsOptional()
  secundagem?: string;

  @ApiProperty({
    description: 'Linha criativa',
    example: 'Criativo Emocional',
    required: false
  })
  @IsString()
  @IsOptional()
  linhaCriativa?: string;

  @ApiProperty({
    description: 'Objetivo',
    example: 'Gerar leads qualificados',
    required: false
  })
  @IsString()
  @IsOptional()
  objetivo?: string;

  @ApiProperty({
    description: 'Tipo de compra',
    example: 'Leilão',
    required: false
  })
  @IsString()
  @IsOptional()
  tipoCompra?: string;

  @ApiProperty({
    description: 'Informações adicionais (Teste, Fase, etc)',
    example: 'Teste A/B - Fase 1',
    required: false
  })
  @IsString()
  @IsOptional()
  informacoesAdicionais?: string;

  @ApiProperty({
    description: 'Tipo de audiência',
    example: 'Lookalike',
    required: false
  })
  @IsString()
  @IsOptional()
  tipoAudiencia?: string;

  @ApiProperty({
    description: 'Segmentação',
    example: 'Idade 30-50, Interesse em seguros',
    required: false
  })
  @IsString()
  @IsOptional()
  segmentacao?: string;

  @ApiProperty({
    description: 'Plano de mídia',
    example: 'Plano Q4 2024',
    required: false
  })
  @IsString()
  @IsOptional()
  planoMidia?: string;

  @ApiProperty({
    description: 'Argumento',
    example: 'Proteção para toda família',
    required: false
  })
  @IsString()
  @IsOptional()
  argumento?: string;

  @ApiProperty({
    description: 'Título',
    example: 'Proteja quem você ama',
    required: false
  })
  @IsString()
  @IsOptional()
  titulo?: string;

  @ApiProperty({
    description: 'Descrição',
    example: 'Seguro vida com as melhores condições do mercado',
    required: false
  })
  @IsString()
  @IsOptional()
  descricao?: string;

  @ApiProperty({
    description: 'Texto de apoio',
    example: 'Contrate online em poucos minutos',
    required: false
  })
  @IsString()
  @IsOptional()
  textoApoio?: string;

  @ApiProperty({
    description: 'CTA (Call to Action)',
    example: 'Simular agora',
    required: false
  })
  @IsString()
  @IsOptional()
  cta?: string;

  @ApiProperty({
    description: 'Nome da campanha',
    example: 'Campanha Seguro Vida - Dezembro 2024',
    required: false
  })
  @IsString()
  @IsOptional()
  nomeCampanha?: string;

  @ApiProperty({
    description: 'Grupo de anúncio',
    example: 'Grupo Lookalike - SP',
    required: false
  })
  @IsString()
  @IsOptional()
  grupoAnuncio?: string;

  @ApiProperty({
    description: 'Anúncio',
    example: 'Anúncio Stories - Família Feliz',
    required: false
  })
  @IsString()
  @IsOptional()
  anuncio?: string;

  @ApiProperty({
    description: 'URL de destino',
    example: 'https://example.com/seguro-vida',
    required: false
  })
  @IsString()
  @IsOptional()
  urlDestino?: string;

  @ApiProperty({
    description: 'URL tagueada',
    example: 'https://example.com/seguro-vida?utm_source=instagram&utm_medium=stories&utm_campaign=vida_dezembro',
    required: false
  })
  @IsString()
  @IsOptional()
  urlTagueada?: string;
}