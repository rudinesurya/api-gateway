import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientProxyFactory } from '@nestjs/microservices';
import { UsersController } from './users.controller';
import { ConfigService } from './services/config/config.service';
import { UserRatingsController } from './user-ratings.controller';
import { JobsController } from './jobs.controller';
import { ApplicationsController } from './applications.controller';
import { MessagesController } from './messages.controller';

@Module({
    imports: [ConfigModule.forRoot()],
    controllers: [UsersController, UserRatingsController, JobsController, ApplicationsController, MessagesController],
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
        {
            provide: 'APPLICATIONS_SERVICE',
            useFactory: (configService: ConfigService) => {
                const applicationsServiceOptions = configService.get('applicationsService');
                return ClientProxyFactory.create(applicationsServiceOptions);
            },
            inject: [ConfigService],
        },
        {
            provide: 'MESSAGES_SERVICE',
            useFactory: (configService: ConfigService) => {
                const messagesServiceOptions = configService.get('messagesService');
                return ClientProxyFactory.create(messagesServiceOptions);
            },
            inject: [ConfigService],
        },
    ],
})
export class AppModule { }