import { ApiProperty } from '@nestjs/swagger';
import { IMessage } from '@rudinesurya/messages-service-interfaces';
import { Types } from 'mongoose';

export class UpdateMessageResponseDto {
    @ApiProperty({ example: 'message_update_success' })
    system_message: string;
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
    errors: { [key: string]: any } | null;
}