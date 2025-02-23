import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { IApplication } from '../application.interface';

export class GetApplicationResponseDto {
    @ApiProperty({ example: 'application_get_by_id_success' })
    message: string;
    @ApiProperty({
        example: {
            application: {
                job: new Types.ObjectId('5d987c3bfb881ec86b476bcc'),
                applicant: new Types.ObjectId('5d987c3bfb881ec86b476bcc'),
                cover_letter: "Plumbing",
            },
        },
        nullable: true,
    })
    data: {
        application: IApplication;
    };
    @ApiProperty({ example: null, nullable: true })
    errors: { [key: string]: any };
}