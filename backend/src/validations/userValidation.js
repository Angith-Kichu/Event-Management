import { body } from "express-validator";

export const updateProfileValidation = [

    body("name")
        .optional()
        .trim()
        .isLength({ min: 3 }),

    body("profile_image")
        .optional()
        .isURL()
        .withMessage("Invalid image URL.")
];