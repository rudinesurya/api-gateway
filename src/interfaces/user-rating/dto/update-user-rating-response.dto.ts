import { ApiProperty } from '@nestjs/swagger';
import { IUserRating } from '../user-rating.interface';

export class UpdateUserRatingResponseDto {
    @ApiProperty({ example: 'user_rating_update_success' })
    message: string;
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
    errors: { [key: string]: any };
}