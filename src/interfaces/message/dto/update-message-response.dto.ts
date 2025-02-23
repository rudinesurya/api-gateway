import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { IMessage } from '../message.interface';

export class UpdateMessageResponseDto {
    @ApiProperty({ example: 'message_update_success' })
    message: string;
    @ApiProperty({
        example: {
            message: {
                sender: new Types.ObjectId(),
                recipient: new Types.ObjectId(),
                content: "asd",
            },
        },
        nullable: true,
    })
    data: {
        message: IMessage;
    };
    @ApiProperty({ example: null, nullable: true })
    errors: { [key: string]: any };
}