import { Body, Controller, Get, HttpException, HttpStatus, Inject, Param, Post, Req, UseGuards } from "@nestjs/common";
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
        const userInfo = request.user;
        const createUserRatingResponse: IServiceUserRatingCreateResponse = await firstValueFrom(
            this.userRatingsServiceClient.send('user_rating_create', { rater: userInfo.id, ...userRatingParams }),
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
}