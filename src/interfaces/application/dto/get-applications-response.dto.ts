import { ApiProperty } from '@nestjs/swagger';
import { IApplication } from '../application.interface';

export class GetApplicationsResponseDto {
    @ApiProperty({ example: 'applications_get_by_id_success' })
    system_message: string;
    @ApiProperty({
        example: {
            application: [],
        },
        nullable: true,
    })
    data: {
        applications: IApplication[];
    };
    @ApiProperty({ example: null, nullable: true })
    errors: { [key: string]: any } | null;
}