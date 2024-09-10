import  { Document } from 'mongoose';

export interface IUser extends Document {
    username: string;
    email: string;
    age: number;
    createdAt: Date;
}
