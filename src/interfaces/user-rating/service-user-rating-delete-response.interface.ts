export interface IServiceUserRatingDeleteResponse {
    status: number;
    system_message: string;
    errors: { [key: string]: any } | null;
}