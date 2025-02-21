export interface IServiceJobDeleteResponse {
    status: number;
    message: string;
    errors: { [key: string]: any };
}