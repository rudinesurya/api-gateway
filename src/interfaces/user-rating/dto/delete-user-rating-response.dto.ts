import { ApiProperty } from '@nestjs/swagger';

export class DeleteUserRatingResponseDto {
    @ApiProperty({ example: 'user_rating_delete_by_id_success' })
    message: string;
    @ApiProperty({ example: null, nullable: true, type: 'null' })
    data: null;
    @ApiProperty({ example: null, nullable: true })
    errors: { [key: string]: any };
}