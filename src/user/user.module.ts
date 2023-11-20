import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';

import { PrismaModule } from 'src/prisma/prisma.module';
import { RoleModule } from 'src/role/role.module';
import { SupabaseService } from 'src/supabase/supabase.service';

@Module({
  imports: [PrismaModule, RoleModule],
  controllers: [UserController],
  providers: [UserService, SupabaseService],
  exports: [UserService],
})
export class UserModule {}
