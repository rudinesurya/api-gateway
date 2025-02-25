export interface IServiceJobDeleteResponse {
    status: number;
    system_message: string;
    errors: { [key: string]: any } | null;
}