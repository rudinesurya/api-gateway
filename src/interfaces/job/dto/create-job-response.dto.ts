import { ApiProperty } from '@nestjs/swagger';
import { IJob } from '@rudinesurya/jobs-service-interfaces';
import { Types } from 'mongoose';

export class CreateJobResponseDto {
    @ApiProperty({ example: 'job_create_success' })
    system_message: string;
    @ApiProperty({
        example: {
            job: {
                title: "Plumbing",
                description: "asdasd",
                location: {
                    formatted_address: "",
                    place_id: "",
                    lat: 99,
                    lng: 99,
                },
                salary: 999,
                posted_by: new Types.ObjectId(),
            },
        },
        nullable: true,
    })
    data: {
        job: IJob;
    };
    @ApiProperty({ example: null, nullable: true })
    errors: { [key: string]: any } | null;
}