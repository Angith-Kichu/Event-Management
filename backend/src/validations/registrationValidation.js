import { param } from "express-validator";

export const eventRegistrationValidation = [

    param("id")
        .isUUID()
        .withMessage("Invalid Event ID.")
];