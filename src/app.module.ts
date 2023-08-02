import { Module } from '@nestjs/common';

import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt.guards';

import { AppController } from './app.controller';
import { PrismaModule } from './prisma/prisma .module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';
import { ConsultaCepModule } from './consultaCep/consultaCep.module';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    AuthModule,
    RoleModule,
    ConsultaCepModule,
  ],
  controllers: [AppController],
  providers: [{ provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AppModule {}
