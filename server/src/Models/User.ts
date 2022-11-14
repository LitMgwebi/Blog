import {Schema, model, Model} from "mongoose";
import bcrypt = require("bcrypt");
import validator from "validator";

interface IUser {
    email: string;
    password: string;
}

// interface UserModel extends Model<IUser>{
//     signup: object;
// }

const userSchema = new Schema<IUser>({
    email: {
        type: String, 
        required : [true, "Please enter your email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please enter password"],
        min: [6, "Please make a password with more than 6 characters"],
    },
    },
    {
        statics: {
            async signup(email, password) {

                //validation
                if (!email || !password) {
                    throw Error("Please fill in all required fields");
                }
                if(!validator.isEmail(email)){
                    throw Error("Please enter a valid email");
                }
                if(!validator.isStrongPassword(password)){
                    throw Error("Please enter strong password");
                }

                 //@ts-ignore
                const  exists = await this.findOne({email})

                if(exists){
                    throw Error("Email already exists, please signup with a different email")
                }

                const salt = await bcrypt.genSalt(10)
                const hash = await bcrypt.hash(password, salt);

                //@ts-ignore
                const user = await this.create({email, password: hash})

                return user;
            },
        }
    }
);

//static signup method
// userSchema.static('signup', async(email, password) => {
//     //@ts-ignore
//     const  exists = await this.findOne({email})

//     if(exists){
//         throw Error("Email already exists, please signup with a different email")
//     }

//     const salt = await bcrypt.genSalt(10)
//     const hash = await bcrypt.hash(password, salt);

//     //@ts-ignore
//     const user = await this.create({email, password: hash})

//     return user;
// });

const User = model<IUser>('User', userSchema);

export default User;