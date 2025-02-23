import { IApplication } from "./application.interface";

export interface IServiceApplicationUpdateResponse {
    status: number;
    message: string;
    application: IApplication | null;
    errors: { [key: string]: any };
}