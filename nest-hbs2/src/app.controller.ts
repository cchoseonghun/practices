import { Get, Controller, Render } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  @Render('index')
  root() {
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