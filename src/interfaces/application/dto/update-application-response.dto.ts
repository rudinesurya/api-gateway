import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { IApplication } from '../application.interface';

export class UpdateApplicationResponseDto {
    @ApiProperty({ example: 'application_create_success' })
    message: string;
    @ApiProperty({
        example: {
            application: {
                job: new Types.ObjectId(),
                applicant: new Types.ObjectId(),
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