import { IApplication } from "./application.interface";

export interface IServiceApplicationCreateResponse {
    status: number;
    system_message: string;
    application: IApplication | null;
    errors: { [key: string]: any };
}