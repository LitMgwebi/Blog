"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = __importDefault(require("../Models/User"));
const router = (0, express_1.Router)();
//login route
router.post('/login', async (req, res) => {
    res.json({ message: "login user" });
});
//signup route
router.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    try {
        // @ts-ignore
        const user = await User_1.default.signup(email, password);
        res.status(200).send({ email, user });
    }
    catch (error) {
        res.status(400).send({ error: error.message });
    }
});
exports.default = router;
