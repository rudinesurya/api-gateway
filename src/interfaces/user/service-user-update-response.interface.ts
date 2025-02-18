import { IUser } from "./user.interface";

export interface IServiceUserUpdateResponse {
    status: number;
    message: string;
    user: IUser | null;
    errors: { [key: string]: any };
}