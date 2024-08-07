import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES, ROLES_KEY } from 'src/common/constants';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const role = this.reflector.getAllAndOverride<ROLES>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!role) return true;

    const { user } = context.switchToHttp().getRequest();

    if (user.role === ROLES.ADMIN) return true;

    return role === user.role;
  }
}
