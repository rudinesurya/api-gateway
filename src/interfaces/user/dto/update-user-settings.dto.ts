import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserSettingsDto {
    @ApiProperty({
        required: false, example: 'dark-theme',
    })
    theme: string;
}