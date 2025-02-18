import { IUserRating } from "./user-rating.interface";

export interface IServiceUserRatingUpdateResponse {
    status: number;
    message: string;
    user_rating: IUserRating | null;
    errors: { [key: string]: any };
}