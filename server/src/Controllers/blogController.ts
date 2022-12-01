import { Router, Request, Response } from "express";
import log from "../config/logging";
import Blog from "../Models/Blog";
import requireAuth from "../middleware/requireAuth";
import multer from "multer";
import {v4 as uuidv4} from "uuid";
import path from "path";

const router = Router(); 

//require auth for all blog routes
router.use(requireAuth);

//#region Helper functions
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, '../client/public/media');
    },
    filename: function(req, file, cb){
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    }
});
const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if(allowedFileTypes .includes(file.mimetype)){
        cb(null, true);
    }else{
        cb(null, false);
    }
}
let upload = multer({storage, fileFilter});
//#endregion

//#region GET

// Get all
router.get('/list', async (req: Request, res: Response) => {
    let blog: any = null;
    //@ts-ignore
    const user_id = req.user._id
    try {
        blog = await Blog.find({user_id});
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
    const blog: any = new Blog({
        title: req.body.title,
        blog: req.body.blog,
        uploadDate: req.body.uploadDate,
        author: req.body.author,
        tagline: req.body.tagline,
        photo: req.file.filename,
        //@ts-ignore
        user_id: req.user._id
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

router.put('/edit/:id', async (req: Request, res: Response) => {
    let blog: any = null;
    try {
        blog = await Blog.findById(req.params.id);

        blog.title = req.body.title;
        blog.blog = req.body.blog;
        blog.uploadDate = req.body.uploadDate;
        blog.author = req.body.author;
        blog.tagline = req.body.tagline;

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


export default router;