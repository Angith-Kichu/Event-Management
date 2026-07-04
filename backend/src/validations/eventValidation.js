import { body } from "express-validator";

export const createEventValidation = [

    body("title")
        .notEmpty()
        .withMessage("Title is required."),

    body("venue")
        .notEmpty()
        .withMessage("Venue is required."),

    body("start_date")
        .isISO8601()
        .withMessage("Invalid start date."),

    body("end_date")
        .isISO8601()
        .withMessage("Invalid end date."),

    body("registration_deadline")
        .isISO8601()
        .withMessage("Invalid registration deadline."),

    body("max_participants")
        .isInt({ min: 1 })
        .withMessage("Participants must be greater than 0.")
        .toInt(),
];