import mongoose, { Document, Types } from 'mongoose';

export interface IUserRating extends Document {
    rater: Types.ObjectId;
    ratedUser: Types.ObjectId;
    rating: number;
    comment?: string;
}