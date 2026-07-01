import express from "express";

import userController from "../controllers/userController.js";
import { authenticate, validate } from "../middlewares/index.js";
import { updateProfileValidation } from "../validations/index.js";

const router = express.Router();

router.use(authenticate);

router.get("/profile", userController.getProfile);

router.put("/profile", updateProfileValidation, validate, userController.updateProfile);

export default router;