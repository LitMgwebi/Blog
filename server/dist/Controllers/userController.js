"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = __importDefault(require("../Models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = (0, express_1.Router)();
//#region Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        // @ts-ignore
        const user = await User_1.default.login(email, password);
        const token = createToken(user._id);
        res.status(200).send({ email, token });
    }
    catch (error) {
        res.status(400).send({ error: error.message });
    }
});
//#endregion
//#region Signup route
router.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    try {
        // @ts-ignore
        const user = await User_1.default.signup(email, password);
        const token = createToken(user._id);
        res.status(200).send({ email, token });
    }
    catch (error) {
        res.status(400).send({ error: error.message });
    }
});
//#endregion
//#region Helper Functions
function createToken(_id) {
    return jsonwebtoken_1.default.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
}
//#endregion
exports.default = router;
