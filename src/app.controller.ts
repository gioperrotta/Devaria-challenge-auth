import { Controller, Get } from '@nestjs/common';
import { IsPublic } from './auth/decorators/isPublic.decorator';

@Controller()
export class AppController {
  @IsPublic()
  @Get('hello')
  getHello(): string {
    return 'Hello World';
  }
}
