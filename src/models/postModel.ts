import { IPost } from '@delightree/utils/types/post-type';
import mongoose, { Schema } from 'mongoose';


const PostSchema: Schema = new Schema({
    title: { 
        type: String, 
        required: true 
    },
    content: { 
        type: String, 
        required: true 

    },
    authorId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 

    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});


export const Post = mongoose.model<IPost>('Post', PostSchema);
