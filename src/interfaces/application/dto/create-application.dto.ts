import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class CreateApplicationDto {
    @ApiProperty({
        example: new Types.ObjectId('5d987c3bfb881ec86b476bcc'),
    })
    job: Types.ObjectId;
    @ApiProperty({
        example: new Types.ObjectId('5d987c3bfb881ec86b476bcc'),
    })
    applicant: Types.ObjectId;
    @ApiProperty({
        example: "asdasd",
    })
    cover_letter: string;
}