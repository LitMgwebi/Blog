import {Schema, model, ObjectId} from "mongoose";

interface IBlog {
     title: string;
     blog: string;
     uploadDate: Date;
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
        type: Date,
   },
   author: {
        type: String,
        required: [true, "Please enter the author for this entry"]
   },
});

const Blog = model<IBlog>('Blog', blogSchema);

export default Blog;