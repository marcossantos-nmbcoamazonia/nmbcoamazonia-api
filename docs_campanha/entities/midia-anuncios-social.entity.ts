import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsDateString, IsOptional } from 'class-validator';

export class MidiaAnunciosSocial {
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
    description: 'Responsável',
    example: 'João Silva'
  })
  @IsString()
  @IsOptional()
  responsavel?: string;

  @ApiProperty({
    description: 'Status',
    example: 'Ativo'
  })
  @IsString()
  @IsOptional()
  status?: string;

  @ApiProperty({
    description: 'Data de início',
    example: '2024-12-01T00:00:00.000Z'
  })
  @IsDateString()
  @IsOptional()
  dataInicio?: string;

  @ApiProperty({
    description: 'Data de término',
    example: '2024-12-31T23:59:59.000Z'
  })
  @IsDateString()
  @IsOptional()
  dataTermino?: string;

  @ApiProperty({
    description: 'Agência',
    example: 'Agência Digital XYZ'
  })
  @IsString()
  @IsOptional()
  agencia?: string;

  @ApiProperty({
    description: 'Projeto',
    example: 'Projeto Natal 2024'
  })
  @IsString()
  @IsOptional()
  projeto?: string;

  @ApiProperty({
    description: 'ID da peça',
    example: 'PC001'
  })
  @IsString()
  @IsOptional()
  idPeca?: string;

  @ApiProperty({
    description: 'Produto',
    example: 'Seguro Vida'
  })
  @IsString()
  @IsOptional()
  produto?: string;

  @ApiProperty({
    description: 'Sub-produto',
    example: 'Seguro Vida Individual'
  })
  @IsString()
  @IsOptional()
  subProduto?: string;

  @ApiProperty({
    description: 'Veículo',
    example: 'Instagram'
  })
  @IsString()
  @IsOptional()
  veiculo?: string;

  @ApiProperty({
    description: 'Tipo de campanha',
    example: 'Awareness'
  })
  @IsString()
  @IsOptional()
  tipoCampanha?: string;

  @ApiProperty({
    description: 'Formato',
    example: 'Stories'
  })
  @IsString()
  @IsOptional()
  formato?: string;

  @ApiProperty({
    description: 'Estratégia',
    example: 'Engajamento'
  })
  @IsString()
  @IsOptional()
  estrategia?: string;

  @ApiProperty({
    description: 'Praça',
    example: 'São Paulo'
  })
  @IsString()
  @IsOptional()
  praca?: string;

  @ApiProperty({
    description: 'Dimensão',
    example: '1080x1920'
  })
  @IsString()
  @IsOptional()
  dimensao?: string;

  @ApiProperty({
    description: 'Secundagem',
    example: '15s'
  })
  @IsString()
  @IsOptional()
  secundagem?: string;

  @ApiProperty({
    description: 'Linha criativa',
    example: 'Criativo Emocional'
  })
  @IsString()
  @IsOptional()
  linhaCriativa?: string;

  @ApiProperty({
    description: 'Objetivo',
    example: 'Gerar leads qualificados'
  })
  @IsString()
  @IsOptional()
  objetivo?: string;

  @ApiProperty({
    description: 'Tipo de compra',
    example: 'Leilão'
  })
  @IsString()
  @IsOptional()
  tipoCompra?: string;

  @ApiProperty({
    description: 'Informações adicionais (Teste, Fase, etc)',
    example: 'Teste A/B - Fase 1'
  })
  @IsString()
  @IsOptional()
  informacoesAdicionais?: string;

  @ApiProperty({
    description: 'Tipo de audiência',
    example: 'Lookalike'
  })
  @IsString()
  @IsOptional()
  tipoAudiencia?: string;

  @ApiProperty({
    description: 'Segmentação',
    example: 'Idade 30-50, Interesse em seguros'
  })
  @IsString()
  @IsOptional()
  segmentacao?: string;

  @ApiProperty({
    description: 'Plano de mídia',
    example: 'Plano Q4 2024'
  })
  @IsString()
  @IsOptional()
  planoMidia?: string;

  @ApiProperty({
    description: 'Argumento',
    example: 'Proteção para toda família'
  })
  @IsString()
  @IsOptional()
  argumento?: string;

  @ApiProperty({
    description: 'Título',
    example: 'Proteja quem você ama'
  })
  @IsString()
  @IsOptional()
  titulo?: string;

  @ApiProperty({
    description: 'Descrição',
    example: 'Seguro vida com as melhores condições do mercado'
  })
  @IsString()
  @IsOptional()
  descricao?: string;

  @ApiProperty({
    description: 'Texto de apoio',
    example: 'Contrate online em poucos minutos'
  })
  @IsString()
  @IsOptional()
  textoApoio?: string;

  @ApiProperty({
    description: 'CTA (Call to Action)',
    example: 'Simular agora'
  })
  @IsString()
  @IsOptional()
  cta?: string;

  @ApiProperty({
    description: 'Nome da campanha',
    example: 'Campanha Seguro Vida - Dezembro 2024'
  })
  @IsString()
  @IsOptional()
  nomeCampanha?: string;

  @ApiProperty({
    description: 'Grupo de anúncio',
    example: 'Grupo Lookalike - SP'
  })
  @IsString()
  @IsOptional()
  grupoAnuncio?: string;

  @ApiProperty({
    description: 'Anúncio',
    example: 'Anúncio Stories - Família Feliz'
  })
  @IsString()
  @IsOptional()
  anuncio?: string;

  @ApiProperty({
    description: 'URL de destino',
    example: 'https://example.com/seguro-vida'
  })
  @IsString()
  @IsOptional()
  urlDestino?: string;

  @ApiProperty({
    description: 'URL tagueada',
    example: 'https://example.com/seguro-vida?utm_source=instagram&utm_medium=stories&utm_campaign=vida_dezembro'
  })
  @IsString()
  @IsOptional()
  urlTagueada?: string;

  @ApiProperty({
    description: 'Data de criação do registro'
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Data de atualização do registro'
  })
  updatedAt: Date;

  constructor(partial: Partial<MidiaAnunciosSocial>) {
    Object.assign(this, partial);
  }
}