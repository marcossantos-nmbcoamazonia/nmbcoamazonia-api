import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsDateString, IsOptional } from 'class-validator';

export class ConteudosAnuncios {
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
    description: 'ID da peça',
    example: 'P001'
  })
  @IsString()
  @IsOptional()
  idPeca?: string;

  @ApiProperty({
    description: 'Data da entrega do material',
    example: '2024-12-01T00:00:00.000Z'
  })
  @IsDateString()
  @IsOptional()
  dataEntregaMaterial?: string;

  @ApiProperty({
    description: 'Data prevista de entrada',
    example: '2024-12-05T00:00:00.000Z'
  })
  @IsDateString()
  @IsOptional()
  dataPrevistaEntrada?: string;

  @ApiProperty({
    description: 'Produto',
    example: 'Seguro Auto'
  })
  @IsString()
  @IsOptional()
  produto?: string;

  @ApiProperty({
    description: 'Subproduto',
    example: 'Seguro Auto Premium'
  })
  @IsString()
  @IsOptional()
  subproduto?: string;

  @ApiProperty({
    description: 'Estratégia',
    example: 'Conversão'
  })
  @IsString()
  @IsOptional()
  estrategia?: string;

  @ApiProperty({
    description: 'Praça',
    example: 'Rio de Janeiro'
  })
  @IsString()
  @IsOptional()
  praca?: string;

  @ApiProperty({
    description: 'Veículo',
    example: 'Facebook'
  })
  @IsString()
  @IsOptional()
  veiculo?: string;

  @ApiProperty({
    description: 'Tipo de mídia',
    example: 'Display'
  })
  @IsString()
  @IsOptional()
  tipoMidia?: string;

  @ApiProperty({
    description: 'Formato',
    example: 'Banner'
  })
  @IsString()
  @IsOptional()
  formato?: string;

  @ApiProperty({
    description: 'Dimensão',
    example: '300x250'
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
    description: 'Linha criativa (Layout)',
    example: 'Layout Moderno'
  })
  @IsString()
  @IsOptional()
  linhaCriativa?: string;

  @ApiProperty({
    description: 'Título',
    example: 'Proteja seu carro com o melhor seguro'
  })
  @IsString()
  @IsOptional()
  titulo?: string;

  @ApiProperty({
    description: 'Descrição',
    example: 'Cobertura completa para seu veículo'
  })
  @IsString()
  @IsOptional()
  descricao?: string;

  @ApiProperty({
    description: 'Texto de apoio',
    example: 'Condições especiais para novos clientes'
  })
  @IsString()
  @IsOptional()
  textoApoio?: string;

  @ApiProperty({
    description: 'CTA (Call to Action)',
    example: 'Faça sua cotação'
  })
  @IsString()
  @IsOptional()
  cta?: string;

  @ApiProperty({
    description: 'Caminho',
    example: '/seguros/auto'
  })
  @IsString()
  @IsOptional()
  caminho?: string;

  @ApiProperty({
    description: 'Peça',
    example: 'Banner principal'
  })
  @IsString()
  @IsOptional()
  peca?: string;

  @ApiProperty({
    description: 'Link de comprovação da peça / QR Code',
    example: 'https://example.com/comprovacao/001'
  })
  @IsString()
  @IsOptional()
  linkComprovacao?: string;

  @ApiProperty({
    description: 'Data de criação do registro'
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Data de atualização do registro'
  })
  updatedAt: Date;

  constructor(partial: Partial<ConteudosAnuncios>) {
    Object.assign(this, partial);
  }
}