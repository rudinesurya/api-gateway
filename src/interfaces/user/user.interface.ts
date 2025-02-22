import { Document } from 'mongoose';

export interface IUser extends Document {
    email: string;
    // User Profile
    name?: string;
    handle?: string;
    bio?: string;
    avatar_uri?: string;

    // User Settings
    theme?: string;
}