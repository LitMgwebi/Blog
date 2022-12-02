import { Router, Request, Response } from "express";
import Blog from "../Models/Blog";
import log from "../config/logging";

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    let blog: any = null;
    //@ts-ignore
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
})

router.get("/:id", async (req: Request, res: Response) => {
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
});

export default router;