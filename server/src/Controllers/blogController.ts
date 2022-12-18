import { Router, Request, Response } from "express";
import log from "../config/logging";
import Blog from "../Models/Blog";
import requireAuth from "../middleware/requireAuth";
import upload from "../middleware/upload";
import { uploadToCloudinary, removeFromCloudinary } from "../services/cloudinary";

const router = Router();

//require auth for all blog routes
router.use(requireAuth);

//#region GET

// Get all
router.get('/list', async (req: Request, res: Response) => {
    let blog: any = null;
    //@ts-ignore
    const user_id = req.user._id
    try {
        blog = await Blog.find({ user_id });
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

//#endregion


//#region POST

router.post("/add", upload.single('photo'), async (req: Request, res: Response) => {
    let blog: any;
    try {
        const data = await uploadToCloudinary(req.file.path, "blog-images")


        blog = new Blog({
            headline: req.body.headline,
            content: req.body.content,
            uploadDate: req.body.uploadDate,
            author: req.body.author,
            tag: req.body.tag,
            introduction: req.body.introduction,
            conclusion: req.body.conclusion,
            subHeadline: req.body.subHeadline,
            //@ts-ignore
            photo: data.url,
            //@ts-ignore
            user_id: req.user._id,
            //@ts-ignore
            public_id: data.public_id,
        });
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

router.put('/edit/:id', upload.single('photo'), async (req: Request, res: Response) => {
    const blog = {
        title: req.body.title,
        blog: req.body.blog,
        uploadDate: req.body.uploadDate,
        author: req.body.author,
        tagline: req.body.tagline,
        photo: req.body.photo,
        //@ts-ignore
        user_id: req.user._id
    };
    //@ts-ignore
    await Blog.findOneAndUpdate(req.params.id, { $set: blog }, { new: true })
        .then(post => {
            res.status(201).send({
                blog: blog,
                error: null,
                message: "Record edited successfully"
            });
        })
        .catch(err => {
            log.error(err.message);
            res.status(400).send({
                blog: blog,
                error: err.message,
                message: "Could not edit record"
            });

        });
    });
    //#endregion


    //#region DELETE

    router.delete("/remove/:id", async (req: Request, res: Response) => {
        let blog: any = null;
        try {
            blog = await Blog.findById(req.params.id);
            await blog.remove();
        } catch (err: any) {
            log.error(err.message)
            res.status(400).send({
                blog: blog,
                error: err.message,
                message: "Record retrieval failed"
            });
        }
    });
    //#endregion


    export default router;