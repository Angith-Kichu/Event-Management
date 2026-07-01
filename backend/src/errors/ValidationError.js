import AppError from "./AppError.js";

export default class ValidationError extends AppError {

    constructor(
        message = "Validation Failed",
        errors = []
    ) {

        super(message, 422);

        this.errors = errors;
    }
}