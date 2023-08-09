import { Module } from '@nestjs/common';
import { FranchiseUnitService } from './franchise-unit.service';
import { FranchiseUnitController } from './franchise-unit.controller';
import { PrismaModule } from 'src/prisma/prisma .module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [PrismaModule, UserModule],
  controllers: [FranchiseUnitController],
  providers: [FranchiseUnitService],
})
export class FranchiseUnitModule {}
