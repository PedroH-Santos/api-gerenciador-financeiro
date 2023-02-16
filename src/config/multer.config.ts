import { resolve } from "path";
import multer = require('multer');

const tmpFolder = resolve(__dirname, "..", "..", "upload");

export const multerConfig = {
    dest: process.env.UPLOAD_LOCATION,
};

export const multerUploadOptions = {
    tmpFolder,
    storage: multer.diskStorage({
        destination: tmpFolder,
        filename(req, file, callback) {
            const fileHash = Math.round(Math.random() * 1E9); 
            const fileName = Date.now() + '-' + fileHash + '-' + file.originalname ;
            return callback(null, fileName)
        }, 
    })

}