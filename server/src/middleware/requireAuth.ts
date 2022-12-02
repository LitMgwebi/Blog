import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import log from "../config/logging";
import User from "../Models/User";

const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
    //verify authentication
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).send({ error: 'Authorization token required' });
    }

    const token = authorization.split(' ')[1];

    try {
        //@ts-ignore
        const { _id } = jwt.verify(token, process.env.SECRET);
        //@ts-ignore
        req.user = await User.findOne({ _id }).select('_id');
        next();
    } catch (error) {
        log.error(error)
        res.status(401).send({ error: 'Request is not authorized' });
    }
}

export default requireAuth;