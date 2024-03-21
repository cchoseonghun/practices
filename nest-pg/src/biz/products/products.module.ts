import { Module, forwardRef } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from 'src/entities/products.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Products]), 
    forwardRef(() => UsersModule)
  ], 
  controllers: [ProductsController], 
  providers: [ProductsService], 
  exports: [ProductsService], 
})
export class ProductsModule {}
