import { randomUUID } from "crypto";

const generateFileName = (originalName) => {

    const extension =
        originalName.substring(
            originalName.lastIndexOf(".")
        );

    return `${randomUUID()}${extension}`;
};

export default generateFileName;