import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsDateString, IsOptional } from 'class-validator';

export class RMDigital {
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
    description: 'Data de entrega',
    example: '2024-12-01T00:00:00.000Z'
  })
  @IsDateString()
  @IsOptional()
  dataEntrega?: string;

  @ApiProperty({
    description: 'Exposição/Praça',
    example: 'São Paulo'
  })
  @IsString()
  @IsOptional()
  exposicaoPraca?: string;

  @ApiProperty({
    description: 'Veículo',
    example: 'Instagram'
  })
  @IsString()
  @IsOptional()
  veiculo?: string;

  @ApiProperty({
    description: 'Tipo de mídia',
    example: 'Social Media'
  })
  @IsString()
  @IsOptional()
  tipoMidia?: string;

  @ApiProperty({
    description: 'Tipo de arquivo',
    example: 'Video'
  })
  @IsString()
  @IsOptional()
  tipoArquivo?: string;

  @ApiProperty({
    description: 'Formato',
    example: 'MP4'
  })
  @IsString()
  @IsOptional()
  formato?: string;

  @ApiProperty({
    description: 'Dimensão',
    example: '1920x1080'
  })
  @IsString()
  @IsOptional()
  dimensao?: string;

  @ApiProperty({
    description: 'Secundagem',
    example: '30s'
  })
  @IsString()
  @IsOptional()
  secundagem?: string;

  @ApiProperty({
    description: 'Peso do arquivo',
    example: '5MB'
  })
  @IsString()
  @IsOptional()
  peso?: string;

  @ApiProperty({
    description: 'Especificações técnicas',
    example: 'Full HD, 24fps'
  })
  @IsString()
  @IsOptional()
  especificacoes?: string;

  @ApiProperty({
    description: 'Link do midiakit',
    example: 'https://example.com/midiakit.pdf'
  })
  @IsString()
  @IsOptional()
  midiakit?: string;

  @ApiProperty({
    description: 'Observações gerais',
    example: 'Aprovado pela equipe criativa'
  })
  @IsString()
  @IsOptional()
  observacoes?: string;

  @ApiProperty({
    description: 'Data de criação do registro'
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Data de atualização do registro'
  })
  updatedAt: Date;

  constructor(partial: Partial<RMDigital>) {
    Object.assign(this, partial);
  }
}