import { IApplication } from "./application.interface";

export interface IServiceApplicationCreateResponse {
    status: number;
    message: string;
    application: IApplication | null;
    errors: { [key: string]: any };
}