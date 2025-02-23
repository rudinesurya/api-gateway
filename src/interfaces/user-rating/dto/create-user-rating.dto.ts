import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class CreateUserRatingDto {
    @ApiProperty({
        example: new Types.ObjectId(),
    })
    rated_user: Types.ObjectId;
    @ApiProperty({
        example: 5,
    })
    rating: number;
    @ApiProperty({
        example: 'asdasdda',
    })
    comment: string;
}