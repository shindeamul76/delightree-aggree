import { IPostTag } from '@delightree/utils/types/post-type';
import mongoose, { Schema } from 'mongoose';


const PostTagSchema: Schema = new Schema({
  postId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Post', 
    required: true 

  },
  tagId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Tag', 
    required: true 

  },
  createdAt: { 
    type: Date, 
    default: Date.now 

  }
});


export const PostTags = mongoose.model<IPostTag>('PostTag', PostTagSchema);
