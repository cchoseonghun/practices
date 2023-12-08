import { Module } from '@nestjs/common';
import { MetaModule } from 'src/meta.module';
import { OpengraphService } from './opengraph.service';

@Module({
  imports: [MetaModule], 
  providers: [OpengraphService], 
  exports: []
})
export class OpenGraphModule {}
