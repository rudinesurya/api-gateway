import { ApiProperty } from '@nestjs/swagger';
import { ILocation } from '../location.interface';

export class CreateJobDto {
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
            formattedAddress: "",
            placeId: "",
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