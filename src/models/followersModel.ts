import { IFollower } from '@delightree/utils/types/post-type';
import mongoose, { Schema } from 'mongoose';


const FollowerSchema: Schema = new Schema({
  followerId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 

  },
  followeeId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});


export const Followers = mongoose.model<IFollower>('Follower', FollowerSchema);
