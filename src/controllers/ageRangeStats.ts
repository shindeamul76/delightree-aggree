import { User } from "@delightree/models/userModel";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";



export const ageRangeStats = async ( req: Request, res: Response) => {
    try {
        const results = await User.aggregate([
            {
              $addFields: {
                ageRange: {
                  $switch: {
                    branches: [
                      { case: { $gte: ["$age", 45] }, then: "45+" },
                      { case: { $and: [{ $gte: ["$age", 35] }, { $lt: ["$age", 45] }] }, then: "35-44" },
                      { case: { $and: [{ $gte: ["$age", 25] }, { $lt: ["$age", 35] }] }, then: "25-34" },
                      { case: { $and: [{ $gte: ["$age", 18] }, { $lt: ["$age", 25] }] }, then: "18-24" }
                    ],
                    default: "Invalid range"
                  }
                }
              }
            },
            {
              $lookup: {
                from: "posts",
                localField: "_id",
                foreignField: "authorId",
                as: "posts"
              }
            },
            {
              $lookup: {
                from: "comments",
                localField: "_id",
                foreignField: "userId",
                as: "comments"
              }
            },
            {
              $lookup: {
                from: "likes",
                localField: "_id",
                foreignField: "userId",
                as: "likes"
              }
            },
            {
              $lookup: {
                from: "views",
                localField: "_id",
                foreignField: "userId",
                as: "views"
              }
            },
            {
              $project: {
                ageRange: 1,
                postCount: { $size: "$posts" },
                commentCount: { $size: "$comments" },
                likeCount: { $size: "$likes" },
                viewCount: { $size: "$views" }
              }
            },
            {
              $group: {
                _id: "$ageRange",
                totalPosts: { $sum: "$postCount" },
                totalComments: { $sum: "$commentCount" },
                totalLikes: { $sum: "$likeCount" },
                totalViews: { $sum: "$viewCount" }
              }
            }
          ]);

          if (!results.length) {
            return res.status(404).json({ message: 'No data found' });
          }
      
          res.status(StatusCodes.OK).json({data: results})
    } catch (error: any) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({data: error.message})
    }
}