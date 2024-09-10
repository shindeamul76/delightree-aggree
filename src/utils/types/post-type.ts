import mongoose, { Document } from 'mongoose';

export interface IPost extends Document {
    title: string;
    content: string;
    authorId: mongoose.Schema.Types.ObjectId;
    createdAt: Date;
  }


export interface IComment extends Document {
  text: string;
  postId: mongoose.Schema.Types.ObjectId;
  userId: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
}


export interface ILike extends Document {
  postId: mongoose.Schema.Types.ObjectId;
  userId: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
}

export interface IFollower extends Document {
    followerId: mongoose.Schema.Types.ObjectId;
    followeeId: mongoose.Schema.Types.ObjectId;
    createdAt: Date;
}


export interface ITag extends Document {
    name: string;
}

export interface IPostTag extends Document {
    postId: mongoose.Schema.Types.ObjectId;
    tagId: mongoose.Schema.Types.ObjectId;
    createdAt: Date;
}

export interface IView extends Document {
    postId: mongoose.Schema.Types.ObjectId;
    userId: mongoose.Schema.Types.ObjectId;
    timestamp: Date;
}
  