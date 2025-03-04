import { ApiProperty } from '@nestjs/swagger';
import { ILocation } from '@rudinesurya/jobs-service-interfaces';

export class UpdateJobDto {
    @ApiProperty({
        example: "Plumbing",
    })
    title: string;
    @ApiProperty({
        example: "asdasd",
    })
    description: string;
    @ApiProperty({
        example: {
            formatted_address: "",
            place_id: "",
            lat: 99,
            lng: 99,
        },
    })
    location: ILocation;
    @ApiProperty({
        example: 500,
    })
    salary: number;
}