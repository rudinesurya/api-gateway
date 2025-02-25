import { ApiProperty } from '@nestjs/swagger';

export class LogoutUserResponseDto {
    @ApiProperty({ example: 'token_destroy_success' })
    system_message: string;
    @ApiProperty({ example: null, nullable: true, type: 'null' })
    data: null;
    @ApiProperty({ example: null, nullable: true })
    errors: { [key: string]: any } | null;
}