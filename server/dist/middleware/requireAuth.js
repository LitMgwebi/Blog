"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const logging_1 = __importDefault(require("../config/logging"));
const User_1 = __importDefault(require("../Models/User"));
const requireAuth = async (req, res, next) => {
    //verify authentication
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).send({ error: 'Authorization token required' });
    }
    const token = authorization.split(' ')[1];
    try {
        //@ts-ignore
        const { _id } = jsonwebtoken_1.default.verify(token, process.env.SECRET);
        //@ts-ignore
        req.user = await User_1.default.findOne({ _id }).select('_id');
        next();
    }
    catch (error) {
        logging_1.default.error(error);
        res.status(401).send({ error: 'Request is not authorized' });
    }
};
exports.default = requireAuth;
