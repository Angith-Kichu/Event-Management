import { validationResult } from "express-validator";
import { ValidationError } from "../errors/index.js";

const validate = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        throw new ValidationError(
            "Validation failed.",
            errors.array()
        );
    }

    next();
};

export default validate;