import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Buyer } from 'src/excel/entities/buyer.entity';
import { Company } from 'src/excel/entities/company.entity';
import { CompanyProduct } from 'src/excel/entities/companyProduct.entity';
import { Country } from 'src/excel/entities/country.entity';
import { Seller } from 'src/excel/entities/seller.entity';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) { }

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.configService.get<string>('DATABASE_HOST'),
      port: this.configService.get<number>('DATABASE_PORT'),
      username: this.configService.get<string>('DATABASE_USERNAME'),
      password: this.configService.get<string>('DATABASE_PASSWORD'),
      database: this.configService.get<string>('DATABASE_NAME'),
      synchronize: Boolean(this.configService.get<string>('DATABASE_SYNC')), // 배포 시 false
      entities: [Company, CompanyProduct, Seller, Country, Buyer],
    };
  }
}
