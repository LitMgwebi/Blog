"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFromCloudinary = exports.uploadToCloudinary = void 0;
const cloudinary_1 = require("cloudinary");
const logging_1 = __importDefault(require("../config/logging"));
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});
const uploadToCloudinary = (path, folder) => {
    return cloudinary_1.v2.uploader.upload(path, { folder })
        .then((data) => {
        return { url: data.url, public_id: data.public_id };
    }).catch((error) => {
        logging_1.default.error(error);
    });
};
exports.uploadToCloudinary = uploadToCloudinary;
const removeFromCloudinary = async (public_id) => {
    await cloudinary_1.v2.uploader.destroy(public_id, function (error, result) {
        console.log(result, error);
    });
};
exports.removeFromCloudinary = removeFromCloudinary;
