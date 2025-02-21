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
                    formattedAddress: "",
                    placeId: "",
                    lat: 99,
                    lng: 99,
                },
                salary: 999,
                postedBy: new Types.ObjectId('5d987c3bfb881ec86b476bcc'),
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