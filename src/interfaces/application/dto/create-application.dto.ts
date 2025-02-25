import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class CreateApplicationDto {
    @ApiProperty({
        example: new Types.ObjectId(),
    })
    job: Types.ObjectId;
    @ApiProperty({
        example: "asdasd",
    })
    cover_letter: string;
}