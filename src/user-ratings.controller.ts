import { Body, Controller, Delete, Get, HttpException, HttpStatus, Inject, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { firstValueFrom } from "rxjs";
import { GetUserRatingsByRatedUserIdResponseDto } from "./interfaces/user-rating/dto/get-user-ratings-by-rated-user-id-response.dto";
import { IServiceUserRatingsSearchResponse } from "./interfaces/user-rating/service-user-ratings-search-response.interface";
import { CreateUserRatingResponseDto } from "./interfaces/user-rating/dto/create-user-rating-response.dto";
import { CreateUserRatingDto } from "./interfaces/user-rating/dto/create-user-rating.dto";
import { IServiceUserRatingCreateResponse } from "./interfaces/user-rating/service-user-rating-create-response.interface";
import { JwtAuthGuard } from "./services/guards/jwt.guard";
import { IAuthorizedRequest } from "./interfaces/common/authorized-request.interface";
import { UpdateUserRatingResponseDto } from "./interfaces/user-rating/dto/update-user-rating-response.dto";
import { UpdateUserRatingDto } from "./interfaces/user-rating/dto/update-user-rating.dto";
import { IServiceUserRatingUpdateResponse } from "./interfaces/user-rating/service-user-rating-update-response.interface";
import { DeleteUserRatingResponseDto } from "./interfaces/user-rating/dto/delete-user-rating-response.dto";
import { IServiceUserRatingDeleteResponse } from "./interfaces/user-rating/service-user-rating-delete-response.interface";

@Controller('user_ratings')
@ApiTags('user_ratings')
export class UserRatingsController {
    constructor(
        @Inject('USER_RATINGS_SERVICE') private readonly userRatingsServiceClient: ClientProxy,
    ) { }

    @Get('/user/:ratedUserId')
    @ApiOkResponse({
        type: GetUserRatingsByRatedUserIdResponseDto,
    })
    public async getUserRatingsByRatedUserId(
        @Param('ratedUserId') ratedUserId: string,
    ): Promise<GetUserRatingsByRatedUserIdResponseDto> {
        const userResponse: IServiceUserRatingsSearchResponse = await firstValueFrom(
            this.userRatingsServiceClient.send('user_ratings_get_by_rated_user_id', ratedUserId),
        );

        return {
            message: userResponse.message,
            data: {
                user_ratings: userResponse.user_ratings,
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
        @Body() userRatingParams: CreateUserRatingDto,
    ): Promise<CreateUserRatingResponseDto> {
        const createUserRatingResponse: IServiceUserRatingCreateResponse = await firstValueFrom(
            this.userRatingsServiceClient.send('user_rating_create', { rater: request.user.id, ...userRatingParams }),
        );
        if (createUserRatingResponse.status !== HttpStatus.CREATED) {
            throw new HttpException(
                {
                    message: createUserRatingResponse.message,
                    data: null,
                    errors: createUserRatingResponse.errors,
                },
                createUserRatingResponse.status,
            );
        }

        return {
            message: createUserRatingResponse.message,
            data: {
                user_rating: createUserRatingResponse.user_rating,
            },
            errors: null,
        };
    }

    @Put('/:ratingId')
    @ApiBearerAuth('JWT-auth')
    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({
        type: UpdateUserRatingResponseDto,
    })
    public async updateUserRating(
        @Param('ratingId') ratingId: string,
        @Req() request: IAuthorizedRequest,
        @Body() updateData: UpdateUserRatingDto,
    ): Promise<UpdateUserRatingResponseDto> {
        const updateUserRatingResponse: IServiceUserRatingUpdateResponse = await firstValueFrom(
            this.userRatingsServiceClient.send('user_rating_update', { ratingId, raterId: request.user.id, updateData }),
        );
        if (updateUserRatingResponse.status !== HttpStatus.OK) {
            throw new HttpException(
                {
                    message: updateUserRatingResponse.message,
                    data: null,
                    errors: updateUserRatingResponse.errors,
                },
                updateUserRatingResponse.status,
            );
        }

        return {
            message: updateUserRatingResponse.message,
            data: {
                user_rating: updateUserRatingResponse.user_rating,
            },
            errors: null,
        };
    }

    @Delete('/:ratingId')
    @ApiBearerAuth('JWT-auth')
    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({
        type: DeleteUserRatingResponseDto,
    })
    public async deleteUserRating(
        @Param('ratingId') ratingId: string,
        @Req() request: IAuthorizedRequest,
    ): Promise<DeleteUserRatingResponseDto> {
        const deleteUserRatingResponse: IServiceUserRatingDeleteResponse = await firstValueFrom(
            this.userRatingsServiceClient.send('user_rating_delete_by_id', {
                ratingId,
                raterId: request.user.id,
            }),
        );

        if (deleteUserRatingResponse.status !== HttpStatus.OK) {
            throw new HttpException(
                {
                    message: deleteUserRatingResponse.message,
                    errors: deleteUserRatingResponse.errors,
                    data: null,
                },
                deleteUserRatingResponse.status,
            );
        }

        return {
            message: deleteUserRatingResponse.message,
            data: null,
            errors: null,
        };
    }
}