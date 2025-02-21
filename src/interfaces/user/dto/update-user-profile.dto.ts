import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserProfileDto {
    @ApiProperty({
        required: false, example: 'John',
    })
    name: string;
    @ApiProperty({
        required: false, example: 'thisjohn',
    })
    handle: string;
    @ApiProperty({
        required: false, example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    })
    bio: string;
    @ApiProperty({
        required: false, example: 'https://example.atlassian.net/secure/projectavatar?pid=10000&avatarId=10409',
    })
    avatar_uri: string;
}