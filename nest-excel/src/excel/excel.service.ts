import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { Repository } from 'typeorm';
import * as ExcelJS from 'exceljs';
import { CompanyProduct } from './entities/companyProduct.entity';

@Injectable()
export class ExcelService {
  constructor(
    @InjectRepository(Company) private readonly companyRepository: Repository<Company>,
    @InjectRepository(CompanyProduct) private readonly companyProductRepository: Repository<CompanyProduct>,
    ) {}

  async readExcelFile(filePath: string) {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet(1);
  
    const data = [];
    worksheet.eachRow((row) => {
      if (row.number !== 1) {
        data.push(row.values);
      }
    });
    return data;
  }

  async saveToDatabase(row: any) {
    const companyEntity = new Company();
    companyEntity.company_idx                 = parseInt(row[1]);
    companyEntity.name_kor                    = row[2];
    companyEntity.name_eng                    = row[3];

    const companyProductEntity = new CompanyProduct();
    companyProductEntity.company_product_idx  = parseInt(row[4]);
    companyProductEntity.category             = row[5];
    companyProductEntity.category_detail      = row[6];
    companyProductEntity.name_kor             = row[7];
    companyProductEntity.name_eng             = row[8];
    companyProductEntity.company_idx = companyEntity.company_idx;

    const countCompanyByIdx = await this.companyRepository.count({
      where: { company_idx: companyEntity.company_idx }
    });

    if (countCompanyByIdx === 0) {
      await this.companyRepository.save(companyEntity);
    }

    const countCompanyProductByIdx = await this.companyProductRepository.count({
      where: { company_product_idx: companyProductEntity.company_product_idx }
    });

    if (countCompanyProductByIdx === 0) {
      await this.companyProductRepository.save(companyProductEntity);
    }
  }
  
  async saveToDatabaseSynchronously(data: any[]) {
    for (const row of data) {
      await this.saveToDatabase(row);
    }
  }
}


