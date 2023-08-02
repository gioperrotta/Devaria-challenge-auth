import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserFromJwt } from '../types/UserFromJwt';
import { AuthRequest } from '../types/AuthRequest';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): UserFromJwt => {
    const request = context.switchToHttp().getRequest<AuthRequest>();

    return request.user;
  },
);
