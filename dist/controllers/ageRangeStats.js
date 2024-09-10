"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ageRangeStats = void 0;
const userModel_1 = require("@delightree/models/userModel");
const http_status_codes_1 = require("http-status-codes");
const ageRangeStats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield userModel_1.User.aggregate([
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
        res.status(http_status_codes_1.StatusCodes.OK).json({ data: results });
    }
    catch (error) {
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ data: error.message });
    }
});
exports.ageRangeStats = ageRangeStats;
