import { ApiProperty } from '@nestjs/swagger';

export class UpdateMessageDto {
    @ApiProperty({
        example: "asdasd",
    })
    content: string;
}