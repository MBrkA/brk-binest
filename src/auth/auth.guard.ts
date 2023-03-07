import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly API_KEY: string;
  constructor(private readonly configService: ConfigService) {
    this.API_KEY = configService.get('API_KEY');
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return request.headers['x-api-key'] === this.API_KEY;
  }
}
