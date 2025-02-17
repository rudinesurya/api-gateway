import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ClientProxyFactory } from '@nestjs/microservices';
import { UsersController } from './users.controller';
import { ConfigService } from './services/config/config.service';

@Module({
    imports: [ConfigModule.forRoot()],
    controllers: [UsersController],
    providers: [
        ConfigService,
        {
            provide: 'TOKEN_SERVICE',
            useFactory: (configService: ConfigService) => {
                const tokenServiceOptions = configService.get('tokenService');
                return ClientProxyFactory.create(tokenServiceOptions);
            },
            inject: [ConfigService],
        },
        {
            provide: 'USER_SERVICE',
            useFactory: (configService: ConfigService) => {
                const userServiceOptions = configService.get('userService');
                return ClientProxyFactory.create(userServiceOptions);
            },
            inject: [ConfigService],
        },
    ],
})
export class AppModule { }