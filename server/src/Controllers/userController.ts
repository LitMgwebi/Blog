import { Router, Request, Response } from "express";
import User from "../Models/User";

const router = Router();

//login route
router.post('/login', async(req: Request, res: Response) => {
    res.json({message: "login user"})
});

//signup route
router.post('/signup', async(req: Request, res: Response) => {
    const {email, password} = req.body

    try{
        // @ts-ignore
        const user = await User.signup(email, password);

        res.status(200).send({email, user})
    }catch(error: any){
        res.status(400).send({error: error.message});
    }
});

export default router;