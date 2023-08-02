import { Controller, Get, Param } from '@nestjs/common';
import { ConsultaCepService } from './consultaCep.service';
import { IsPublic } from 'src/auth/decorators/isPublic.decorator';

@Controller('consulta-cep')
export class ConsultaCepController {
  constructor(private readonly consultaCepService: ConsultaCepService) {}

  @IsPublic()
  @Get(':cep')
  getAddressByCep(@Param('cep') cep: string) {
    return this.consultaCepService.getAddressByCep(cep);
  }
}
