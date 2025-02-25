export interface IServiceTokenCreateResponse {
    status: number;
    token: string | null;
    system_message: string;
    errors: { [key: string]: any } | null;
}