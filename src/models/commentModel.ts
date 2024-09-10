import { IComment } from '@delightree/utils/types/post-type';
import mongoose, { Schema } from 'mongoose';




const CommentSchema: Schema = new Schema({
  text: { 
    type: String, 
    required: true 

  },
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


export const Comment = mongoose.model<IComment>('Comment', CommentSchema);
