import { IJob } from "./job.interface";

export interface IServiceJobCreateResponse {
    status: number;
    message: string;
    job: IJob | null;
    errors: { [key: string]: any };
}