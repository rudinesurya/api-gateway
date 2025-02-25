import { IJob } from "./job.interface";

export interface IServiceJobsSearchResponse {
    status: number;
    system_message: string;
    jobs: IJob[] | null;
    errors: { [key: string]: any } | null;
}