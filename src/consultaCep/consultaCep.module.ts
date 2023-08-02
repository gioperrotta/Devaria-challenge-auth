import { Module } from '@nestjs/common';
import { ConsultaCepService } from './consultaCep.service';
import { ConsultaCepController } from './consultaCep.controller';

@Module({
  controllers: [ConsultaCepController],
  providers: [ConsultaCepService],
})
export class ConsultaCepModule {}
