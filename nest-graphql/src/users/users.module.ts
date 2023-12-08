import { Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { MetaModule } from 'src/meta.module';

@Module({
  imports: [MetaModule], 
  providers: [UsersService, UsersResolver], 
  exports: [UsersService, UsersResolver]
})
export class UsersModule {}
