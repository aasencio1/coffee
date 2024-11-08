import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from 'src/decorators/public.decorator';
// import { SetMetadata } from '@nestjs/common';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly configService: ConfigService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler());  //READ ABOUT Reflector
    if (isPublic) {   //Skip the validation because the route is public. the methos is enable for public
      return true;
    }
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.header('Authorization');  //requiere auhorization  
    //return authHeader === process.env.API_KEY; //false  //change by false and test through insomnia // you will see forbidden.
    return authHeader === this.configService.get('API_KEY');
  }
}
