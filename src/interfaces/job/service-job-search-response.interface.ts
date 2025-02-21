import { IJob } from "./job.interface";

export interface IServiceJobSearchResponse {
    status: number;
    message: string;
    job: IJob | null;
    errors: { [key: string]: any };
}