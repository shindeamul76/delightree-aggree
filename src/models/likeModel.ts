import { ILike } from "@delightree/utils/types/post-type";
import mongoose, { Schema } from 'mongoose';


const LikeSchema: Schema = new Schema({
  postId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Post', 
    required: true 

  },
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 

  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});


export const Likes = mongoose.model<ILike>('Like', LikeSchema);
