import { ApiProperty } from '@nestjs/swagger';

export class UpdateApplicationDto {
    @ApiProperty({
        example: "asdasd",
    })
    cover_letter: string;
}