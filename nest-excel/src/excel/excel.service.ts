import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// import { Company } from './entities/company.entity';
import { Repository } from 'typeorm';
import * as ExcelJS from 'exceljs';
// import { CompanyProduct } from './entities/companyProduct.entity';
import { Seller } from './entities/seller.entity';
import { Country } from './entities/country.entity';
import { Buyer } from './entities/buyer.entity';

import * as fs from 'fs';
import * as path from 'path';

const sample = {
  '01': 'DZ',
  '02': 'AR',
  '03': 'AM',
  '04': 'AU',
  '05': 'AT',
  '06': 'BH',
  '07': 'BD',
  '08': 'BY',
  '09': 'BE', 
  '10': 'BJ',
  '11': 'BO',
  '12': 'BR',
  '13': 'BG',
  '14': 'KH',
  '15': 'CA',
  '16': 'CL',
  '17': 'CN',
  '18': 'CO',
  '19': 'CR',
  '20': 'HR',
  '21': 'CU',
  '22': 'CY',
  '23': 'CZ',
  '24': 'DK',
  '25': 'EC',
  '26': 'EG',
  '27': 'SV',
  '28': 'EE',
  '29': 'FI',
  '30': 'FR',
  '31': 'GE',
  '32': 'DE',
  '33': 'GR',
  '34': 'GT',
  '35': 'HK',
  '36': 'HU',
  '37': 'IS',
  '38': 'IN',
  '39': 'ID',
  '40': 'IR',
  '41': 'IQ',
  '42': 'IE',
  '43': 'IL',
  '44': 'IT',
  '45': 'JP',
  '46': 'JO',
  '47': 'KZ',
  '48': 'KE',
  '49': 'KR',
  '50': 'KW',
  '51': 'LV',
  '52': 'LB',
  '53': 'LT',
  '54': 'LU',
  '55': null,
  '56': 'MK',
  '57': 'MY',
  '58': 'MT',
  '59': 'MX',
  '60': 'MD',
  '61': 'MC',
  '62': 'MA',
  '63': 'MZ',
  '64': null,
  '65': 'AL',
  '66': 'AS',
  '67': 'AD',
  '68': 'AO',
  '69': 'AI',
  '70': 'AQ',
  '71': 'AG',
  '72': 'SH',
  '73': 'AZ',
  '74': null,
  '75': 'BS',
  '76': 'BB',
  '77': 'BZ',
  '78': 'BM',
  '79': 'BT',
  '80': 'BA',
  '81': 'BW',
  '82': 'BN',
  '83': 'BF',
  '84': 'BI',
  '85': 'CM',
  '86': null,
  '87': 'CV',
  '88': 'KY',
  '89': 'CF',
  '90': 'TD',
  '91': 'CX',
  '92': 'CC',
  '93': 'KM',
  '94': 'CG',
  '95': 'CK',
  '96': null,
  '97': 'DJ',
  '98': 'DM',
  '99': 'DO',
  '100': 'GQ',
  '101': 'ER',
  '102': 'ET',
  '103': 'FK',
  '104': 'FO',
  '105': 'FJ',
  '106': 'GA',
  '107': 'GM',
  '108': 'GH',
  '109': 'GI',
  '110': 'GL',
  '111': 'GD',
  '112': 'GP',
  '113': 'GF',
  '114': 'GW',
  '115': 'GN',
  '116': 'GY',
  '117': 'HT',
  '118': null,
  '119': 'HN',
  '120': 'CI',
  '121': 'JM',
  '122': 'KI',
  '123': 'KG',
  '124': null,
  '125': 'LS',
  '126': 'LR',
  '127': 'LY',
  '128': 'LI',
  '129': 'MG',
  '130': null,
  '131': 'MW',
  '132': 'MV',
  '133': 'ML',
  '134': 'MH',
  '135': 'MQ',
  '136': 'MR',
  '137': 'MU',
  '138': 'YT',
  '139': 'MN',
  '140': 'MS',
  '141': 'MM',
  '142': 'NR',
  '143': 'NL',
  '144': 'NC',
  '145': 'NI',
  '146': 'NE',
  '147': 'NU',
  '148': 'NF',
  '149': 'PW',
  '150': 'PG',
  '151': 'PR',
  '152': 'RW',
  '153': null,
  '154': 'SM',
  '155': 'SC',
  '156': 'SL',
  '157': 'SB',
  '158': 'SO',
  '159': 'KN',
  '160': 'SH',
  '161': 'KN',
  '162': 'LC',
  '163': 'VC',
  '164': 'SR',
  '165': 'SZ',
  '166': 'TJ',
  '167': null,
  '168': 'TO',
  '169': 'TT',
  '170': 'TC',
  '171': 'TV',
  '172': 'UG',
  '173': 'VU',
  '174': null,
  '175': 'WS',
  '176': 'YE',
  '177': null,
  '178': null,
  '179': 'NA',
  '180': 'NP',
  '181': 'NL',
  '182': 'NZ',
  '183': 'NG',
  '184': 'NO',
  '185': 'OM',
  '186': 'PK',
  '187': 'PA',
  '188': 'PY',
  '189': 'PE',
  '190': 'PH',
  '191': 'PL',
  '192': 'PT',
  '193': 'QA',
  '194': 'RE',
  '195': 'RO',
  '196': 'RU',
  '197': 'SA',
  '198': 'SN',
  '199': 'SG',
  '200': 'SK',
  '201': 'SI',
  '202': 'ZA',
  '203': 'ES',
  '204': 'LK',
  '205': 'SD',
  '206': 'SE',
  '207': 'CH',
  '208': 'SY',
  '209': 'TW',
  '210': 'TZ',
  '211': 'TH',
  '212': 'TG',
  '213': 'TN',
  '214': 'TR',
  '215': 'TM',
  '216': 'UA',
  '217': 'AE',
  '218': 'GB',
  '219': 'UY',
  '220': 'US',
  '221': 'UZ',
  '222': 'VE',
  '223': 'VN',
  '224': 'YE',
  '225': 'ZM',
  '226': 'ZW',
};

const sample2 = {
  A16: 'AZ',
  A09: 'BD',
  A11: 'BT',
  A13: 'BN',
  A23: 'KH',
  A21: 'CN',
  A03: 'TL',
  A18: 'IN',
  A19: 'ID',
  A20: 'JP',
  A22: 'KZ',
  A24: 'KG',
  A04: null,
  A05: 'MY',
  A06: 'MV',
  A07: 'MN',
  A08: 'MM',
  A01: 'NP',
  A12: 'KP',
  A29: 'PK',
  A30: 'PH',
  A02: 'KR',
  A17: 'UZ',
  A15: 'SG',
  A14: 'LK',
  A27: 'TJ',
  A26: 'TW',
  A25: 'TH',
  A28: 'TM',
  A10: 'VN',
  B32: 'AL',
  B31: 'AD',
  B35: 'AT',
  B19: 'BY',
  B18: 'BE',
  B20: 'BA',
  B21: 'BG',
  B39: 'HR',
  B38: 'CZ',
  B04: 'DK',
  B33: 'EE',
  B45: 'FI',
  B44: 'FR',
  B05: 'DE',
  B01: 'GR',
  B46: 'HU',
  B29: 'IS',
  B30: 'IE',
  B37: 'IT',
  B40: 'CY',
  B06: 'LV',
  B11: 'LI',
  B10: 'LT',
  B09: 'LU',
  B12: 'MK',
  B16: 'MT',
  B15: 'MD',
  B13: 'MC',
  B14: 'ME',
  B02: 'NL',
  B03: 'NO',
  B43: 'PL',
  B42: 'PT',
  B08: 'RO',
  B07: 'RU',
  B22: 'SM',
  B23: 'RS',
  B27: 'SK',
  B28: 'SI',
  B26: 'ES',
  B24: 'SE',
  B25: 'CH',
  B41: 'TR',
  B36: 'UA',
  B34: 'GB',
  B17: 'VA',
  C07: 'AF',
  C06: 'AM',
  C02: 'BH',
  C12: 'IR',
  C11: 'IQ',
  C13: 'IL',
  C10: 'JO',
  C15: 'KW',
  C01: 'LB',
  C09: 'OM',
  C14: 'QA',
  C03: 'SA',
  C04: 'SY',
  C16: 'TR',
  C05: 'AE',
  C08: 'YE',
  D34: 'DZ',
  D35: 'AO',
  D22: 'BJ',
  D23: 'BW',
  D25: 'BF',
  D24: 'BI',
  D46: 'CM',
  D47: 'CV',
  D42: 'CF',
  D45: 'TD',
  D49: 'KM',
  D51: 'CG',
  D50: 'CI',
  D52: 'CD',
  D43: 'DJ',
  D39: 'EG',
  D41: 'GQ',
  D36: 'ER',
  D37: 'ET',
  D02: 'GA',
  D03: 'GM',
  D01: 'GH',
  D04: 'GN',
  D05: 'GW',
  D48: 'KE',
  D12: 'LS',
  D11: 'LR',
  D14: 'LY',
  D15: 'MG',
  D16: 'MW',
  D17: 'ML',
  D20: 'MR',
  D19: 'MU',
  D18: 'MA',
  D21: 'MZ',
  D06: 'NA',
  D10: 'NE',
  D07: 'NG',
  D13: 'RW',
  D26: 'ST',
  D28: 'SN',
  D29: 'SC',
  D33: 'SL',
  D30: 'SO',
  D09: 'ZA',
  D08: 'SS',
  D31: 'SD',
  D32: 'SZ',
  D53: 'TZ',
  D54: 'TG',
  D55: 'TN',
  D38: 'UG',
  D27: 'EH',
  D40: 'ZM',
  D44: 'ZW',
  E15: 'AG',
  E09: 'BS',
  E08: 'BB',
  E10: 'BZ',
  E19: 'CA',
  E20: 'CR',
  E21: 'CU',
  E05: 'DM',
  E04: 'DO',
  E16: 'SV',
  E02: 'GD',
  E01: 'GT',
  E14: 'HT',
  E17: 'HN',
  E18: 'JM',
  E06: 'MX',
  E03: 'NI',
  E23: 'PA',
  E13: 'KN',
  E12: 'VC',
  E11: 'LC',
  E22: 'TT',
  E07: 'US',
  F06: 'AR',
  F03: 'BO',
  F04: 'BR',
  F09: 'CL',
  F10: 'CO',
  F07: 'EC',
  F01: 'GY',
  F11: 'PY',
  F12: 'PE',
  F02: null,
  F05: 'SR',
  F08: 'UY',
  G03: null,
  G05: 'AU',
  G13: 'FJ',
  G14: null,
  G07: 'KI',
  G01: null,
  G11: 'PW',
  G12: null,
  G10: 'PG',
  G08: 'TO',
  G09: 'TV',
  G02: null,
  G06: null,
  G04: null
};

const region = {
  A: 'Asia', 
  B: 'Europe', 
  C: 'Asia', 
  D: 'Africa', 
  E: 'Americas', 
  G: 'Oceania', 
  F: 'Americas', 
}

const sample3 = {
  AD: 'Europe',
  AE: 'Asia',
  AF: 'Asia',
  AG: 'Americas',
  AI: 'Americas',
  AL: 'Europe',
  AM: 'Asia',
  AO: 'Africa',
  AR: 'Americas',
  AS: 'Oceania',
  AT: 'Europe',
  AU: 'Oceania',
  AW: 'Americas',
  AX: 'Europe',
  AZ: 'Asia',
  BA: 'Europe',
  BB: 'Americas',
  BD: 'Asia',
  BE: 'Europe',
  BF: 'Africa',
  BG: 'Europe',
  BH: 'Asia',
  BI: 'Africa',
  BJ: 'Africa',
  BL: 'Americas',
  BM: 'Americas',
  BN: 'Asia',
  BO: 'Americas',
  BQ: 'Americas',
  BR: 'Americas',
  BS: 'Americas',
  BT: 'Asia',
  BV: 'Americas',
  BW: 'Africa',
  BY: 'Europe',
  BZ: 'Americas',
  CA: 'Americas',
  CC: 'Oceania',
  CD: 'Africa',
  CF: 'Africa',
  CG: 'Africa',
  CH: 'Europe',
  CI: 'Africa',
  CK: 'Oceania',
  CL: 'Americas',
  CM: 'Africa',
  CN: 'Asia',
  CO: 'Americas',
  CR: 'Americas',
  CU: 'Americas',
  CV: 'Africa',
  CW: 'Americas',
  CX: 'Oceania',
  CY: 'Asia',
  CZ: 'Europe',
  DE: 'Europe',
  DJ: 'Africa',
  DK: 'Europe',
  DM: 'Americas',
  DO: 'Americas',
  DZ: 'Africa',
  EC: 'Americas',
  EE: 'Europe',
  EG: 'Africa',
  EH: 'Africa',
  ER: 'Africa',
  ES: 'Europe',
  ET: 'Africa',
  FI: 'Europe',
  FJ: 'Oceania',
  FK: 'Americas',
  FM: 'Oceania',
  FO: 'Europe',
  FR: 'Europe',
  GA: 'Africa',
  GB: 'Europe',
  GD: 'Americas',
  GE: 'Asia',
  GF: 'Americas',
  GG: 'Europe',
  GH: 'Africa',
  GI: 'Europe',
  GL: 'Americas',
  GM: 'Africa',
  GN: 'Africa',
  GP: 'Americas',
  GQ: 'Africa',
  GR: 'Europe',
  GS: 'Americas',
  GT: 'Americas',
  GU: 'Oceania',
  GW: 'Africa',
  GY: 'Americas',
  HK: 'Asia',
  HM: 'Oceania',
  HN: 'Americas',
  HR: 'Europe',
  HT: 'Americas',
  HU: 'Europe',
  ID: 'Asia',
  IE: 'Europe',
  IL: 'Asia',
  IM: 'Europe',
  IN: 'Asia',
  IO: 'Africa',
  IQ: 'Asia',
  IR: 'Asia',
  IS: 'Europe',
  IT: 'Europe',
  JE: 'Europe',
  JM: 'Americas',
  JO: 'Asia',
  JP: 'Asia',
  KE: 'Africa',
  KG: 'Asia',
  KH: 'Asia',
  KI: 'Oceania',
  KM: 'Africa',
  KN: 'Americas',
  KP: 'Asia',
  KR: 'Asia',
  KW: 'Asia',
  KY: 'Americas',
  KZ: 'Asia',
  LA: 'Asia',
  LB: 'Asia',
  LC: 'Americas',
  LI: 'Europe',
  LK: 'Asia',
  LR: 'Africa',
  LS: 'Africa',
  LT: 'Europe',
  LU: 'Europe',
  LV: 'Europe',
  LY: 'Africa',
  MA: 'Africa',
  MC: 'Europe',
  MD: 'Europe',
  ME: 'Europe',
  MF: 'Americas',
  MG: 'Africa',
  MH: 'Oceania',
  MK: 'Europe',
  ML: 'Africa',
  MM: 'Asia',
  MN: 'Asia',
  MO: 'Asia',
  MP: 'Oceania',
  MQ: 'Americas',
  MR: 'Africa',
  MS: 'Americas',
  MT: 'Europe',
  MU: 'Africa',
  MV: 'Asia',
  MW: 'Africa',
  MX: 'Americas',
  MY: 'Asia',
  MZ: 'Africa',
  NA: 'Africa',
  NC: 'Oceania',
  NE: 'Africa',
  NF: 'Oceania',
  NG: 'Africa',
  NI: 'Americas',
  NL: 'Europe',
  NO: 'Europe',
  NP: 'Asia',
  NR: 'Oceania',
  NU: 'Oceania',
  NZ: 'Oceania',
  OM: 'Asia',
  PA: 'Americas',
  PE: 'Americas',
  PF: 'Oceania',
  PG: 'Oceania',
  PH: 'Asia',
  PK: 'Asia',
  PL: 'Europe',
  PM: 'Americas',
  PN: 'Oceania',
  PR: 'Americas',
  PS: 'Asia',
  PT: 'Europe',
  PW: 'Oceania',
  PY: 'Americas',
  QA: 'Asia',
  RE: 'Africa',
  RO: 'Europe',
  RS: 'Europe',
  RU: 'Europe',
  RW: 'Africa',
  SA: 'Asia',
  SB: 'Oceania',
  SC: 'Africa',
  SD: 'Africa',
  SE: 'Europe',
  SG: 'Asia',
  SH: 'Africa',
  SI: 'Europe',
  SJ: 'Europe',
  SK: 'Europe',
  SL: 'Africa',
  SM: 'Europe',
  SN: 'Africa',
  SO: 'Africa',
  SR: 'Americas',
  SS: 'Africa',
  ST: 'Africa',
  SV: 'Americas',
  SX: 'Americas',
  SY: 'Asia',
  SZ: 'Africa',
  TC: 'Americas',
  TD: 'Africa',
  TF: 'Africa',
  TG: 'Africa',
  TH: 'Asia',
  TJ: 'Asia',
  TK: 'Oceania',
  TL: 'Asia',
  TM: 'Asia',
  TN: 'Africa',
  TO: 'Oceania',
  TR: 'Asia',
  TT: 'Americas',
  TV: 'Oceania',
  TW: 'Asia',
  TZ: 'Africa',
  UA: 'Europe',
  UG: 'Africa',
  UM: 'Oceania',
  US: 'Americas',
  UY: 'Americas',
  UZ: 'Asia',
  VA: 'Europe',
  VC: 'Americas',
  VE: 'Americas',
  VG: 'Americas',
  VI: 'Americas',
  VN: 'Asia',
  VU: 'Oceania',
  WF: 'Oceania',
  WS: 'Oceania',
  YE: 'Asia',
  YT: 'Africa',
  ZA: 'Africa',
  ZM: 'Africa',
  ZW: 'Africa'
};

@Injectable()
export class ExcelService {
  constructor(
    @InjectRepository(Buyer) private readonly buyerRepository: Repository<Buyer>,
    @InjectRepository(Seller) private readonly sellerRepository: Repository<Seller>,
    // @InjectRepository(Company) private readonly companyRepository: Repository<Company>,
    // @InjectRepository(CompanyProduct) private readonly companyProductRepository: Repository<CompanyProduct>,
    // @InjectRepository(Country) private readonly countryRepository: Repository<Country>,
    ) {}

  async readExcelFile(filePath: string) {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet(1);
  
    const data = [];
    worksheet.eachRow((row) => {
      // if (row.number !== 1) {
        data.push(row.values);
      // }
    });
    return data;
  }

  async saveToDatabaseSynchronously(data: any[]) {
    for (const row of data) {
      await this.saveToDatabase4(row);
    }
  }

  filtering(str: string) {
    return str.split(',').filter(item => item !== '').join(',');
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
  
  async saveToDatabase2(row: any) {
    const entity = new Seller();
    entity.seller_idx          = parseInt(row[1]);
    entity.business_type_codes = this.setAndFiltering(row[2]);
    entity.industry_codes      = this.setAndFiltering(row[3]);
    entity.export_countries    = this.setAndFiltering(this.change(row[4]));
    entity.export_regions      = this.setAndFiltering(this.checkRegion(entity.export_countries));

    if (entity.export_regions === '') {
      entity.export_regions = 'Worldwide'
    }

    await this.sellerRepository.save(entity);
  }

  change(data: string) {
    return data.split(',').map((item) => {
      if (item.length === 1) {
        item = '0' + item;
      }
      return sample[item];
    }).join(',');
  }

  checkRegion(data: string) {
    return data.split(',').map((item) => {
      return sample3[item];
    }).join(',');
  }

  // async saveToDatabase3(row: any) {
  //   const entity = new Country();
  //   entity.alpha      = row[1];
  //   entity.name       = row[2];
  //   entity.region     = row[3];
  //   entity.sub_region = row[4];

  //   await this.countryRepository.save(entity);
  // }

  async saveToDatabase4(row: any) {
    const entity = new Buyer();
    entity.buyer_idx                      = parseInt(row[1]);
    entity.business_type_codes            = this.setAndFiltering(row[2]);
    entity.industry_codes                 = this.setAndFiltering(row[3]);
    entity.interested_category_codes_main = this.setAndFiltering(row[4]);
    entity.interested_category_codes_sub  = this.setAndFiltering(row[5]);
    entity.interested_import_regions      = this.setAndFiltering(this.changeRegion(row[6]));
    entity.interested_import_countries    = this.setAndFiltering(this.change2(row[7]));

    await this.buyerRepository.save(entity);
  }

  change2(data: string) {
    return data.split(',').map((item) => {
      return sample2[item];
    }).join(',');
  }

  changeRegion(data: string) {
    return data.split(',').map((item) => {
      return region[item];
    }).join(',');
  }

  setAndFiltering(str: string) {
    const set = new Set(str.split(','));
    return [...set].filter(item => item !== '').join(',');
  }

  async activateSynchronously(data: any[]) {
    for (const row of data) {
      await this.migrateFile(row);
    }
  }

  private sourceFolder = path.join(__dirname, `../../src/imageMigrationResult/seller/before`);
  private targetFolder = path.join(__dirname, `../../src/imageMigrationResult/seller/after`);
  
  async migrateFile(row: any) {
    const filename = row[1].trim();
    
    if (filename !== '') {
      try {
        await this.copyFileWithSameName(this.sourceFolder, this.targetFolder, filename);
        // console.log(`파일 ${filename}을 복사했습니다.`);
      } catch (error) {
        console.error(`파일 복사 중 오류가 발생했습니다: ${error}`);
      }
    }
  }

  async copyFileWithSameName(sourceFolder: string, targetFolder: string, fileName: string): Promise<void> {
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
}


