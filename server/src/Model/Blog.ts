import {Schema, model} from "mongoose";

interface IBlog {
    title: string;
    blog: string;
    uploadDate: number;
    author: string;
}

const blogSchema = new Schema<IBlog>({
    title: {
        type: String,
        required: [true, "Please enter the title of this entry"]
   },
   blog: {
        type: String,
        required: [true, "Please enter the blog for this entry"]
   },
   uploadDate: {
        type: Number,
   },
   author: {
        type: String,
        required: [true, "Please enter the author for this entry"]
   },
});

const Blog = model<IBlog>('Blog', blogSchema);

export default Blog;