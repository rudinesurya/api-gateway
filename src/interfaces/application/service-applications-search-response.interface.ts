import { IApplication } from "./application.interface";

export interface IServiceApplicationsSearchResponse {
    status: number;
    system_message: string;
    applications: IApplication[];
    errors: { [key: string]: any } | null;
}