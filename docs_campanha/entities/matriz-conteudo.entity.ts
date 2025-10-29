import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsDateString, IsOptional } from 'class-validator';

export class MatrizConteudo {
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
    description: 'Produto',
    example: 'Seguro Residencial'
  })
  @IsString()
  @IsOptional()
  produto?: string;

  @ApiProperty({
    description: 'Sub Produto',
    example: 'Seguro Residencial Completo'
  })
  @IsString()
  @IsOptional()
  subProduto?: string;

  @ApiProperty({
    description: 'Produção',
    example: 'Em andamento'
  })
  @IsString()
  @IsOptional()
  producao?: string;

  @ApiProperty({
    description: 'Postagem',
    example: 'Agendada'
  })
  @IsString()
  @IsOptional()
  postagem?: string;

  @ApiProperty({
    description: 'Status',
    example: 'Aprovado'
  })
  @IsString()
  @IsOptional()
  status?: string;

  @ApiProperty({
    description: 'Período',
    example: 'Dezembro 2024'
  })
  @IsString()
  @IsOptional()
  periodo?: string;

  @ApiProperty({
    description: 'Exposição/Praça',
    example: 'Belo Horizonte'
  })
  @IsString()
  @IsOptional()
  exposicaoPraca?: string;

  @ApiProperty({
    description: 'Veículo',
    example: 'YouTube'
  })
  @IsString()
  @IsOptional()
  veiculo?: string;

  @ApiProperty({
    description: 'Tipo de mídia',
    example: 'Video'
  })
  @IsString()
  @IsOptional()
  tipoMidia?: string;

  @ApiProperty({
    description: 'Tipo de arquivo',
    example: 'MP4'
  })
  @IsString()
  @IsOptional()
  tipoArquivo?: string;

  @ApiProperty({
    description: 'Formato',
    example: 'Horizontal'
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
    example: '60s'
  })
  @IsString()
  @IsOptional()
  secundagem?: string;

  @ApiProperty({
    description: 'Peso',
    example: '8MB'
  })
  @IsString()
  @IsOptional()
  peso?: string;

  @ApiProperty({
    description: 'Especificações',
    example: '4K, 30fps'
  })
  @IsString()
  @IsOptional()
  especificacoes?: string;

  @ApiProperty({
    description: 'Assunto/tema',
    example: 'Proteção residencial'
  })
  @IsString()
  @IsOptional()
  assuntoTema?: string;

  @ApiProperty({
    description: 'Briefing da peça',
    example: 'Video institucional destacando benefícios'
  })
  @IsString()
  @IsOptional()
  briefingPeca?: string;

  @ApiProperty({
    description: 'Fase',
    example: 'Produção'
  })
  @IsString()
  @IsOptional()
  fase?: string;

  @ApiProperty({
    description: 'Objetivo de mídia',
    example: 'Brand Awareness'
  })
  @IsString()
  @IsOptional()
  objetivoMidia?: string;

  @ApiProperty({
    description: 'Estimativa de início de veiculação',
    example: '2024-12-10T00:00:00.000Z'
  })
  @IsDateString()
  @IsOptional()
  estimativaInicioVeiculacao?: string;

  @ApiProperty({
    description: 'Estimativa de término de veiculação',
    example: '2024-12-31T00:00:00.000Z'
  })
  @IsDateString()
  @IsOptional()
  estimativaTerminoVeiculacao?: string;

  @ApiProperty({
    description: 'Título (quando necessário)',
    example: 'Sua casa protegida 24h'
  })
  @IsString()
  @IsOptional()
  titulo?: string;

  @ApiProperty({
    description: 'Caracteres do título',
    example: 20
  })
  @IsNumber()
  @IsOptional()
  caracteresTitulo?: number;

  @ApiProperty({
    description: 'Descrição (quando necessário)',
    example: 'Cobertura total para sua residência'
  })
  @IsString()
  @IsOptional()
  descricao?: string;

  @ApiProperty({
    description: 'Caracteres da descrição',
    example: 35
  })
  @IsNumber()
  @IsOptional()
  caracteresDescricao?: number;

  @ApiProperty({
    description: 'Texto de apoio (quando necessário)',
    example: 'Aproveite nossas condições especiais'
  })
  @IsString()
  @IsOptional()
  textoApoio?: string;

  @ApiProperty({
    description: 'Caracteres do texto de apoio',
    example: 42
  })
  @IsNumber()
  @IsOptional()
  caracteresTextoApoio?: number;

  @ApiProperty({
    description: 'CTA',
    example: 'Contratar agora'
  })
  @IsString()
  @IsOptional()
  cta?: string;

  @ApiProperty({
    description: 'Caminho Peça',
    example: '/seguros/residencial'
  })
  @IsString()
  @IsOptional()
  caminhoPeca?: string;

  @ApiProperty({
    description: 'URL de direcionamento',
    example: 'https://example.com/seguros/residencial'
  })
  @IsString()
  @IsOptional()
  urlDirecionamento?: string;

  @ApiProperty({
    description: 'Link ou comprovação da veiculação',
    example: 'https://example.com/comprovacao/veiculacao/001'
  })
  @IsString()
  @IsOptional()
  linkComprovacaoVeiculacao?: string;

  @ApiProperty({
    description: 'Data de criação do registro'
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Data de atualização do registro'
  })
  updatedAt: Date;

  constructor(partial: Partial<MatrizConteudo>) {
    Object.assign(this, partial);
  }
}