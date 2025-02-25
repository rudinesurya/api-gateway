import { IUser } from "./user.interface";

export interface IServiceUserCreateResponse {
    status: number;
    system_message: string;
    user: IUser | null;
    errors: { [key: string]: any } | null;
}