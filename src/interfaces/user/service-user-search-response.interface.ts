import { IUser } from './user.interface';

export interface IServiceUserSearchResponse {
    status: number;
    system_message: string;
    user: IUser | null;
    errors: { [key: string]: any } | null;
}