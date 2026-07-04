import {
    PutObjectCommand,
    DeleteObjectCommand,
} from "@aws-sdk/client-s3";

import s3 from "../config/s3.js";
import generateFileName from "../utils/generateFileName.js";

const uploadImage = async (file, folder = "") => {

    const fileName =
        `${folder}/${generateFileName(file.originalname)}`;

    await s3.send(

        new PutObjectCommand({

            Bucket: process.env.AWS_BUCKET_NAME,

            Key: fileName,

            Body: file.buffer,

            ContentType: file.mimetype,
        })
    );

    return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
};

const deleteImage = async (imageUrl) => {

    const key = imageUrl.split(".com/")[1];

    await s3.send(

        new DeleteObjectCommand({

            Bucket: process.env.AWS_BUCKET_NAME,

            Key: key,
        })
    );
};

export default {

    uploadImage,

    deleteImage,
};