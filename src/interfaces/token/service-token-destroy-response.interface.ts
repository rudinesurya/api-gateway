export interface IServiceTokenDestroyResponse {
    status: number;
    system_message: string;
    errors: { [key: string]: any } | null;
}