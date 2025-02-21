import { IJob } from "./job.interface";

export interface IServiceJobsSearchResponse {
    status: number;
    message: string;
    jobs: IJob[] | null;
}