import { Module } from '@nestjs/common';
import { MetadataService } from './metadata.service';
import { MetadataResolver } from './metadata.resolver';
import { Metadata } from './entities/metadata.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetaModule } from 'src/meta.module';

@Module({
  imports: [MetaModule], 
  providers: [MetadataService, MetadataResolver], 
  exports: [MetadataService, MetadataResolver], 
})
export class MetadataModule {}
