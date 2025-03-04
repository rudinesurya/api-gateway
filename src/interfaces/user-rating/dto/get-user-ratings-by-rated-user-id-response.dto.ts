import { ApiProperty } from '@nestjs/swagger';
import { IUserRating } from '@rudinesurya/user-ratings-service-interfaces';

export class GetUserRatingsByRatedUserIdResponseDto {
    @ApiProperty({ example: 'user_ratings_get_by_rated_user_id_success' })
    system_message: string;
    @ApiProperty({
        example: {
            user_ratings: []
        },
        nullable: true,
    })
    data: {
        user_ratings: IUserRating[];
    };
    @ApiProperty({ example: null, nullable: true })
    errors: { [key: string]: any } | null;
}