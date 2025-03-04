import { Body, Controller, Delete, Get, HttpException, HttpStatus, Inject, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { firstValueFrom } from "rxjs";
import { GetUserRatingsByRatedUserIdResponseDto } from "./interfaces/user-rating/dto/get-user-ratings-by-rated-user-id-response.dto";
import { CreateUserRatingResponseDto } from "./interfaces/user-rating/dto/create-user-rating-response.dto";
import { CreateUserRatingDto } from "./interfaces/user-rating/dto/create-user-rating.dto";
import { JwtAuthGuard } from "./services/guards/jwt.guard";
import { IAuthorizedRequest } from "./interfaces/common/authorized-request.interface";
import { UpdateUserRatingResponseDto } from "./interfaces/user-rating/dto/update-user-rating-response.dto";
import { UpdateUserRatingDto } from "./interfaces/user-rating/dto/update-user-rating.dto";
import { DeleteUserRatingResponseDto } from "./interfaces/user-rating/dto/delete-user-rating-response.dto";
import { IUserRatingsSearchResponse, IUserRatingCreateResponse, IUserRatingUpdateResponse, IUserRatingDeleteResponse } from "@rudinesurya/user-ratings-service-interfaces";

@Controller('user_ratings')
@ApiTags('user_ratings')
export class UserRatingsController {
    constructor(
        @Inject('USER_RATINGS_SERVICE') private readonly userRatingsServiceClient: ClientProxy,
    ) { }

    @Get('/user/:id')
    @ApiOkResponse({
        type: GetUserRatingsByRatedUserIdResponseDto,
    })
    public async getUserRatingsByRatedUserId(
        @Param('id') id: string,
    ): Promise<GetUserRatingsByRatedUserIdResponseDto> {
        const response: IUserRatingsSearchResponse = await firstValueFrom(
            this.userRatingsServiceClient.send('user_ratings_get_by_rated_user_id', { ratedUserId: id }),
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
                user_ratings: response.user_ratings,
            },
            errors: null,
        };
    }

    @Post()
    @ApiBearerAuth('JWT-auth')
    @UseGuards(JwtAuthGuard)
    @ApiCreatedResponse({
        type: CreateUserRatingResponseDto,
    })
    public async createUserRating(
        @Req() request: IAuthorizedRequest,
        @Body() body: CreateUserRatingDto,
    ): Promise<CreateUserRatingResponseDto> {
        const response: IUserRatingCreateResponse = await firstValueFrom(
            this.userRatingsServiceClient.send('user_rating_create', { createData: { rater: request.user._id, ...body } }),
        );

        if (response.status !== HttpStatus.CREATED) {
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
                user_rating: response.user_rating,
            },
            errors: null,
        };
    }

    @Put('/:id')
    @ApiBearerAuth('JWT-auth')
    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({
        type: UpdateUserRatingResponseDto,
    })
    public async updateUserRating(
        @Param('id') id: string,
        @Req() request: IAuthorizedRequest,
        @Body() body: UpdateUserRatingDto,
    ): Promise<UpdateUserRatingResponseDto> {
        const response: IUserRatingUpdateResponse = await firstValueFrom(
            this.userRatingsServiceClient.send('user_rating_update', { ratingId: id, raterId: request.user._id, updateData: body }),
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
                user_rating: response.user_rating,
            },
            errors: null,
        };
    }

    @Delete('/:id')
    @ApiBearerAuth('JWT-auth')
    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({
        type: DeleteUserRatingResponseDto,
    })
    public async deleteUserRating(
        @Param('id') id: string,
        @Req() request: IAuthorizedRequest,
    ): Promise<DeleteUserRatingResponseDto> {
        const response: IUserRatingDeleteResponse = await firstValueFrom(
            this.userRatingsServiceClient.send('user_rating_delete_by_id', {
                ratingId: id,
                raterId: request.user._id,
            }),
        );

        if (response.status !== HttpStatus.OK) {
            throw new HttpException(
                {
                    system_message: response.system_message,
                    errors: response.errors,
                    data: null,
                },
                response.status,
            );
        }

        return {
            system_message: response.system_message,
            data: null,
            errors: null,
        };
    }
}