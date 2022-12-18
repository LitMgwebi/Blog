import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import path from "path";

const storage = multer.diskStorage({});
const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
let upload = multer({ storage: storage, fileFilter });

export default upload