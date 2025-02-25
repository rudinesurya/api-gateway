import { IJob } from "./job.interface";

export interface IServiceJobSearchResponse {
    status: number;
    system_message: string;
    job: IJob | null;
    errors: { [key: string]: any } | null;
}