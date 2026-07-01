import { ForbiddenError } from "../errors/index.js";

const authorize = (...roles) => {
    return (req, res, next) => {

        if (!roles.includes(req.user.role)) {
            return next(
                new ForbiddenError("You do not have permission to access this resource.")
            );
        }

        next();
    };
};

export default authorize;