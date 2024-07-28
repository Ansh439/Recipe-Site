import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },

        content: {
            type: String,
            required: true
        },

        ingredients: {
            type: String,
            required: true
        },

        title: {
            type: String,
            required: true,
            unique: true
        },

        image: {
            type: String,
            default: 'https://cdn.pixabay.com/photo/2017/09/08/13/16/recipe-2728726_1280.jpg'
        },

        category: {
            type: String,
            default: 'uncategorized'
        },

        slug: {
            type: String,
            required: true,
            unique: true
        },

        isSaved: {
            type: Boolean,
            default: false
        }
    }, {timestamps: true}
)

const Post = mongoose.model('Post', postSchema);
export default Post;