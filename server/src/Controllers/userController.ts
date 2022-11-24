import { Router, Request, Response } from "express";
import User from "../Models/User";
import jwt from "jsonwebtoken";

const router = Router();

//#region Login route
router.post('/login', async(req: Request, res: Response) => {
    const {email, password} = req.body;

    try{
        // @ts-ignore
        const user = await User.login(email, password);

        const token = createToken(user._id);
        res.status(200).send({email, token})
    }catch(error: any){
        res.status(400).send({error: error.message});
    }
});
//#endregion

//#region Signup route
router.post('/signup', async(req: Request, res: Response) => {
    const {email, password} = req.body
    try{
        // @ts-ignore
        const user = await User.signup(email, password);

        const token = createToken(user._id);
        res.status(200).send({email, token})
    }catch(error: any){
        res.status(400).send({error: error.message});
    }
});
//#endregion

//#region Helper Functions
function createToken(_id) {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'})
}
//#endregion
export default router;