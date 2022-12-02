"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Blog_1 = __importDefault(require("../Models/Blog"));
const logging_1 = __importDefault(require("../config/logging"));
const router = (0, express_1.Router)();
router.get('/', async (req, res) => {
    let blog = null;
    //@ts-ignore
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
router.get("/:id", async (req, res) => {
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
exports.default = router;
