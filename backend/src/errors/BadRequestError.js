import AppError from "./AppError.js";

export default class BadRequestError extends AppError {
    constructor(message = "Bad Request") {
        super(message, 400);
    }
}