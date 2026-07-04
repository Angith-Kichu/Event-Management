import express from "express";

import eventController from "../controllers/eventController.js";

import {
    authenticate,
    authorize,
    validate,
} from "../middlewares/index.js";

import upload from "../middlewares/upload.js";
import { UserRoles } from "../models/index.js";
import { createEventValidation } from "../validations/index.js";

const router = express.Router();

// Public Routes
router.get("/", eventController.getEvents);

router.get("/:id", eventController.getEvent);

// Protected Routes
router.post(
    "/",
    authenticate,
    authorize(
        UserRoles.ADMIN,
        UserRoles.ORGANIZER
    ),
    upload.single("banner"),
    createEventValidation,
    validate,
    eventController.createEvent
);

router.put(
    "/:id",
    authenticate,
    authorize(
        UserRoles.ADMIN,
        UserRoles.ORGANIZER
    ),
    upload.single("banner"),
    createEventValidation,
    validate,
    eventController.updateEvent
);

router.delete(
    "/:id",
    authenticate,
    authorize(
        UserRoles.ADMIN,
        UserRoles.ORGANIZER
    ),
    eventController.deleteEvent
);

export default router;