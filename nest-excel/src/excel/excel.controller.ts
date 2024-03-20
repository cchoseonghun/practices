import { Controller, Get, Header, Param, Res } from '@nestjs/common';
import { ExcelService } from './excel.service';
import * as path from 'path';

@Controller()
export class ExcelController {
  constructor(private readonly excelService: ExcelService) {}

  // @Post('upload')
  // @UseInterceptors(FileInterceptor('file'))
  // async uploadExcel(@UploadedFile() file: Express.Multer.File) {
  //   // 업로드된 Excel 파일 경로
  //   const excelFilePath = file.path;

  //   // Excel 파일 읽기
  //   const data = await readExcelFile(excelFilePath);

  //   // 데이터베이스에 저장
  //   await this.excelService.saveToDatabase(data);

  //   return { message: 'Excel 데이터가 성공적으로 저장되었습니다.' };
  // }

  // @Get()
  // async uploadExcel() {
  //   const excelFilePath = path.join(__dirname, '../../src/target/sampleExcelFile.xlsx');

  //   const data = await this.excelService.readExcelFile(excelFilePath);
  //   await this.excelService.saveToDatabaseSynchronously(data);

  //   return { message: 'Excel 데이터가 성공적으로 저장되었습니다.' };
  // }

  @Get('excel/:filename')
  async test(
    @Param('filename') filename: string, 
  ) {
    const excelFilePath = path.join(__dirname, `../../src/target/${filename}.xlsx`);

    const data = await this.excelService.readExcelFile(excelFilePath);
    // await this.excelService.saveToDatabaseSynchronously(data);

    // return { message: 'Excel 데이터가 성공적으로 저장되었습니다.' };
    const result = await this.excelService.saveToDatabaseSynchronously(data);;
    return result;
  }

  @Get('migration/:filename')
  async migration(@Param('filename') filename: string) {
    const excelFilePath = path.join(__dirname, `../../src/migration/${filename}.xlsx`);

    const data = await this.excelService.readExcelFile(excelFilePath);
    await this.excelService.activateSynchronously(data);

    return { message: '파일 복사 완료' };
  }

  @Get('jsonToExcel')
  @Header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
  @Header('Content-Disposition', 'attachment; filename=users.xlsx')
  save(@Res() res) {
    // this.excelService.jsonToExcel(res);
  }

  @Get('combination')
  @Header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
  @Header('Content-Disposition', 'attachment; filename=users.xlsx')
  async combination(@Res() res) {
    const iso3Path = path.join(__dirname, `../../src/target/iso3.xlsx`);
    const iso2Path = path.join(__dirname, `../../src/target/iso2.xlsx`);

    const iso3Data = await this.excelService.readExcelFile(iso3Path);
    const iso2Data = await this.excelService.readExcelFile(iso2Path);

    this.excelService.combination(res, iso3Data, iso2Data);
  }
}
