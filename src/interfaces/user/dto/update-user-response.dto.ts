import { ApiProperty } from '@nestjs/swagger';
import { IUser } from '@rudinesurya/users-service-interfaces';
import { Types } from 'mongoose';

export class UpdateUserResponseDto {
    @ApiProperty({ example: 'user_update_success' })
    system_message: string;
    @ApiProperty({
        example: {
            user: {
                email: 'john@test.com',
                _id: new Types.ObjectId(),
                name: 'John',
                handle: 'thisjohn',
                bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                avatar_uri: 'https://example.atlassian.net/secure/projectavatar?pid=10000&avatarId=10409',
                theme: 'dark-theme'
            },
        },
        nullable: true,
    })
    data: {
        user: IUser;
    };
    @ApiProperty({ example: null, nullable: true })
    errors: { [key: string]: any } | null;
}