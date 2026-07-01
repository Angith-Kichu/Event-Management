import jwt from "jsonwebtoken";

import { env } from "../config/env.js";
import userRepository from "../repositories/userRepository.js";
import { UnauthorizedError } from "../errors/index.js";

const authenticate = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new UnauthorizedError("Authentication token is missing.");
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, env.jwt.secret);

        const user = await userRepository.findById(decoded.id);

        if (!user) {
            throw new UnauthorizedError("User no longer exists.");
        }

        req.user = user;

        next();
    } catch (error) {
        next(error);
    }
};

export default authenticate;