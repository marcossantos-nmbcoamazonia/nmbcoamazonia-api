import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsDateString, IsOptional } from 'class-validator';

export class Campanha {
  @ApiProperty({
    description: 'ID único da campanha',
    example: '1'
  })
  id: number;

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
  totalDesembolso: number;

  @ApiProperty({
    description: 'Data prevista de início',
    example: '2024-12-01T00:00:00.000Z'
  })
  @IsDateString()
  dataPrevistaInicio: string;

  @ApiProperty({
    description: 'Data de criação do registro'
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Data de atualização do registro'
  })
  updatedAt: Date;

  constructor(partial: Partial<Campanha>) {
    Object.assign(this, partial);
  }
}