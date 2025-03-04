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
import { GetUserByTokenResponseDto as GetUserResponseDto } from './interfaces/user/dto/get-user-by-token-response.dto';
import { CreateUserDto } from './interfaces/user/dto/create-user.dto';
import { CreateUserResponseDto } from './interfaces/user/dto/create-user-response.dto';
import { LoginUserDto } from './interfaces/user/dto/login-user.dto';
import { LoginUserResponseDto } from './interfaces/user/dto/login-user-response.dto';
import { LogoutUserResponseDto } from './interfaces/user/dto/logout-user-response.dto';
import { JwtAuthGuard } from './services/guards/jwt.guard';
import { UpdateUserResponseDto } from './interfaces/user/dto/update-user-response.dto';
import { UpdateUserProfileDto } from './interfaces/user/dto/update-user-profile.dto';
import { UpdateUserSettingsDto } from './interfaces/user/dto/update-user-settings.dto';
import { IUser, IUserCreateResponse, IUserSearchResponse, IUserUpdate, IUserUpdateResponse } from '@rudinesurya/users-service-interfaces';
import { ITokenCreateResponse, ITokenDestroyResponse } from '@rudinesurya/token-service-interfaces';

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
        const response: IUserSearchResponse = await firstValueFrom(
            this.usersServiceClient.send('user_get_by_id', { id: request.user._id }),
        );

        if (response.status !== HttpStatus.OK) {
            throw new HttpException(
                {
                    system_message: response.system_message,
                    data: null,
                    errors: response.errors,
                },
                response.status,
            );
        }

        return {
            system_message: response.system_message,
            data: {
                user: response.user,
            },
            errors: null,
        };
    }

    @Get('/handle/:handle')
    @ApiOkResponse({
        type: GetUserResponseDto,
    })
    public async getUserByHandle(
        @Param('handle') handle: string,
    ): Promise<GetUserResponseDto> {
        const response: IUserSearchResponse = await firstValueFrom(
            this.usersServiceClient.send('user_get_by_handle', { handle }),
        );

        if (response.status !== HttpStatus.OK) {
            throw new HttpException(
                {
                    system_message: response.system_message,
                    data: null,
                    errors: response.errors,
                },
                response.status,
            );
        }

        return {
            system_message: response.system_message,
            data: {
                user: response.user,
            },
            errors: null,
        };
    }

    @Post('/register')
    @ApiCreatedResponse({
        type: CreateUserResponseDto,
    })
    public async createUser(
        @Body() body: CreateUserDto,
    ): Promise<CreateUserResponseDto> {
        const createUserResponse: IUserCreateResponse = await firstValueFrom(
            this.usersServiceClient.send('user_create', { createData: body }),
        );
        if (createUserResponse.status !== HttpStatus.CREATED) {
            throw new HttpException(
                {
                    system_message: createUserResponse.system_message,
                    data: null,
                    errors: createUserResponse.errors,
                },
                createUserResponse.status,
            );
        }

        const createTokenResponse: ITokenCreateResponse = await firstValueFrom(
            this.tokenServiceClient.send('token_create', {
                userId: createUserResponse.user._id,
            }),
        );

        return {
            system_message: createUserResponse.system_message,
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
        @Body() body: LoginUserDto,
    ): Promise<LoginUserResponseDto> {
        const getUserResponse: IUserSearchResponse = await firstValueFrom(
            this.usersServiceClient.send('user_search_by_credentials', { email: body.email, password: body.password }),
        );

        if (getUserResponse.status !== HttpStatus.OK) {
            throw new HttpException(
                {
                    system_message: getUserResponse.system_message,
                    data: null,
                    errors: null,
                },
                HttpStatus.UNAUTHORIZED,
            );
        }

        const createTokenResponse: ITokenCreateResponse = await firstValueFrom(
            this.tokenServiceClient.send('token_create', {
                userId: getUserResponse.user._id,
            }),
        );

        return {
            system_message: createTokenResponse.system_message,
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

        const destroyTokenResponse: ITokenDestroyResponse = await firstValueFrom(
            this.tokenServiceClient.send('token_destroy', {
                userId: userInfo._id,
            }),
        );

        if (destroyTokenResponse.status !== HttpStatus.OK) {
            throw new HttpException(
                {
                    system_message: destroyTokenResponse.system_message,
                    data: null,
                    errors: destroyTokenResponse.errors,
                },
                destroyTokenResponse.status,
            );
        }

        return {
            system_message: destroyTokenResponse.system_message,
            errors: null,
            data: null,
        };
    }

    @Put('/settings')
    @ApiBearerAuth('JWT-auth')
    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({
        type: UpdateUserResponseDto,
    })
    public async updateUserSettings(
        @Req() request: IAuthorizedRequest,
        @Body() body: UpdateUserSettingsDto,
    ): Promise<UpdateUserResponseDto> {
        const response: IUserUpdateResponse = await firstValueFrom(
            this.usersServiceClient.send('user_update', { id: request.user._id, updateData: body }),
        );
        if (response.status !== HttpStatus.OK) {
            throw new HttpException(
                {
                    system_message: response.system_message,
                    data: null,
                    errors: response.errors,
                },
                response.status,
            );
        }

        return {
            system_message: response.system_message,
            data: {
                user: response.user,
            },
            errors: null,
        };
    }

    @Put('/profile')
    @ApiBearerAuth('JWT-auth')
    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({
        type: UpdateUserResponseDto,
    })
    public async updateUserProfile(
        @Req() request: IAuthorizedRequest,
        @Body() body: UpdateUserProfileDto,
    ): Promise<UpdateUserResponseDto> {
        const response: IUserUpdateResponse = await firstValueFrom(
            this.usersServiceClient.send('user_update', { id: request.user._id, updateData: body }),
        );
        if (response.status !== HttpStatus.OK) {
            throw new HttpException(
                {
                    system_message: response.system_message,
                    data: null,
                    errors: response.errors,
                },
                response.status,
            );
        }

        return {
            system_message: response.system_message,
            data: {
                user: response.user,
            },
            errors: null,
        };
    }
}