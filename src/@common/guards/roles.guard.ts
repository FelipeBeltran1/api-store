import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from 'src/modules/auth/models/roles.model';
import { PayloadToken } from 'src/modules/auth/models/token.model';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<Role[]>(ROLES_KEY, context.getHandler());
    if (!roles) {
      return true;
    }
    // ['admin'];
    const request = context.switchToHttp().getRequest();
    const user = request.user as PayloadToken;
    //{role: 'admin', sub: 122}
    const isAuth = roles.some((role) => role === user.role);
    if (!isAuth) {
      throw new ForbiddenException('Your role is not authorized');
    }
    return isAuth;
  }
}
