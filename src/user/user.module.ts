import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';

import { PrismaModule } from 'src/prisma/prisma .module';
import { RoleModule } from 'src/role/role.module';

@Module({
  imports: [PrismaModule, RoleModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
