import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/isPublic.decorator';

import jwt_decode from 'jwt-decode';

import { PrismaService } from 'src/prisma/prisma.service';
import { UserPayload } from '../types/UserPayload';
import { MessagesHelper } from '../helpers/messages.helper';

@Injectable()
export class AccessRolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    const token = context.getArgs()[0].headers.authorization.split(' ')[1];
    const payload: UserPayload = jwt_decode(token);
    const userRequest = await this.prisma.user.findUnique({
      where: {
        id: payload.sub,
      },
      include: { role: true },
    });
    if (!userRequest) {
      throw new UnauthorizedException(MessagesHelper.UNAUTHORIZED);
    }

    // user Admin level = 0 sempre acessa qualquer rota
    if (userRequest.role.level === 0) {
      return true;
    }

    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    const userRoleMatch = roles.filter(
      (role) => role === userRequest.role.name,
    );

    if (userRoleMatch.length === 0) {
      throw new UnauthorizedException(MessagesHelper.UNAUTHORIZED);
    }

    return true;
  }
}
