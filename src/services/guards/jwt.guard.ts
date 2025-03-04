import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, Inject, HttpException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import logger from '@rudinesurya/logger';
import { Request } from 'express';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    @Inject('TOKEN_SERVICE') private readonly tokenServiceClient: ClientProxy,
    @Inject('USERS_SERVICE') private readonly usersServiceClient: ClientProxy,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      logger.warn('Authorization token is missing in request header');
      throw new UnauthorizedException('Authorization token is required');
    }

    logger.info('Authorization token found, decoding token...');
    let userTokenInfo;
    try {
      userTokenInfo = await firstValueFrom(
        this.tokenServiceClient.send('token_decode', { token }),
      );
    } catch (error) {
      logger.error('Error occurred while decoding token', { error: error.message, stack: error.stack });
      throw new UnauthorizedException('Invalid or expired token');
    }

    if (!userTokenInfo || !userTokenInfo.data) {
      logger.warn('Token decoding failed or token data is missing');
      throw new HttpException(
        {
          message: userTokenInfo.message,
          data: null,
          errors: null,
        },
        userTokenInfo.status,
      );
    }

    logger.info(`Decoded token successfully, fetching user info for user_id: ${userTokenInfo.data.user_id}`);
    let userInfo;
    try {
      userInfo = await firstValueFrom(
        this.usersServiceClient.send('user_get_by_id', { id: userTokenInfo.data.user_id }),
      );
    } catch (error) {
      logger.error('Error occurred while fetching user info', { error: error.message, stack: error.stack });
      throw new HttpException('User not found', 404);
    }

    if (!userInfo || !userInfo.user) {
      logger.warn(`No user found with user_id: ${userTokenInfo.data.user_id}`);
      throw new UnauthorizedException('User not authorized');
    }

    logger.info(`User info successfully fetched for user_id: ${userTokenInfo.data.user_id}`);
    request.user = userInfo.user;

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    if (type !== 'Bearer') {
      logger.warn('Authorization type is not Bearer');
      return undefined;
    }
    return token;
  }
}