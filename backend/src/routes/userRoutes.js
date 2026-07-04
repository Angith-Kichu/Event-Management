import express from "express";

import userController from "../controllers/userController.js";
import { authenticate, validate } from "../middlewares/index.js";
import upload from "../middlewares/upload.js";
import { updateProfileValidation } from "../validations/index.js";

const router = express.Router();

router.use(authenticate);

router.get("/profile", userController.getProfile);

router.put(
    "/profile",
    upload.single("profile_image"),
    updateProfileValidation,
    validate,
    userController.updateProfile
);

export default router;