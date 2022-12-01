"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcrypt = require("bcrypt");
const validator_1 = __importDefault(require("validator"));
// interface UserModel extends Model<IUser>{
//     signup: object;
// }
const userSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please enter password"],
        min: [6, "Please make a password with more than 6 characters"],
    },
}, {
    statics: {
        //static signup method
        async signup(email, password) {
            //validation
            if (!email || !password) {
                throw Error("Please fill in all required fields");
            }
            if (!validator_1.default.isEmail(email)) {
                throw Error("Please enter a valid email");
            }
            if (!validator_1.default.isStrongPassword(password)) {
                throw Error("Please enter strong password");
            }
            //@ts-ignore
            const exists = await this.findOne({ email });
            if (exists) {
                throw Error("Email already exists, please signup with a different email");
            }
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);
            //@ts-ignore
            const user = await this.create({ email, password: hash });
            return user;
        },
        //static login method
        async login(email, password) {
            if (!email || !password) {
                throw Error("Please fill in all required fields");
            }
            const user = await this.findOne({ email });
            if (!user) {
                throw Error("Invalid email");
            }
            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                throw Error("Invalid password");
            }
            return user;
        }
    }
});
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
const User = (0, mongoose_1.model)('User', userSchema);
exports.default = User;
