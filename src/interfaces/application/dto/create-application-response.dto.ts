import { ApiProperty } from '@nestjs/swagger';
import { IApplication } from '@rudinesurya/applications-service-interfaces';
import { Types } from 'mongoose';

export class CreateApplicationResponseDto {
    @ApiProperty({ example: 'application_create_success' })
    system_message: string;
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
    errors: { [key: string]: any } | null;
}