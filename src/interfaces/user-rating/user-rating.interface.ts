import mongoose, { Document, Types } from 'mongoose';

export interface IUserRating extends Document {
    rater: Types.ObjectId;
    rated_user: Types.ObjectId;
    rating: number;
    comment?: string;
}