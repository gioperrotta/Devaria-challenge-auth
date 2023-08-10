import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { FranchiseUnitModule } from 'src/franchiseUnit/franchiseUnit.module';

import { AddressService } from './address.service';
import { AddressController } from './address.controller';

@Module({
  imports: [PrismaModule, FranchiseUnitModule],
  controllers: [AddressController],
  providers: [AddressService],
})
export class AddressModule {}
