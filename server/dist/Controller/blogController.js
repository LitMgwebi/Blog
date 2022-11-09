"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const logging_1 = __importDefault(require("../config/logging"));
const Blog_1 = __importDefault(require("../Model/Blog"));
const router = (0, express_1.Router)();
//#region GET
// Get all
router.get('/list', async (req, res) => {
    let blog = null;
    try {
        blog = await Blog_1.default.find();
        res.send({
            blog: blog,
            error: null,
            message: "Record retrieval successful"
        });
    }
    catch (err) {
        logging_1.default.error(err.message);
        res.send({
            blog: blog,
            error: err.message,
            message: "Record retrieval failed"
        });
    }
});
// Get 1
router.get("record/:id", async (res, req) => {
    getOneRecord(req, res);
});
//#endregion
//#region POST
router.post("/add", async (req, res) => {
    const blog = new Blog_1.default({
        title: req.body.title,
        blog: req.body.blog,
        uploadDate: req.body.uploadDate,
        author: req.body.author,
    });
    try {
        await blog.save();
        res.send({
            blog: blog,
            error: null,
            message: "New record was created"
        });
    }
    catch (err) {
        logging_1.default.error(err.message);
        res.send({
            blog: blog,
            error: err.message,
            message: "Could not add new record"
        });
    }
});
//#endregion
//#region Helper functions
const getOneRecord = async (req, res) => {
    let blog = null;
    try {
        blog = await Blog_1.default.findById(req.params.id);
        res.send({
            blog: blog,
            error: null,
            message: "Record retrieval successful"
        });
    }
    catch (err) {
        logging_1.default.error(err.message);
        res.send({
            blog: blog,
            error: err.message,
            message: "Record retrieval failed"
        });
    }
};
//#endregion
exports.default = router;
