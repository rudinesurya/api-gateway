export interface IUser {
    id: string;
    email: string;
    // User Profile
    name?: string;
    handle?: string;
    bio?: string;
    avatar_uri?: string;

    // User Settings
    theme?: string;
}