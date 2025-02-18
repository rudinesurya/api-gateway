import { ApiProperty } from '@nestjs/swagger';
import { IUserRating } from '../user-rating.interface';
import { Types } from 'mongoose';

export class CreateUserRatingResponseDto {
    @ApiProperty({ example: 'user_rating_create_success' })
    message: string;
    @ApiProperty({
        example: {
            user_rating: {
                rater: new Types.ObjectId('5d987c3bfb881ec86b476bcc'),
                ratedUser: new Types.ObjectId('5d987c3bfb881ec86b476bcd'),
                rating: 5,
                comment: 'asdasd',
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