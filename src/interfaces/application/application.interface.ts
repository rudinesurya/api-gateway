import mongoose, { Document } from 'mongoose';

export interface IApplication extends Document {
    job: mongoose.Types.ObjectId;
    applicant: mongoose.Types.ObjectId;
    cover_letter: string;
}