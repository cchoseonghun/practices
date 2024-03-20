import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  @Get()
  @Render('pages/view.ejs')
  async view() {
    // return { name: 'peter', age: 28, job: 'software engineer'};
    return {
      data: [
        {
          name: 'tester-1',
          age: 12,
        },
        {
          name: 'tester-2',
          age: 35,
        },
        {
          name: 'tester-3',
          age: 5,
        },
      ],
    };
  }
}
