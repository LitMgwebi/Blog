import { Schema, model } from "mongoose";

interface IBlog {
     headline: string;
     introduction: string;
     conclusion: string;
     subHeadline: string
     content: string;
     uploadDate: Date;
     author: string;
     tag: string;
     photo: string;
     user_id: string;
}

const blogSchema = new Schema<IBlog>({

     headline: {
          type: String,
          required: [true, "Please enter the title of this entry"]
     },
     content: {
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
     tag: {
          type: String,
          required: [true, "Please enter the description for this entry"]
     },
     introduction: {
          type: String,
     },
     subHeadline: {
          type: String,
     },
     conclusion: {
          type: String,
     },
     photo: {
          type: String,
     },
     user_id: {
          type: String,
          required: true,
     },
});

const Blog = model<IBlog>('Blog', blogSchema);

export default Blog;