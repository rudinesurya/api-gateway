import { IUserRating } from './user-rating.interface';

export interface IServiceUserRatingsSearchResponse {
    status: number;
    message: string;
    user_ratings: IUserRating[] | null;
}