import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsDateString, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateRMDigitalDto {
  @ApiProperty({
    description: 'ID da campanha associada',
    example: 1
  })
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  campanhaId: number;

  @ApiProperty({
    description: 'Data de entrega',
    example: '2024-12-01T00:00:00.000Z',
    required: false
  })
  @IsDateString()
  @IsOptional()
  dataEntrega?: string;

  @ApiProperty({
    description: 'Exposição/Praça',
    example: 'São Paulo',
    required: false
  })
  @IsString()
  @IsOptional()
  exposicaoPraca?: string;

  @ApiProperty({
    description: 'Veículo',
    example: 'Instagram',
    required: false
  })
  @IsString()
  @IsOptional()
  veiculo?: string;

  @ApiProperty({
    description: 'Tipo de mídia',
    example: 'Social Media',
    required: false
  })
  @IsString()
  @IsOptional()
  tipoMidia?: string;

  @ApiProperty({
    description: 'Tipo de arquivo',
    example: 'Video',
    required: false
  })
  @IsString()
  @IsOptional()
  tipoArquivo?: string;

  @ApiProperty({
    description: 'Formato',
    example: 'MP4',
    required: false
  })
  @IsString()
  @IsOptional()
  formato?: string;

  @ApiProperty({
    description: 'Dimensão',
    example: '1920x1080',
    required: false
  })
  @IsString()
  @IsOptional()
  dimensao?: string;

  @ApiProperty({
    description: 'Secundagem',
    example: '30s',
    required: false
  })
  @IsString()
  @IsOptional()
  secundagem?: string;

  @ApiProperty({
    description: 'Peso do arquivo',
    example: '5MB',
    required: false
  })
  @IsString()
  @IsOptional()
  peso?: string;

  @ApiProperty({
    description: 'Especificações técnicas',
    example: 'Full HD, 24fps',
    required: false
  })
  @IsString()
  @IsOptional()
  especificacoes?: string;

  @ApiProperty({
    description: 'Link do midiakit',
    example: 'https://example.com/midiakit.pdf',
    required: false
  })
  @IsString()
  @IsOptional()
  midiakit?: string;

  @ApiProperty({
    description: 'Observações gerais',
    example: 'Aprovado pela equipe criativa',
    required: false
  })
  @IsString()
  @IsOptional()
  observacoes?: string;
}

export class UpdateRMDigitalDto {
  @ApiProperty({
    description: 'Data de entrega',
    example: '2024-12-01T00:00:00.000Z',
    required: false
  })
  @IsDateString()
  @IsOptional()
  dataEntrega?: string;

  @ApiProperty({
    description: 'Exposição/Praça',
    example: 'São Paulo',
    required: false
  })
  @IsString()
  @IsOptional()
  exposicaoPraca?: string;

  @ApiProperty({
    description: 'Veículo',
    example: 'Instagram',
    required: false
  })
  @IsString()
  @IsOptional()
  veiculo?: string;

  @ApiProperty({
    description: 'Tipo de mídia',
    example: 'Social Media',
    required: false
  })
  @IsString()
  @IsOptional()
  tipoMidia?: string;

  @ApiProperty({
    description: 'Tipo de arquivo',
    example: 'Video',
    required: false
  })
  @IsString()
  @IsOptional()
  tipoArquivo?: string;

  @ApiProperty({
    description: 'Formato',
    example: 'MP4',
    required: false
  })
  @IsString()
  @IsOptional()
  formato?: string;

  @ApiProperty({
    description: 'Dimensão',
    example: '1920x1080',
    required: false
  })
  @IsString()
  @IsOptional()
  dimensao?: string;

  @ApiProperty({
    description: 'Secundagem',
    example: '30s',
    required: false
  })
  @IsString()
  @IsOptional()
  secundagem?: string;

  @ApiProperty({
    description: 'Peso do arquivo',
    example: '5MB',
    required: false
  })
  @IsString()
  @IsOptional()
  peso?: string;

  @ApiProperty({
    description: 'Especificações técnicas',
    example: 'Full HD, 24fps',
    required: false
  })
  @IsString()
  @IsOptional()
  especificacoes?: string;

  @ApiProperty({
    description: 'Link do midiakit',
    example: 'https://example.com/midiakit.pdf',
    required: false
  })
  @IsString()
  @IsOptional()
  midiakit?: string;

  @ApiProperty({
    description: 'Observações gerais',
    example: 'Aprovado pela equipe criativa',
    required: false
  })
  @IsString()
  @IsOptional()
  observacoes?: string;
}