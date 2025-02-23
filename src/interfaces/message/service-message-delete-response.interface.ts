export interface IServiceMessageDeleteResponse {
    status: number;
    system_message: string;
    errors: { [key: string]: any };
}   