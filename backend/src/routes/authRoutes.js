import express from "express";
import authController from "../controllers/authController.js";
import { validate } from "../middlewares/index.js";
import { registerValidation, loginValidation } from "../validations/index.js";

const router = express.Router();

// Public Routes
router.post("/register", registerValidation, validate, authController.register);
router.post("/login", loginValidation, validate, authController.login);

export default router;