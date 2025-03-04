import { ApiProperty } from '@nestjs/swagger';
import { IJob } from '@rudinesurya/jobs-service-interfaces';

export class GetJobsResponseDto {
    @ApiProperty({ example: 'jobs_get_success' })
    system_message: string;
    @ApiProperty({
        example: {
            jobs: []
        },
        nullable: true,
    })
    data: {
        jobs: IJob[];
    };
    @ApiProperty({ example: null, nullable: true })
    errors: { [key: string]: any } | null;
}