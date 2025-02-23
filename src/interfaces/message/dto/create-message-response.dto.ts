import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { IMessage } from '../message.interface';

export class CreateMessageResponseDto {
    @ApiProperty({ example: 'message_create_success' })
    message: string;
    @ApiProperty({
        example: {
            application: {
                sender: new Types.ObjectId('5d987c3bfb881ec86b476bcc'),
                recipient: new Types.ObjectId('5d987c3bfb881ec86b476bcc'),
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