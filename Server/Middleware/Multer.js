import multer from 'multer';
import multerS3 from 'multer-s3';
import s3 from './awsconfig.js';
import dotenv from 'dotenv';
dotenv.config();
const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.S3_BUCKET_NAME,
        metadata: (req, file, cb) => {
            cb(null, { fieldName: file.fieldname });
        },
        key: (req, file, cb) => {
            cb(null, `menu${Date.now().toString()}`);
        },
    }),
});

export default upload;