import { ApiProperty } from '@nestjs/swagger';
import { IMessage } from '../message.interface';

export class GetMessagesResponseDto {
    @ApiProperty({ example: 'messages_get_success' })
    system_message: string;
    @ApiProperty({
        example: {
            messages: []
        },
        nullable: true,
    })
    data: {
        messages: IMessage[];
    };
    @ApiProperty({ example: null, nullable: true })
    errors: { [key: string]: any } | null;
}