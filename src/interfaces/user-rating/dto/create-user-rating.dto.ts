import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class CreateUserRatingDto {
    @ApiProperty({
        example: new Types.ObjectId('5d987c3bfb881ec86b476bcc'),
    })
    ratedUser: Types.ObjectId;
    @ApiProperty({
        example: 5,
    })
    rating: number;
    @ApiProperty({
        example: 'asdasdda',
    })
    comment: string;
}