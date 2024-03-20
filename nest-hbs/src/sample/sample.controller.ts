import { Controller, Get, Render, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('sample')
export class SampleController {
  // @Get()
  // @Render('index')
  // root() {
  //   console.log('test');
  //   return { message: 'Hello world!' };
  // }

  @Get()
  @Render('home')
  root() {
    return { 
      name: "parkoon",
      isLoggedIn: false, 
      isReady: false, 
      users: ["parkoon", "kimyang", "choikoon", "leeyang"],
      user: {
        name: 'seonghun', 
      }
    };
  }

}
