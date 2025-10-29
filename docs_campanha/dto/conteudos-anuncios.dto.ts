import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsDateString, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateConteudosAnunciosDto {
  @ApiProperty({
    description: 'ID da campanha associada',
    example: 1
  })
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  campanhaId: number;

  @ApiProperty({
    description: 'ID da peça',
    example: 'P001',
    required: false
  })
  @IsString()
  @IsOptional()
  idPeca?: string;

  @ApiProperty({
    description: 'Data da entrega do material',
    example: '2024-12-01T00:00:00.000Z',
    required: false
  })
  @IsDateString()
  @IsOptional()
  dataEntregaMaterial?: string;

  @ApiProperty({
    description: 'Data prevista de entrada',
    example: '2024-12-05T00:00:00.000Z',
    required: false
  })
  @IsDateString()
  @IsOptional()
  dataPrevistaEntrada?: string;

  @ApiProperty({
    description: 'Produto',
    example: 'Seguro Auto',
    required: false
  })
  @IsString()
  @IsOptional()
  produto?: string;

  @ApiProperty({
    description: 'Subproduto',
    example: 'Seguro Auto Premium',
    required: false
  })
  @IsString()
  @IsOptional()
  subproduto?: string;

  @ApiProperty({
    description: 'Estratégia',
    example: 'Conversão',
    required: false
  })
  @IsString()
  @IsOptional()
  estrategia?: string;

  @ApiProperty({
    description: 'Praça',
    example: 'Rio de Janeiro',
    required: false
  })
  @IsString()
  @IsOptional()
  praca?: string;

  @ApiProperty({
    description: 'Veículo',
    example: 'Facebook',
    required: false
  })
  @IsString()
  @IsOptional()
  veiculo?: string;

  @ApiProperty({
    description: 'Tipo de mídia',
    example: 'Display',
    required: false
  })
  @IsString()
  @IsOptional()
  tipoMidia?: string;

  @ApiProperty({
    description: 'Formato',
    example: 'Banner',
    required: false
  })
  @IsString()
  @IsOptional()
  formato?: string;

  @ApiProperty({
    description: 'Dimensão',
    example: '300x250',
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
    description: 'Linha criativa (Layout)',
    example: 'Layout Moderno',
    required: false
  })
  @IsString()
  @IsOptional()
  linhaCriativa?: string;

  @ApiProperty({
    description: 'Título',
    example: 'Proteja seu carro com o melhor seguro',
    required: false
  })
  @IsString()
  @IsOptional()
  titulo?: string;

  @ApiProperty({
    description: 'Descrição',
    example: 'Cobertura completa para seu veículo',
    required: false
  })
  @IsString()
  @IsOptional()
  descricao?: string;

  @ApiProperty({
    description: 'Texto de apoio',
    example: 'Condições especiais para novos clientes',
    required: false
  })
  @IsString()
  @IsOptional()
  textoApoio?: string;

  @ApiProperty({
    description: 'CTA (Call to Action)',
    example: 'Faça sua cotação',
    required: false
  })
  @IsString()
  @IsOptional()
  cta?: string;

  @ApiProperty({
    description: 'Caminho',
    example: '/seguros/auto',
    required: false
  })
  @IsString()
  @IsOptional()
  caminho?: string;

  @ApiProperty({
    description: 'Peça',
    example: 'Banner principal',
    required: false
  })
  @IsString()
  @IsOptional()
  peca?: string;

  @ApiProperty({
    description: 'Link de comprovação da peça / QR Code',
    example: 'https://example.com/comprovacao/001',
    required: false
  })
  @IsString()
  @IsOptional()
  linkComprovacao?: string;
}

export class UpdateConteudosAnunciosDto {
  @ApiProperty({
    description: 'ID da peça',
    example: 'P001',
    required: false
  })
  @IsString()
  @IsOptional()
  idPeca?: string;

  @ApiProperty({
    description: 'Data da entrega do material',
    example: '2024-12-01T00:00:00.000Z',
    required: false
  })
  @IsDateString()
  @IsOptional()
  dataEntregaMaterial?: string;

  @ApiProperty({
    description: 'Data prevista de entrada',
    example: '2024-12-05T00:00:00.000Z',
    required: false
  })
  @IsDateString()
  @IsOptional()
  dataPrevistaEntrada?: string;

  @ApiProperty({
    description: 'Produto',
    example: 'Seguro Auto',
    required: false
  })
  @IsString()
  @IsOptional()
  produto?: string;

  @ApiProperty({
    description: 'Subproduto',
    example: 'Seguro Auto Premium',
    required: false
  })
  @IsString()
  @IsOptional()
  subproduto?: string;

  @ApiProperty({
    description: 'Estratégia',
    example: 'Conversão',
    required: false
  })
  @IsString()
  @IsOptional()
  estrategia?: string;

  @ApiProperty({
    description: 'Praça',
    example: 'Rio de Janeiro',
    required: false
  })
  @IsString()
  @IsOptional()
  praca?: string;

  @ApiProperty({
    description: 'Veículo',
    example: 'Facebook',
    required: false
  })
  @IsString()
  @IsOptional()
  veiculo?: string;

  @ApiProperty({
    description: 'Tipo de mídia',
    example: 'Display',
    required: false
  })
  @IsString()
  @IsOptional()
  tipoMidia?: string;

  @ApiProperty({
    description: 'Formato',
    example: 'Banner',
    required: false
  })
  @IsString()
  @IsOptional()
  formato?: string;

  @ApiProperty({
    description: 'Dimensão',
    example: '300x250',
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
    description: 'Linha criativa (Layout)',
    example: 'Layout Moderno',
    required: false
  })
  @IsString()
  @IsOptional()
  linhaCriativa?: string;

  @ApiProperty({
    description: 'Título',
    example: 'Proteja seu carro com o melhor seguro',
    required: false
  })
  @IsString()
  @IsOptional()
  titulo?: string;

  @ApiProperty({
    description: 'Descrição',
    example: 'Cobertura completa para seu veículo',
    required: false
  })
  @IsString()
  @IsOptional()
  descricao?: string;

  @ApiProperty({
    description: 'Texto de apoio',
    example: 'Condições especiais para novos clientes',
    required: false
  })
  @IsString()
  @IsOptional()
  textoApoio?: string;

  @ApiProperty({
    description: 'CTA (Call to Action)',
    example: 'Faça sua cotação',
    required: false
  })
  @IsString()
  @IsOptional()
  cta?: string;

  @ApiProperty({
    description: 'Caminho',
    example: '/seguros/auto',
    required: false
  })
  @IsString()
  @IsOptional()
  caminho?: string;

  @ApiProperty({
    description: 'Peça',
    example: 'Banner principal',
    required: false
  })
  @IsString()
  @IsOptional()
  peca?: string;

  @ApiProperty({
    description: 'Link de comprovação da peça / QR Code',
    example: 'https://example.com/comprovacao/001',
    required: false
  })
  @IsString()
  @IsOptional()
  linkComprovacao?: string;
}