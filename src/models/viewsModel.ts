import { IView } from '@delightree/utils/types/post-type';
import mongoose, { Schema } from 'mongoose';


const ViewSchema: Schema = new Schema({
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
  timestamp: { 
    type: Date, 
    default: Date.now, 
    required: true    
  }
});

export const View =  mongoose.model<IView>('View', ViewSchema);
