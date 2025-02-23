import { IApplication } from "./application.interface";

export interface IServiceApplicationSearchResponse {
    status: number;
    system_message: string;
    application: IApplication | null;
    errors: { [key: string]: any };
}