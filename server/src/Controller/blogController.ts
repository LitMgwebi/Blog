import { Router } from "express";
import path from "path";
import log from "../config/logging";
import Blog from "../Model/Blog";

const router = Router();

//#region GET

// Get all
router.get('/list', async(req, res) => {
    let blog: any = null;
    try {
        blog = await Blog.find();
        res.send({
            blog: blog,
            error: null,
            message: "Record retrieval successful"
        })
    } catch(err: any){
        log.error(err.message);
        res.send({
            blog: blog,
            error: err.message,
            message: "Record retrieval failed"
        });
    }
});

// Get 1
router.get("record/:id", async(res, req) => {
    getOneRecord(req, res);
})

//#endregion


//#region POST
router.post("/add", async(req, res) => {
    const blog: any = new Blog({
        title: req.body.title,
        blog: req.body.blog,
        uploadDate: req.body.uploadDate,
        author: req.body.author,
    });

    try{
        await blog.save();
        res.send({
            blog: blog,
            error: null,
            message: "New record was created"
        });
    } catch(err: any){
        log.error(err.message);
        res.send({
            blog: blog,
            error: err.message,
            message: "Could not add new record"
        });
    }
});
//#endregion

//#region Helper functions
const getOneRecord: Function = async(req, res) => {
    let blog: any = null;
    try {
        blog = await Blog.findById(req.params.id);

        res.send({
            blog: blog,
            error: null,
            message: "Record retrieval successful"
        });
    } catch(err: any){
        log.error(err.message)
        res.send({
            blog: blog,
            error: err.message,
            message: "Record retrieval failed"
        });
    }
}
//#endregion

export default router;