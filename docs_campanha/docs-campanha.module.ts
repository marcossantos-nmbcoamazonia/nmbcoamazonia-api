import { Module } from '@nestjs/common';

// Controllers
import { CampanhaController } from './controllers/campanha.controller';
import { RMDigitalController } from './controllers/rm-digital.controller';
import { ConteudosAnunciosController } from './controllers/conteudos-anuncios.controller';
import { MatrizConteudoController } from './controllers/matriz-conteudo.controller';
import { TaxonomiaParametrizacaoController } from './controllers/taxonomia-parametrizacao.controller';
import { MidiaAnunciosSocialController } from './controllers/midia-anuncios-social.controller';
import { LogsController } from './controllers/logs.controller';

// Services
import { CampanhaService } from './services/campanha.service';
import { RMDigitalService } from './services/rm-digital.service';
import { ConteudosAnunciosService } from './services/conteudos-anuncios.service';
import { MatrizConteudoService } from './services/matriz-conteudo.service';
import { TaxonomiaParametrizacaoService } from './services/taxonomia-parametrizacao.service';
import { MidiaAnunciosSocialService } from './services/midia-anuncios-social.service';
import { CampanhaLogService } from './services/campanha-log.service';

@Module({
  controllers: [
    CampanhaController,
    RMDigitalController,
    ConteudosAnunciosController,
    MatrizConteudoController,
    TaxonomiaParametrizacaoController,
    MidiaAnunciosSocialController,
    LogsController,
  ],
  providers: [
    CampanhaLogService, // Deve ser registrado primeiro pois é dependência de outros services
    CampanhaService,
    RMDigitalService,
    ConteudosAnunciosService,
    MatrizConteudoService,
    TaxonomiaParametrizacaoService,
    MidiaAnunciosSocialService,
  ],
  exports: [
    CampanhaService,
    CampanhaLogService,
    RMDigitalService,
    ConteudosAnunciosService,
    MatrizConteudoService,
    TaxonomiaParametrizacaoService,
    MidiaAnunciosSocialService,
  ],
})
export class DocsCampanhaModule {}