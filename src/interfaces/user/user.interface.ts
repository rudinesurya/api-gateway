export interface IUser {
    id: string;
    email: string;
    // User Profile
    name?: string;
    handle?: string;
    bio?: string;
    avatarUri?: string;

    // User Settings
    theme?: string;
}