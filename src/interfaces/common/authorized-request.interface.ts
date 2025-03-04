import { IUser } from "@rudinesurya/users-service-interfaces";

export interface IAuthorizedRequest extends Request {
    user?: IUser;
}