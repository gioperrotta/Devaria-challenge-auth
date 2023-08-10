import { Module } from '@nestjs/common';
import { FranchiseUnitService } from './franchiseUnit.service';
import { FranchiseUnitController } from './franchiseUnit.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [PrismaModule, UserModule],
  controllers: [FranchiseUnitController],
  providers: [FranchiseUnitService],
  exports: [FranchiseUnitService],
})
export class FranchiseUnitModule {}
