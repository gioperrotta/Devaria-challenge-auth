import { Module } from '@nestjs/common';

import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt.guard';

import { AppController } from './app.controller';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';
import { FranchiseUnitModule } from './franchiseUnit/franchiseUnit.module';
import { AddressModule } from './address/address.module';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    AuthModule,
    RoleModule,
    FranchiseUnitModule,
    AddressModule,
  ],
  controllers: [AppController],
  providers: [{ provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AppModule {}
