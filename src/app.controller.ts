import { Controller, Get } from '@nestjs/common';
import { IsPublic } from './auth/decorators/isPublic.decorator';
import { ApiTags } from '@nestjs/swagger';

@Controller()
export class AppController {
  @ApiTags('hello')
  @IsPublic()
  @Get('hello')
  getHello(): string {
    return 'Hello World';
  }
}
