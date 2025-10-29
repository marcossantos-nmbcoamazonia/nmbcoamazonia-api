import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsDateString, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateMatrizConteudoDto {
  @ApiProperty({
    description: 'ID da campanha associada',
    example: 1
  })
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  campanhaId: number;

  @ApiProperty({
    description: 'Produto',
    example: 'Seguro Residencial',
    required: false
  })
  @IsString()
  @IsOptional()
  produto?: string;

  @ApiProperty({
    description: 'Sub Produto',
    example: 'Seguro Residencial Completo',
    required: false
  })
  @IsString()
  @IsOptional()
  subProduto?: string;

  @ApiProperty({
    description: 'Produção',
    example: 'Em andamento',
    required: false
  })
  @IsString()
  @IsOptional()
  producao?: string;

  @ApiProperty({
    description: 'Postagem',
    example: 'Agendada',
    required: false
  })
  @IsString()
  @IsOptional()
  postagem?: string;

  @ApiProperty({
    description: 'Status',
    example: 'Aprovado',
    required: false
  })
  @IsString()
  @IsOptional()
  status?: string;

  @ApiProperty({
    description: 'Período',
    example: 'Dezembro 2024',
    required: false
  })
  @IsString()
  @IsOptional()
  periodo?: string;

  @ApiProperty({
    description: 'Exposição/Praça',
    example: 'Belo Horizonte',
    required: false
  })
  @IsString()
  @IsOptional()
  exposicaoPraca?: string;

  @ApiProperty({
    description: 'Veículo',
    example: 'YouTube',
    required: false
  })
  @IsString()
  @IsOptional()
  veiculo?: string;

  @ApiProperty({
    description: 'Tipo de mídia',
    example: 'Video',
    required: false
  })
  @IsString()
  @IsOptional()
  tipoMidia?: string;

  @ApiProperty({
    description: 'Tipo de arquivo',
    example: 'MP4',
    required: false
  })
  @IsString()
  @IsOptional()
  tipoArquivo?: string;

  @ApiProperty({
    description: 'Formato',
    example: 'Horizontal',
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
    example: '60s',
    required: false
  })
  @IsString()
  @IsOptional()
  secundagem?: string;

  @ApiProperty({
    description: 'Peso',
    example: '8MB',
    required: false
  })
  @IsString()
  @IsOptional()
  peso?: string;

  @ApiProperty({
    description: 'Especificações',
    example: '4K, 30fps',
    required: false
  })
  @IsString()
  @IsOptional()
  especificacoes?: string;

  @ApiProperty({
    description: 'Assunto/tema',
    example: 'Proteção residencial',
    required: false
  })
  @IsString()
  @IsOptional()
  assuntoTema?: string;

  @ApiProperty({
    description: 'Briefing da peça',
    example: 'Video institucional destacando benefícios',
    required: false
  })
  @IsString()
  @IsOptional()
  briefingPeca?: string;

  @ApiProperty({
    description: 'Fase',
    example: 'Produção',
    required: false
  })
  @IsString()
  @IsOptional()
  fase?: string;

  @ApiProperty({
    description: 'Objetivo de mídia',
    example: 'Brand Awareness',
    required: false
  })
  @IsString()
  @IsOptional()
  objetivoMidia?: string;

  @ApiProperty({
    description: 'Estimativa de início de veiculação',
    example: '2024-12-10T00:00:00.000Z',
    required: false
  })
  @IsDateString()
  @IsOptional()
  estimativaInicioVeiculacao?: string;

  @ApiProperty({
    description: 'Estimativa de término de veiculação',
    example: '2024-12-31T00:00:00.000Z',
    required: false
  })
  @IsDateString()
  @IsOptional()
  estimativaTerminoVeiculacao?: string;

  @ApiProperty({
    description: 'Título (quando necessário)',
    example: 'Sua casa protegida 24h',
    required: false
  })
  @IsString()
  @IsOptional()
  titulo?: string;

  @ApiProperty({
    description: 'Caracteres do título',
    example: 20,
    required: false
  })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  caracteresTitulo?: number;

  @ApiProperty({
    description: 'Descrição (quando necessário)',
    example: 'Cobertura total para sua residência',
    required: false
  })
  @IsString()
  @IsOptional()
  descricao?: string;

  @ApiProperty({
    description: 'Caracteres da descrição',
    example: 35,
    required: false
  })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  caracteresDescricao?: number;

  @ApiProperty({
    description: 'Texto de apoio (quando necessário)',
    example: 'Aproveite nossas condições especiais',
    required: false
  })
  @IsString()
  @IsOptional()
  textoApoio?: string;

  @ApiProperty({
    description: 'Caracteres do texto de apoio',
    example: 42,
    required: false
  })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  caracteresTextoApoio?: number;

  @ApiProperty({
    description: 'CTA',
    example: 'Contratar agora',
    required: false
  })
  @IsString()
  @IsOptional()
  cta?: string;

  @ApiProperty({
    description: 'Caminho Peça',
    example: '/seguros/residencial',
    required: false
  })
  @IsString()
  @IsOptional()
  caminhoPeca?: string;

  @ApiProperty({
    description: 'URL de direcionamento',
    example: 'https://example.com/seguros/residencial',
    required: false
  })
  @IsString()
  @IsOptional()
  urlDirecionamento?: string;

  @ApiProperty({
    description: 'Link ou comprovação da veiculação',
    example: 'https://example.com/comprovacao/veiculacao/001',
    required: false
  })
  @IsString()
  @IsOptional()
  linkComprovacaoVeiculacao?: string;
}

export class UpdateMatrizConteudoDto {
  @ApiProperty({
    description: 'Produto',
    example: 'Seguro Residencial',
    required: false
  })
  @IsString()
  @IsOptional()
  produto?: string;

  @ApiProperty({
    description: 'Sub Produto',
    example: 'Seguro Residencial Completo',
    required: false
  })
  @IsString()
  @IsOptional()
  subProduto?: string;

  @ApiProperty({
    description: 'Produção',
    example: 'Em andamento',
    required: false
  })
  @IsString()
  @IsOptional()
  producao?: string;

  @ApiProperty({
    description: 'Postagem',
    example: 'Agendada',
    required: false
  })
  @IsString()
  @IsOptional()
  postagem?: string;

  @ApiProperty({
    description: 'Status',
    example: 'Aprovado',
    required: false
  })
  @IsString()
  @IsOptional()
  status?: string;

  @ApiProperty({
    description: 'Período',
    example: 'Dezembro 2024',
    required: false
  })
  @IsString()
  @IsOptional()
  periodo?: string;

  @ApiProperty({
    description: 'Exposição/Praça',
    example: 'Belo Horizonte',
    required: false
  })
  @IsString()
  @IsOptional()
  exposicaoPraca?: string;

  @ApiProperty({
    description: 'Veículo',
    example: 'YouTube',
    required: false
  })
  @IsString()
  @IsOptional()
  veiculo?: string;

  @ApiProperty({
    description: 'Tipo de mídia',
    example: 'Video',
    required: false
  })
  @IsString()
  @IsOptional()
  tipoMidia?: string;

  @ApiProperty({
    description: 'Tipo de arquivo',
    example: 'MP4',
    required: false
  })
  @IsString()
  @IsOptional()
  tipoArquivo?: string;

  @ApiProperty({
    description: 'Formato',
    example: 'Horizontal',
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
    example: '60s',
    required: false
  })
  @IsString()
  @IsOptional()
  secundagem?: string;

  @ApiProperty({
    description: 'Peso',
    example: '8MB',
    required: false
  })
  @IsString()
  @IsOptional()
  peso?: string;

  @ApiProperty({
    description: 'Especificações',
    example: '4K, 30fps',
    required: false
  })
  @IsString()
  @IsOptional()
  especificacoes?: string;

  @ApiProperty({
    description: 'Assunto/tema',
    example: 'Proteção residencial',
    required: false
  })
  @IsString()
  @IsOptional()
  assuntoTema?: string;

  @ApiProperty({
    description: 'Briefing da peça',
    example: 'Video institucional destacando benefícios',
    required: false
  })
  @IsString()
  @IsOptional()
  briefingPeca?: string;

  @ApiProperty({
    description: 'Fase',
    example: 'Produção',
    required: false
  })
  @IsString()
  @IsOptional()
  fase?: string;

  @ApiProperty({
    description: 'Objetivo de mídia',
    example: 'Brand Awareness',
    required: false
  })
  @IsString()
  @IsOptional()
  objetivoMidia?: string;

  @ApiProperty({
    description: 'Estimativa de início de veiculação',
    example: '2024-12-10T00:00:00.000Z',
    required: false
  })
  @IsDateString()
  @IsOptional()
  estimativaInicioVeiculacao?: string;

  @ApiProperty({
    description: 'Estimativa de término de veiculação',
    example: '2024-12-31T00:00:00.000Z',
    required: false
  })
  @IsDateString()
  @IsOptional()
  estimativaTerminoVeiculacao?: string;

  @ApiProperty({
    description: 'Título (quando necessário)',
    example: 'Sua casa protegida 24h',
    required: false
  })
  @IsString()
  @IsOptional()
  titulo?: string;

  @ApiProperty({
    description: 'Caracteres do título',
    example: 20,
    required: false
  })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  caracteresTitulo?: number;

  @ApiProperty({
    description: 'Descrição (quando necessário)',
    example: 'Cobertura total para sua residência',
    required: false
  })
  @IsString()
  @IsOptional()
  descricao?: string;

  @ApiProperty({
    description: 'Caracteres da descrição',
    example: 35,
    required: false
  })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  caracteresDescricao?: number;

  @ApiProperty({
    description: 'Texto de apoio (quando necessário)',
    example: 'Aproveite nossas condições especiais',
    required: false
  })
  @IsString()
  @IsOptional()
  textoApoio?: string;

  @ApiProperty({
    description: 'Caracteres do texto de apoio',
    example: 42,
    required: false
  })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  caracteresTextoApoio?: number;

  @ApiProperty({
    description: 'CTA',
    example: 'Contratar agora',
    required: false
  })
  @IsString()
  @IsOptional()
  cta?: string;

  @ApiProperty({
    description: 'Caminho Peça',
    example: '/seguros/residencial',
    required: false
  })
  @IsString()
  @IsOptional()
  caminhoPeca?: string;

  @ApiProperty({
    description: 'URL de direcionamento',
    example: 'https://example.com/seguros/residencial',
    required: false
  })
  @IsString()
  @IsOptional()
  urlDirecionamento?: string;

  @ApiProperty({
    description: 'Link ou comprovação da veiculação',
    example: 'https://example.com/comprovacao/veiculacao/001',
    required: false
  })
  @IsString()
  @IsOptional()
  linkComprovacaoVeiculacao?: string;
}