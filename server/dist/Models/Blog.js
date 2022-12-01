"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const blogSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, "Please enter the title of this entry"]
    },
    blog: {
        type: String,
        required: [true, "Please enter the blog for this entry"]
    },
    uploadDate: {
        type: Date,
    },
    author: {
        type: String,
        required: [true, "Please enter the author for this entry"]
    },
    tagline: {
        type: String,
        required: [true, "Please enter the description for this entry"]
    },
    photo: {
        type: String,
    },
    user_id: {
        type: String,
        required: true,
    },
});
const Blog = (0, mongoose_1.model)('Blog', blogSchema);
exports.default = Blog;
