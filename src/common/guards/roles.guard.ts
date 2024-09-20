import { ROLES_KEY } from '@common/decorators/roles.decorator';
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@user/infrastructure/controller/enum/user.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    if (!user || !user.role) {
      throw new ForbiddenException(
        'User is not authenticated or user does not have any roles assigned.',
      );
    }
    if (!user.available) {
      throw new ForbiddenException(
        'Unauthorized user role or has not updated their password',
      );
    }

    const hasRole = requiredRoles.some((role) => role == user.role);
    if (!hasRole) {
      throw new ForbiddenException(
        `User does not have the necessary roles: ${requiredRoles.join(', ')}`,
      );
    }

    return true;
  }
}
