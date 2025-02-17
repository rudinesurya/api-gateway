import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({
        uniqueItems: true,
        example: 'john@test.com',
    })
    email: string;
    @ApiProperty({
        minLength: 6,
        example: '123456',
    })
    password: string;
}