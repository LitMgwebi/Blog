import { Router, Request, Response } from "express";
import path from "path";
import log from "../config/logging";
import Blog from "../Models/Blog";

const router = Router();

//#region GET

// Get all
router.get('/list', async (req: Request, res: Response) => {
    let blog: any = null;
    try {
        blog = await Blog.find();
        res.status(201).send({
            blog: blog,
            error: null,
            message: "Record retrieval successful"
        })
    } catch (err: any) {
        log.error(err.message);
        res.status(400).send({
            blog: blog,
            error: err.message,
            message: "Record retrieval failed"
        });
    }
});

// Get 1
router.get("/record/:id", async (req: Request, res: Response) => {
    getOneRecord(req, res)
})

//#endregion


//#region POST
router.post("/add", async (req, res) => {
    const blog: any = new Blog({
        title: req.body.title,
        blog: req.body.blog,
        uploadDate: req.body.uploadDate,
        author: req.body.author,
    });

    try {
        await blog.save();
        res.status(201).send({
            blog: blog,
            error: null,
            message: "New record was created"
        });
    } catch (err: any) {
        log.error(err.message);
        res.status(400).send({
            blog: blog,
            error: err.message,
            message: "Could not add new record"
        });
    }
});
//#endregion


//#region PUT

//Get record to update
router.get("/edit/:id", (req: Request, res: Response) => {
    getOneRecord(req, res);
});

//Edit record
router.put('/edit/:id', async (req: Request, res: Response) => {
    let blog: any = null;
    try {
        blog = await Blog.findById(req.params.id);

        blog.title = req.body.title;
        blog.blog = req.body.blog;
        blog.uploadDate = req.body.uploadDate;
        blog.author = req.body.author;

        await blog.save();
        res.status(201).send({
            blog: blog,
            error: null,
            message: "Record edited successfully"
        });
    } catch (err: any) {
        log.error(err.message);
        res.status(400).send({
            blog: blog,
            error: err.message,
            message: "Could not edit record"
        });
    }
});
//#endregion


//#region DELETE

// Get a record to delete
router.get("/remove/:id", (req: Request, res: Response) => {
    getOneRecord(req, res);
});

// Delete record
router.delete("/remove/:id", async(req: Request, res: Response) => {
    let blog: any = null;
    try{
        blog = await Blog.findById(req.params.id);
        await blog.remove();
    }catch(err: any) {
        log.error(err.message)
        res.status(400).send({
            blog: blog,
            error: err.message,
            message: "Record retrieval failed"
        });
    }
});
//#endregion


//#region Helper functions
const getOneRecord: Function = async (req, res) => {
    let blog: any = null;
    try {
        blog = await Blog.findById(req.params.id);

        res.status(201).send({
            blog: blog,
            error: null,
            message: "Record retrieval successful"
        });
    } catch (err: any) {
        log.error(err.message)
        res.status(400).send({
            blog: blog,
            error: err.message,
            message: "Record retrieval failed"
        });
    }
}
//#endregion

export default router;