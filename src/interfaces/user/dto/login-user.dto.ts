import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
    @ApiProperty({ example: 'john@test.com' })
    email: string;
    @ApiProperty({ example: '123456' })
    password: string;
}