import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ClientProxyFactory } from '@nestjs/microservices';
import { UsersController } from './users.controller';
import { ConfigService } from './services/config/config.service';
import { UserRatingsController } from './user-ratings.controller';
import { JobsController } from './jobs.controller';

@Module({
    imports: [ConfigModule.forRoot()],
    controllers: [UsersController, UserRatingsController, JobsController],
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
            provide: 'USERS_SERVICE',
            useFactory: (configService: ConfigService) => {
                const usersServiceOptions = configService.get('usersService');
                return ClientProxyFactory.create(usersServiceOptions);
            },
            inject: [ConfigService],
        },
        {
            provide: 'USER_RATINGS_SERVICE',
            useFactory: (configService: ConfigService) => {
                const usersServiceOptions = configService.get('userRatingsService');
                return ClientProxyFactory.create(usersServiceOptions);
            },
            inject: [ConfigService],
        },
        {
            provide: 'JOBS_SERVICE',
            useFactory: (configService: ConfigService) => {
                const jobsServiceOptions = configService.get('jobsService');
                return ClientProxyFactory.create(jobsServiceOptions);
            },
            inject: [ConfigService],
        },
    ],
})
export class AppModule { }