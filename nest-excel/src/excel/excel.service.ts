import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// import { Company } from './entities/company.entity';
import { Repository } from 'typeorm';
import * as ExcelJS from 'exceljs';
// import { CompanyProduct } from './entities/companyProduct.entity';
import { Seller } from './entities/seller.entity';
import { Buyer } from './entities/buyer.entity';

import * as fs from 'fs';
import * as path from 'path';
import { Country } from './entities/country.entity';
import * as XLSX from 'xlsx';

@Injectable()
export class ExcelService {
  constructor(
    @InjectRepository(Buyer)
    private readonly buyerRepository: Repository<Buyer>,
    @InjectRepository(Seller)
    private readonly sellerRepository: Repository<Seller>,
    // @InjectRepository(Company) private readonly companyRepository: Repository<Company>,
    // @InjectRepository(CompanyProduct) private readonly companyProductRepository: Repository<CompanyProduct>,
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>
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

  async saveToDatabaseSynchronously(data: any[]) {
    let arr = [];
    for (const row of data) {
      const obj = await this.saveToDatabase(row);
      // arr.push(obj);
    }
    return arr;
  }

  filtering(str: string) {
    return str
      .split(',')
      .filter((item) => item !== '')
      .join(',');
  }

  async saveToDatabase(row: any) {
    const entity = new Country();
    entity.iso2 = String(row[3]).trim(),
    entity.iso3 = String(row[4]).trim(),
    entity.name = String(row[1]).trim(),
    entity.callingCode = row[2] ? String(row[2]).trim() : null,

    await this.countryRepository.save(entity);
    // let obj = {
    //   iso2: String(row[3]).trim(),
    //   iso3: String(row[4]).trim(),
    //   name: String(row[1]).trim(),
    //   callingCode: row[2] ? String(row[2]).trim() : null,
    // };
    // return obj;
  }

  // async saveToDatabase(row: any) {
  //   const companyEntity = new Company();
  //   companyEntity.company_idx                 = parseInt(row[1]);
  //   companyEntity.name_kor                    = row[2];
  //   companyEntity.name_eng                    = row[3];

  //   const companyProductEntity = new CompanyProduct();
  //   companyProductEntity.company_product_idx  = parseInt(row[4]);
  //   companyProductEntity.category             = row[5];
  //   companyProductEntity.category_detail      = row[6];
  //   companyProductEntity.name_kor             = row[7];
  //   companyProductEntity.name_eng             = row[8];
  //   companyProductEntity.company_idx = companyEntity.company_idx;

  //   const countCompanyByIdx = await this.companyRepository.count({
  //     where: { company_idx: companyEntity.company_idx }
  //   });

  //   if (countCompanyByIdx === 0) {
  //     await this.companyRepository.save(companyEntity);
  //   }

  //   const countCompanyProductByIdx = await this.companyProductRepository.count({
  //     where: { company_product_idx: companyProductEntity.company_product_idx }
  //   });

  //   if (countCompanyProductByIdx === 0) {
  //     await this.companyProductRepository.save(companyProductEntity);
  //   }
  // }

  // async saveToDatabase3(row: any) {
  //   const entity = new Country();
  //   entity.alpha      = row[1];
  //   entity.name       = row[2];
  //   entity.region     = row[3];
  //   entity.sub_region = row[4];

  //   await this.countryRepository.save(entity);
  // }

  setAndFiltering(str: string) {
    const set = new Set(str.split(','));
    return [...set].filter((item) => item !== '').join(',');
  }

  async activateSynchronously(data: any[]) {
    for (const row of data) {
      await this.migrateFile(row);
    }
  }

  private sourceFolder = path.join(
    __dirname,
    `../../src/imageMigrationResult/seller/before`
  );
  private targetFolder = path.join(
    __dirname,
    `../../src/imageMigrationResult/seller/after`
  );

  async migrateFile(row: any) {
    const filename = row[1].trim();

    if (filename !== '') {
      try {
        await this.copyFileWithSameName(
          this.sourceFolder,
          this.targetFolder,
          filename
        );
        // console.log(`파일 ${filename}을 복사했습니다.`);
      } catch (error) {
        console.error(`파일 복사 중 오류가 발생했습니다: ${error}`);
      }
    }
  }

  async copyFileWithSameName(
    sourceFolder: string,
    targetFolder: string,
    fileName: string
  ): Promise<void> {
    const sourceFilePath = path.join(sourceFolder, fileName);
    const targetFilePath = path.join(targetFolder, fileName);

    if (fs.existsSync(sourceFilePath)) {
      return new Promise((resolve, reject) => {
        const readStream = fs.createReadStream(sourceFilePath);
        const writeStream = fs.createWriteStream(targetFilePath);

        readStream.on('error', (err) => reject(err));
        writeStream.on('error', (err) => reject(err));
        writeStream.on('finish', () => resolve());
        readStream.pipe(writeStream);
      });
    } else {
      throw new Error(`파일 ${fileName}을 원본 폴더에서 찾을 수 없습니다.`);
    }
  }

  jsonToExcel(res, data) {
    // const originalJSON = {
    //   "AD": {
    //       "name": "Andorra",
    //       "phone": "376",
    //       "flag": "🇦🇩"
    //   },
    //   "AE": {
    //       "name": "United Arab Emirates",
    //       "phone": "97",
    //       "flag": "🇦🇪"
    //   },
    //   // ...
    // };

    //   const transformedArray = Object.entries(originalJSON).map(([iso2, country]) => ({
    //     name: country.name,
    //     phone: country.phone,
    //     iso2: iso2
    // }));

    // step 1. workbook 생성
    const wb = XLSX.utils.book_new();

    // step 2. 시트 만들기
    const newWorksheet = XLSX.utils.json_to_sheet(data);

    // step 3. workbook에 새로만든 워크시트에 이름을 주고 붙임.
    XLSX.utils.book_append_sheet(wb, newWorksheet, 'Sheet1');

    const wbOptions = { bookType: 'xlsx', type: 'binary' };

    const filename = 'test.xlsx';
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    // step 4. 파일을 로컬에 생성합니다.
    XLSX.writeFile(wb, filename, wbOptions); // write workbook file

    // step 5. 생성된 파일을 client 에 전송합니다.
    const stream = fs.createReadStream(filename); // create read stream
    stream.pipe(res);
  }

  combination(res, iso3Data, iso2Data) {
    let iso3Json = [];
    for (const row of iso3Data) {
      if (row[4] !== undefined) {
        const obj = {
          iso2: row[4]['text'].trim(),
          iso3: row[5]['text'].trim(),
        };
        iso3Json.push(obj);
      }
    }

    let iso2Json = [];
    for (const row of iso2Data) {
      const obj = {
        name: row[1].trim(),
        phone: row[2].trim(),
        iso2: row[3].trim(),
      };
      iso2Json.push(obj);
    }

    const updatedIso2Json = iso2Json.map((item) => {
      const matchedIso3 = iso3Json.find(
        (iso3Item) => iso3Item.iso2 === item.iso2
      );
      if (matchedIso3) {
        return { ...item, iso3: matchedIso3.iso3 };
      }
      return item;
    });

    // console.log(updatedIso2Json);
    this.jsonToExcel(res, updatedIso2Json);
  }
}
