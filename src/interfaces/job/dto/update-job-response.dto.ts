import { ApiProperty } from '@nestjs/swagger';
import { IJob } from '../job.interface';
import { Types } from 'mongoose';

export class UpdateJobResponseDto {
    @ApiProperty({ example: 'job_update_success' })
    message: string;
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
    errors: { [key: string]: any };
}