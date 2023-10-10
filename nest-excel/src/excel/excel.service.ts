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
    companyEntity.companyIdx = parseInt(row[1]);
    companyEntity.nameKor = row[2];
    companyEntity.nameEng = row[3];

    const companyProductEntity = new CompanyProduct();
    companyProductEntity.companyProductIdx = parseInt(row[4]);
    companyProductEntity.category = row[5];
    companyProductEntity.categoryDetail = row[6];
    companyProductEntity.nameKor = row[7];
    companyProductEntity.nameEng = row[8];
    companyProductEntity.companyIdx = companyEntity.companyIdx;

    const countCompanyByIdx = await this.companyRepository.count({
      where: { companyIdx: companyEntity.companyIdx }
    });

    if (countCompanyByIdx === 0) {
      await this.companyRepository.save(companyEntity);
    }

    const countCompanyProductByIdx = await this.companyProductRepository.count({
      where: { companyProductIdx: companyProductEntity.companyProductIdx }
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


