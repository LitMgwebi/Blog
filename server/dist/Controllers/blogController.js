"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const logging_1 = __importDefault(require("../config/logging"));
const Blog_1 = __importDefault(require("../Models/Blog"));
const requireAuth_1 = __importDefault(require("../middleware/requireAuth"));
const multer_1 = __importDefault(require("multer"));
const uuid_1 = require("uuid");
const path_1 = __importDefault(require("path"));
const router = (0, express_1.Router)();
//require auth for all blog routes
router.use(requireAuth_1.default);
//#region Helper functions
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../client/public/media');
    },
    filename: function (req, file, cb) {
        cb(null, (0, uuid_1.v4)() + '-' + Date.now() + path_1.default.extname(file.originalname));
    }
});
const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
let upload = (0, multer_1.default)({ storage, fileFilter });
//#endregion
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
router.post("/add", upload.single('photo'), async (req, res) => {
    let blog;
    try {
        blog = new Blog_1.default({
            title: req.body.title,
            blog: req.body.blog,
            uploadDate: req.body.uploadDate,
            author: req.body.author,
            tagline: req.body.tagline,
            photo: req.body.photo,
            //@ts-ignore
            user_id: req.user._id
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
router.put('/edit/:id', upload.single('photo'), async (req, res) => {
    let blog = null;
    try {
        blog = await Blog_1.default.findById(req.params.id);
        blog.title = req.body.title;
        blog.blog = req.body.blog;
        blog.uploadDate = req.body.uploadDate;
        blog.author = req.body.author;
        blog.tagline = req.body.tagline;
        blog.photo = req.body.photo;
        //@ts-ignore
        blog.user_id = req.user._id;
        await blog.save();
        res.status(201).send({
            blog: blog,
            error: null,
            message: "Record edited successfully"
        });
    }
    catch (err) {
        logging_1.default.error(err.message);
        res.status(400).send({
            blog: blog,
            error: err.message,
            message: "Could not edit record"
        });
    }
});
//#endregion
//#region DELETE
router.delete("/remove/:id", async (req, res) => {
    let blog = null;
    try {
        blog = await Blog_1.default.findById(req.params.id);
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
