export default function errorMiddleware(err, req, res, next) {
    console.error(err);

    if (err.isOperational) {

        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            errors: err.errors || [],
        });
    }

    return res.status(500).json({
        success: false,
        message: "Internal Server Error",
    });
}