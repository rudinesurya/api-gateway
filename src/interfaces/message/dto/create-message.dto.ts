import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class CreateMessageDto {
    @ApiProperty({
        example: new Types.ObjectId('5d987c3bfb881ec86b476bcc'),
    })
    sender: Types.ObjectId;
    @ApiProperty({
        example: new Types.ObjectId('5d987c3bfb881ec86b476bcc'),
    })
    recipient: Types.ObjectId;
    @ApiProperty({
        example: "asdasd",
    })
    content: string;
}