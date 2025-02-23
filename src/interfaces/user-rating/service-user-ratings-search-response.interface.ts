import { IUserRating } from './user-rating.interface';

export interface IServiceUserRatingsSearchResponse {
    status: number;
    system_message: string;
    user_ratings: IUserRating[] | null;
}