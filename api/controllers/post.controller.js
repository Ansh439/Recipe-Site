import Post from "../models/post.model.js";
import { errorHandler } from "../utils/error.js"

export const create = async(req, res, next) =>  { 

    if(!req.body.title || !req.body.content){
        return next(errorHandler(400, "Please provide all the required fields"))
    }

    const slug = req.body.title.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9-]/g, '');
    const newPost = new Post({
        ...req.body,
        slug,
        userId: req.user.id
    })

    try {
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (error)  {
        next(error)
    }
}

export const getposts = async(req, res, next) => {
    try {
        const startIndex = req.query.startIndex || 0;
        const limit = req.query.limit || 9;
        const sortDirection = req.query.order === 'asc' ? 1 : -1;
        const posts = await Post.find({
            ...(req.query.userId && {userId : req.query.userId}),
            ...(req.query.category && {category : req.query.category}),
            ...(req.query.slug && {category : req.query.slug}),
            ...(req.query.postId && {_id : req.query.postId}),
            ...(req.query.searchTerm && {
                $or: [
                    {title : {$regex : req.query.searchTerm, $option : 'i'}},
                    {content : {$regex : req.query.searchTerm, $option : 'i'}},
                ]
            }),
        })
        .sort({ updatedAt: sortDirection })
        .skip(startIndex)
        .limit(limit);      


        const totalPosts = await Post.countDocuments();
        const now = new Date();
        const oneMonthAgo = new Date(
            now.getFullYear(),
            now.getMonth()-1,
            now.getDate()
        );

        const postLastMonth = await Post.countDocuments({
            createdAt: {$gte : oneMonthAgo}
        })

        res.status(200).json({
            posts,
            totalPosts,
            postLastMonth
        })
    } catch (error) {
        next(error);
    }
}	
