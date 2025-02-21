import { Transport } from '@nestjs/microservices';

export class ConfigService {
    private readonly envConfig: { [key: string]: any } = null;

    constructor() {
        this.envConfig = {};
        this.envConfig.port = process.env.API_GATEWAY_PORT;
        this.envConfig.tokenService = {
            options: {
                port: process.env.TOKEN_SERVICE_PORT,
                host: process.env.TOKEN_SERVICE_HOST,
            },
            transport: Transport.TCP,
        };
        this.envConfig.usersService = {
            options: {
                port: process.env.USERS_SERVICE_PORT,
                host: process.env.USERS_SERVICE_HOST,
            },
            transport: Transport.TCP,
        };
        this.envConfig.userRatingsService = {
            options: {
                port: process.env.USER_RATINGS_SERVICE_PORT,
                host: process.env.USER_RATINGS_SERVICE_HOST,
            },
            transport: Transport.TCP,
        };
        this.envConfig.jobsService = {
            options: {
                port: process.env.JOBS_SERVICE_PORT,
                host: process.env.JOBS_SERVICE_HOST,
            },
            transport: Transport.TCP,
        };
    }

    get(key: string): any {
        return this.envConfig[key];
    }
}