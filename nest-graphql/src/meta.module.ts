// MetaModule
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/users.entity';
import { Metadata } from './metadata/entities/metadata.entity';
import { OpenGraph } from './opengraph/entities/opengraph.entity';
import { MetadataService } from './metadata/metadata.service';
import { UsersService } from './users/users.service';
import { UsersResolver } from './users/users.resolver';
import { MetadataResolver } from './metadata/metadata.resolver';
import { OpengraphService } from './opengraph/opengraph.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User, Metadata, OpenGraph
    ]), 
  ], 
  controllers: [], 
  providers: [
    UsersService, 
    UsersResolver, 
    MetadataService, 
    MetadataResolver, 
    OpengraphService
  ],
  exports: [
    UsersService, 
    UsersResolver, 
    MetadataService, 
    MetadataResolver, 
    OpengraphService
  ],
})
export class MetaModule {}