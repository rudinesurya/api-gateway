import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserRatingDto {
    @ApiProperty({
        required: false, example: 4,
    })
    rating: number;
    @ApiProperty({
        required: false, example: 'asdasdasdwqwe qweqwe',
    })
    comment: string;
}