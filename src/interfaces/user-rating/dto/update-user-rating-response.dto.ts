import { ApiProperty } from '@nestjs/swagger';
import { IUserRating } from '@rudinesurya/user-ratings-service-interfaces';

export class UpdateUserRatingResponseDto {
    @ApiProperty({ example: 'user_rating_update_success' })
    system_message: string;
    @ApiProperty({
        example: {
            user_rating: {
                rating: 4,
                comment: 'asdasdasdwqwe qweqwe',
            },
        },
        nullable: true,
    })
    data: {
        user_rating: IUserRating;
    };
    @ApiProperty({ example: null, nullable: true })
    errors: { [key: string]: any } | null;
}