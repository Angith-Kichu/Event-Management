import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import userRepository from "../repositories/userRepository.js";
import { env } from "../config/env.js";
import { UserRoles } from "../models/index.js";

export async function register(userData) {

    const existingUser =
        await userRepository.findByEmail(userData.email);

    if (existingUser) {
        throw new ConflictError("Email already exists.");
    }

    const hashedPassword =
        await bcrypt.hash(userData.password, 10);

    const user = await userRepository.createUser({

        name: userData.name,

        email: userData.email,

        password: hashedPassword,

        role: UserRoles.USER,

        profile_image: null,
    });

    return user;
}

export async function login(email, password) {

    const user =
        await userRepository.findByEmail(email);

    if (!user)
        throw new UnauthorizedError("Invalid credentials.");

    const validPassword =
        await bcrypt.compare(
            password,
            user.password
        );

    if (!validPassword)
        throw new UnauthorizedError("Invalid credentials.");

    const token = jwt.sign(

        {
            id: user.id,
            role: user.role,
        },

        env.jwt.secret,

        {
            expiresIn: env.jwt.expiresIn,
        }
    );

    delete user.password;

    return {
        token,
        user,
    };
}

export default {
    register,
    login,
};