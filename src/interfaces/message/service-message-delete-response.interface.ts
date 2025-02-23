export interface IServiceMessageDeleteResponse {
    status: number;
    message: string;
    errors: { [key: string]: any };
}   