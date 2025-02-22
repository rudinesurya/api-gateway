import { Document } from 'mongoose';

export interface ITokenInfo extends Document {
    data: {
        user_id: string;
    };
}