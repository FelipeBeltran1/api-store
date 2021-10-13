import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import typeormConfig from './../config/typeorm.config';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject(typeormConfig.KEY)
    private configService: ConfigType<typeof typeormConfig>,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler());
    if (isPublic) {
      return true;
    }
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.header('Auth');
    const isAuth = authHeader === this.configService.products.apiKey;
    if (!isAuth) {
      throw new UnauthorizedException('NOT ALLOWED');
    }
    return isAuth;
  }
}
