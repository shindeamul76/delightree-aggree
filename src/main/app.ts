import express, { Application, urlencoded, json } from 'express';
import type { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { StatusCodes } from 'http-status-codes';
import { User } from '@delightree/models/userModel';
import { Post } from '@delightree/models/postModel';
import { PostTags } from '@delightree/models/postTags';
import { Tags } from '@delightree/models/tagModel';
import { Comment } from '@delightree/models/commentModel';
import { Likes } from '@delightree/models/likeModel';
import { Followers } from '@delightree/models/followersModel';
import { View } from '@delightree/models/viewsModel';
import { router } from '@delightree/routes/ageRangeStats';





export const app: Application = express();


app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors());


app.use("/api/v1", router)

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Delightree mongodb aggree!' });
});


app.post('/success', async (req: Request, res: Response) => {
  try {
    const users = await View.insertMany([]);
    // Extract only the _id from the inserted users
    const insertedIds = users.map(user => user._id);

    res.status(200).json({ insertedIds });
  } catch (error: any) {
    res.status(200).json({ message: error.message });
  }
});


app.get('/_health', (req: Request, res: Response) => {
  return res.status(200).json({
    uptime: process.uptime(),
    message: "OK",
    timestamp: Date.now(),
  });
});


// Handle 404 errors
app.use('*', (req: Request, res: Response) => {
  res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    message: 'Endpoint not found',
    data: null,
  });
});