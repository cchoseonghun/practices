import { Module } from '@nestjs/common';
import { ExcelService } from './excel.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExcelController } from './excel.controller';
import { Company } from './entities/company.entity';
import { CompanyProduct } from './entities/companyProduct.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Company, CompanyProduct]),
  ], 
  controllers: [ExcelController], 
  providers: [ExcelService], 
})
export class ExcelModule {}
