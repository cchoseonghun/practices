import { Module } from '@nestjs/common';
import { ExcelService } from './excel.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExcelController } from './excel.controller';
import { Company } from './entities/company.entity';
import { CompanyProduct } from './entities/companyProduct.entity';
import { Seller } from './entities/seller.entity';
import { Country } from './entities/country.entity';
import { Buyer } from './entities/buyer.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Company, CompanyProduct, Seller, Country, Buyer]),
  ], 
  controllers: [ExcelController], 
  providers: [ExcelService], 
})
export class ExcelModule {}
