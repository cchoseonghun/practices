import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import envConfig from './common/env.config';
import { DatabaseModule } from './common/database.module';
import { ProductsModule } from './biz/products/products.module';
import { UsersModule } from './biz/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env`],
      isGlobal: true,
      load: [envConfig],
    }),
    DatabaseModule, 
    ProductsModule, 
    UsersModule
  ], 
})
export class AppModule {}
