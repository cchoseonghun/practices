import { Injectable } from '@nestjs/common';

@Injectable()
export class SampleService {
  find() {
    return {
      result: 'hi'
    }
  }
}
