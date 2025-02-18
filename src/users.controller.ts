import {
    Controller,
    Post,
    Put,
    Get,
    Body,
    Req,
    Inject,
    HttpStatus,
    HttpException,
    Param,
    UseGuards,
} from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags, ApiOkResponse, ApiCreatedResponse, ApiBearerAuth } from '@nestjs/swagger';

import { IAuthorizedRequest } from './interfaces/common/authorized-request.interface';
import { IServiceUserCreateResponse } from './interfaces/user/service-user-create-response.interface';
import { IServiceUserSearchResponse } from './interfaces/user/service-user-search-response.interface';
import { IServiceTokenCreateResponse } from './interfaces/token/service-token-create-response.interface';
import { IServiceTokenDestroyResponse } from './interfaces/token/service-token-destroy-response.interface';

import { GetUserByTokenResponseDto as GetUserResponseDto } from './interfaces/user/dto/get-user-by-token-response.dto';
import { CreateUserDto } from './interfaces/user/dto/create-user.dto';
import { CreateUserResponseDto } from './interfaces/user/dto/create-user-response.dto';
import { LoginUserDto } from './interfaces/user/dto/login-user.dto';
import { LoginUserResponseDto } from './interfaces/user/dto/login-user-response.dto';
import { LogoutUserResponseDto } from './interfaces/user/dto/logout-user-response.dto';
import { JwtAuthGuard } from './services/guards/jwt.guard';
import { UpdateUserResponseDto } from './interfaces/user/dto/update-user-response.dto';
import { IServiceUserUpdateResponse } from './interfaces/user/service-user-update-response.interface';
import { UpdateUserDto } from './interfaces/user/dto/update-user.dto';

@Controller('users')
@ApiTags('users')
export class UsersController {
    constructor(
        @Inject('TOKEN_SERVICE') private readonly tokenServiceClient: ClientProxy,
        @Inject('USERS_SERVICE') private readonly usersServiceClient: ClientProxy,
    ) { }

    @Get()
    @ApiBearerAuth('JWT-auth')
    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({
        type: GetUserResponseDto,
    })
    public async getUserByToken(
        @Req() request: IAuthorizedRequest,
    ): Promise<GetUserResponseDto> {
        const userInfo = request.user;

        const userResponse: IServiceUserSearchResponse = await firstValueFrom(
            this.usersServiceClient.send('user_get_by_id', userInfo.id),
        );

        return {
            message: userResponse.message,
            data: {
                user: userResponse.user,
            },
            errors: null,
        };
    }

    @Post('/register')
    @ApiCreatedResponse({
        type: CreateUserResponseDto,
    })
    public async createUser(
        @Body() userRequest: CreateUserDto,
    ): Promise<CreateUserResponseDto> {
        const createUserResponse: IServiceUserCreateResponse = await firstValueFrom(
            this.usersServiceClient.send('user_create', userRequest),
        );
        if (createUserResponse.status !== HttpStatus.CREATED) {
            throw new HttpException(
                {
                    message: createUserResponse.message,
                    data: null,
                    errors: createUserResponse.errors,
                },
                createUserResponse.status,
            );
        }

        const createTokenResponse: IServiceTokenCreateResponse = await firstValueFrom(
            this.tokenServiceClient.send('token_create', {
                userId: createUserResponse.user.id,
            }),
        );

        return {
            message: createUserResponse.message,
            data: {
                user: createUserResponse.user,
                token: createTokenResponse.token,
            },
            errors: null,
        };
    }

    @Post('/login')
    @ApiCreatedResponse({
        type: LoginUserResponseDto,
    })
    public async loginUser(
        @Body() loginRequest: LoginUserDto,
    ): Promise<LoginUserResponseDto> {
        const getUserResponse: IServiceUserSearchResponse = await firstValueFrom(
            this.usersServiceClient.send('user_search_by_credentials', loginRequest),
        );

        if (getUserResponse.status !== HttpStatus.OK) {
            throw new HttpException(
                {
                    message: getUserResponse.message,
                    data: null,
                    errors: null,
                },
                HttpStatus.UNAUTHORIZED,
            );
        }

        const createTokenResponse: IServiceTokenCreateResponse = await firstValueFrom(
            this.tokenServiceClient.send('token_create', {
                userId: getUserResponse.user.id,
            }),
        );

        return {
            message: createTokenResponse.message,
            data: {
                token: createTokenResponse.token,
            },
            errors: null,
        };
    }

    @Put('/logout')
    @ApiBearerAuth('JWT-auth')
    @UseGuards(JwtAuthGuard)
    @ApiCreatedResponse({
        type: LogoutUserResponseDto,
    })
    public async logoutUser(
        @Req() request: IAuthorizedRequest,
    ): Promise<LogoutUserResponseDto> {
        const userInfo = request.user;

        const destroyTokenResponse: IServiceTokenDestroyResponse = await firstValueFrom(
            this.tokenServiceClient.send('token_destroy', {
                userId: userInfo.id,
            }),
        );

        if (destroyTokenResponse.status !== HttpStatus.OK) {
            throw new HttpException(
                {
                    message: destroyTokenResponse.message,
                    data: null,
                    errors: destroyTokenResponse.errors,
                },
                destroyTokenResponse.status,
            );
        }

        return {
            message: destroyTokenResponse.message,
            errors: null,
            data: null,
        };
    }

    @Put()
    @ApiBearerAuth('JWT-auth')
    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({
        type: UpdateUserResponseDto,
    })
    public async updateUser(
        @Req() request: IAuthorizedRequest,
        @Body() updateData: UpdateUserDto,
    ): Promise<UpdateUserResponseDto> {
        const updateUserResponse: IServiceUserUpdateResponse = await firstValueFrom(
            this.usersServiceClient.send('user_update', { id: request.user.id, updateData }),
        );
        if (updateUserResponse.status !== HttpStatus.OK) {
            throw new HttpException(
                {
                    message: updateUserResponse.message,
                    data: null,
                    errors: updateUserResponse.errors,
                },
                updateUserResponse.status,
            );
        }

        return {
            message: updateUserResponse.message,
            data: {
                user: updateUserResponse.user,
            },
            errors: null,
        };
    }
}