import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class CreateMessageDto {
    @ApiProperty({
        example: new Types.ObjectId(),
    })
    recipient: Types.ObjectId;
    @ApiProperty({
        example: "asdasd",
    })
    content: string;
}