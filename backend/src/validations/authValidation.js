import { body } from "express-validator";

export const registerValidation = [

    body("name")
        .trim()
        .notEmpty()
        .withMessage("Name is required.")
        .isLength({ min: 3 })
        .withMessage("Name must be at least 3 characters."),

    body("email")
        .trim()
        .isEmail()
        .withMessage("Invalid email address."),

    body("password")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters.")
];

export const loginValidation = [

    body("email")
        .isEmail()
        .withMessage("Invalid email."),

    body("password")
        .notEmpty()
        .withMessage("Password is required.")
];