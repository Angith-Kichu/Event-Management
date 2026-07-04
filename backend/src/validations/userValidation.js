import { body } from "express-validator";

export const updateProfileValidation = [

    body("name")
        .optional()
        .trim()
        .isLength({ min: 3 })
        .withMessage("Name must be at least 3 characters."),
];