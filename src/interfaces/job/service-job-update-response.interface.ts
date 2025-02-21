import { IJob } from "./job.interface";

export interface IServiceJobUpdateResponse {
    status: number;
    message: string;
    job: IJob | null;
    errors: { [key: string]: any };
}