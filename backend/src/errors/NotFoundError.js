import AppError from "./AppError.js";

export default class NotFoundError extends AppError {
    constructor(message = "Resource Not Found") {
        super(message, 404);
    }
}