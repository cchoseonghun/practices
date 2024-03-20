import { Controller, Get, Render } from '@nestjs/common';

@Controller('sample')
export class SampleController {
  @Get()
  @Render('view.ejs')
  async view() {
    return { name: 'peter', age: 28, job: 'software engineer'};
  }
}
