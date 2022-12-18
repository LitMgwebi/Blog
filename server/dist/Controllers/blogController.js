"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const logging_1 = __importDefault(require("../config/logging"));
const Blog_1 = __importDefault(require("../Models/Blog"));
const requireAuth_1 = __importDefault(require("../middleware/requireAuth"));
const upload_1 = __importDefault(require("../middleware/upload"));
const cloudinary_1 = require("../services/cloudinary");
const router = (0, express_1.Router)();
//require auth for all blog routes
router.use(requireAuth_1.default);
//#region GET
// Get all
router.get('/list', async (req, res) => {
    let blog = null;
    //@ts-ignore
    const user_id = req.user._id;
    try {
        blog = await Blog_1.default.find({ user_id });
        res.status(201).send({
            blog: blog,
            error: null,
            message: "Record retrieval successful"
        });
    }
    catch (err) {
        logging_1.default.error(err.message);
        res.status(400).send({
            blog: blog,
            error: err.message,
            message: "Record retrieval failed"
        });
    }
});
// Get 1
router.get("/record/:id", async (req, res) => {
    let blog = null;
    try {
        blog = await Blog_1.default.findById(req.params.id);
        res.status(201).send({
            blog: blog,
            error: null,
            message: "Record retrieval successful"
        });
    }
    catch (err) {
        logging_1.default.error(err.message);
        res.status(400).send({
            blog: blog,
            error: err.message,
            message: "Record retrieval failed"
        });
    }
});
//#endregion
//#region POST
router.post("/add", upload_1.default.single('photo'), async (req, res) => {
    let blog;
    try {
        const data = await (0, cloudinary_1.uploadToCloudinary)(req.file.path, "blog-images");
        blog = new Blog_1.default({
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
    }
    catch (err) {
        logging_1.default.error(err.message);
        res.status(400).send({
            blog: blog,
            error: err.message,
            message: "Could not add new record"
        });
    }
});
//#endregion
//#region PUT
router.put('/edit/:id', upload_1.default.single('photo'), async (req, res) => {
    try {
        let payload = Blog_1.default.findById(req.params.id);
        const publicId = payload.public_id;
        await (0, cloudinary_1.removeFromCloudinary)(publicId);
    }
    catch (err) {
        logging_1.default.error(err.message);
        logging_1.default.error(`Cannot remove ${req.params.id}'s image from cloudinary`);
    }
    try {
        const data = await (0, cloudinary_1.uploadToCloudinary)(req.file.path, "blog-images");
        const blog = {
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
        };
        //@ts-ignore
        await Blog_1.default.findOneAndUpdate(req.params.id, { $set: blog }, { new: true })
            .then(post => {
            res.status(201).send({
                blog: blog,
                error: null,
                message: "Record edited successfully"
            });
        })
            .catch(err => {
            logging_1.default.error(err.message);
            res.status(400).send({
                blog: blog,
                error: err.message,
                message: "Could not edit record"
            });
        });
    }
    catch (err) {
        logging_1.default.error(err.message);
    }
});
//#endregion
//#region DELETE
router.delete("/remove/:id", async (req, res) => {
    let blog = null;
    try {
        blog = await Blog_1.default.findById(req.params.id);
        const publicId = blog.public_id;
        await (0, cloudinary_1.removeFromCloudinary)(publicId);
        await blog.remove();
    }
    catch (err) {
        logging_1.default.error(err.message);
        res.status(400).send({
            blog: blog,
            error: err.message,
            message: "Record retrieval failed"
        });
    }
});
//#endregion
exports.default = router;
