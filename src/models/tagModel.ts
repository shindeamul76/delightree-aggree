import { ITag } from '@delightree/utils/types/post-type';
import mongoose, { Schema } from 'mongoose';


const TagSchema: Schema = new Schema({
  name: { type: String, required: true }
});


export const Tags =  mongoose.model<ITag>('Tag', TagSchema);
