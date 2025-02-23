export interface IServiceApplicationDeleteResponse {
    status: number;
    message: string;
    errors: { [key: string]: any };
}   