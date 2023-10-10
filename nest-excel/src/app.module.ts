import { Module } from '@nestjs/common';
import { ExcelModule } from './excel/excel.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './config/database/mysql/typeorm.config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
      envFilePath: process.env.NODE_ENV === 'test' ? '.env.test' : '.env', 
    }), 
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }), 
    ExcelModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
