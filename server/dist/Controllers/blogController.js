"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const logging_1 = __importDefault(require("../config/logging"));
const Blog_1 = __importDefault(require("../Models/Blog"));
const router = (0, express_1.Router)();
//#region GET
// Get all
router.get('/list', async (req, res) => {
    let blog = null;
    try {
        blog = await Blog_1.default.find();
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
//Get record to update
router.get("/edit/:id", (req, res) => {
    getOneRecord(req, res);
});
//Edit record
router.put('/edit/:id', async (req, res) => {
    let blog = null;
    try {
        blog = await Blog_1.default.findById(req.params.id);
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
// Get a record to delete
router.get("/delete/:id", (req, res) => {
    getOneRecord(req, res);
});
// Delete record
router.delete("/delete/:id", async (req, res) => {
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
//#region Helper functions
const getOneRecord = async (req, res) => {
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
};
//#endregion
exports.default = router;
