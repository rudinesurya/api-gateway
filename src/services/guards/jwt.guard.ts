import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, Inject, HttpException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Request } from 'express';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    @Inject('TOKEN_SERVICE') private readonly tokenServiceClient: ClientProxy,
    @Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Authorization token is required');
    }

    const userTokenInfo = await firstValueFrom(
      this.tokenServiceClient.send('token_decode', {
        token,
      }),
    );

    if (!userTokenInfo || !userTokenInfo.data) {
      throw new HttpException(
        {
          message: userTokenInfo.message,
          data: null,
          errors: null,
        },
        userTokenInfo.status,
      );
    }

    const userInfo = await firstValueFrom(
      this.userServiceClient.send('user_get_by_id', userTokenInfo.data.userId),
    );

    request.user = userInfo.user;
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}