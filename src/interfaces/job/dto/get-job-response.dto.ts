import { ApiProperty } from '@nestjs/swagger';
import { IJob } from '../job.interface';
import { Types } from 'mongoose';

export class GetJobResponseDto {
    @ApiProperty({ example: 'job_get_by_id_success' })
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
                posted_by: new Types.ObjectId('5d987c3bfb881ec86b476bcc'),
            }
        },
        nullable: true,
    })
    data: {
        job: IJob;
    };
    @ApiProperty({ example: null, nullable: true })
    errors: { [key: string]: any };
}