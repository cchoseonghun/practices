import { Module } from '@nestjs/common';
import { PokemonController } from './pokemon.controller';
import { PokemonService } from './pokemon.service';
import { CombinedSlugService, QueryParamSlugService, SubdomainSlugService } from './slug.service';

@Module({
  controllers: [PokemonController],
  providers: [
    PokemonService, 
    {
      provide: CombinedSlugService, 
      useFactory: () => 
        new CombinedSlugService([  // 아래 선언 순서에 따라 실행 순서가 달라짐
          new QueryParamSlugService(), 
          new SubdomainSlugService(), 
        ]), 
    }, 
  ],
})
export class PokemonModule {}
