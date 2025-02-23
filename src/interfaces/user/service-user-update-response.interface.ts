import { IUser } from "./user.interface";

export interface IServiceUserUpdateResponse {
    status: number;
    system_message: string;
    user: IUser | null;
    errors: { [key: string]: any };
}