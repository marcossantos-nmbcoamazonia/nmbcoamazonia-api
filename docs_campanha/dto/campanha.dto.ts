import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsDateString, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCampanhaDto {
  @ApiProperty({
    description: 'Nome da campanha',
    example: 'Campanha Black Friday 2024'
  })
  @IsString()
  @IsNotEmpty()
  nomeCampanha: string;

  @ApiProperty({
    description: 'Tipo da campanha',
    example: 'Digital'
  })
  @IsString()
  @IsNotEmpty()
  tipoCampanha: string;

  @ApiProperty({
    description: 'Número da ação',
    example: 'A2024/001'
  })
  @IsString()
  @IsNotEmpty()
  numeroAcao: string;

  @ApiProperty({
    description: 'Número do projeto',
    example: 'P2024/001'
  })
  @IsString()
  @IsNotEmpty()
  numeroProjeto: string;

  @ApiProperty({
    description: 'Total de desembolso',
    example: 50000.00
  })
  @IsNumber()
  @Type(() => Number)
  totalDesembolso: number;

  @ApiProperty({
    description: 'Data prevista de início',
    example: '2024-12-01T00:00:00.000Z'
  })
  @IsDateString()
  dataPrevistaInicio: string;
}

export class UpdateCampanhaDto {
  @ApiProperty({
    description: 'Nome da campanha',
    example: 'Campanha Black Friday 2024',
    required: false
  })
  @IsString()
  @IsOptional()
  nomeCampanha?: string;

  @ApiProperty({
    description: 'Tipo da campanha',
    example: 'Digital',
    required: false
  })
  @IsString()
  @IsOptional()
  tipoCampanha?: string;

  @ApiProperty({
    description: 'Número da ação',
    example: 'A2024/001',
    required: false
  })
  @IsString()
  @IsOptional()
  numeroAcao?: string;

  @ApiProperty({
    description: 'Número do projeto',
    example: 'P2024/001',
    required: false
  })
  @IsString()
  @IsOptional()
  numeroProjeto?: string;

  @ApiProperty({
    description: 'Total de desembolso',
    example: 50000.00,
    required: false
  })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  totalDesembolso?: number;

  @ApiProperty({
    description: 'Data prevista de início',
    example: '2024-12-01T00:00:00.000Z',
    required: false
  })
  @IsDateString()
  @IsOptional()
  dataPrevistaInicio?: string;
}

export class CampanhaResponseDto {
  @ApiProperty({
    description: 'ID único da campanha',
    example: 1
  })
  id: number;

  @ApiProperty({
    description: 'Nome da campanha',
    example: 'Campanha Black Friday 2024'
  })
  nomeCampanha: string;

  @ApiProperty({
    description: 'Tipo da campanha',
    example: 'Digital'
  })
  tipoCampanha: string;

  @ApiProperty({
    description: 'Número da ação',
    example: 'A2024/001'
  })
  numeroAcao: string;

  @ApiProperty({
    description: 'Número do projeto',
    example: 'P2024/001'
  })
  numeroProjeto: string;

  @ApiProperty({
    description: 'Total de desembolso',
    example: 50000.00
  })
  totalDesembolso: number;

  @ApiProperty({
    description: 'Data prevista de início',
    example: '2024-12-01T00:00:00.000Z'
  })
  dataPrevistaInicio: string;

  @ApiProperty({
    description: 'Data de criação do registro'
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Data de atualização do registro'
  })
  updatedAt: Date;
}