import express from "express";

import registrationController
    from "../controllers/registrationController.js";

import {
    authenticate,
    authorize,
    validate,
} from "../middlewares/index.js";

import { UserRoles } from "../models/index.js";
import { eventRegistrationValidation } from "../validations/index.js";

const router = express.Router();

router.get(
    "/my-events",
    authenticate,
    authorize(UserRoles.USER),
    registrationController.getMyRegisteredEvents
);

router.post(
    "/:id",
    authenticate,
    authorize(UserRoles.USER),
    eventRegistrationValidation,
    validate,
    registrationController.register
);

router.get(
    "/:id/participants",
    authenticate,
    authorize(
        UserRoles.ADMIN,
        UserRoles.ORGANIZER
    ),
    registrationController.getParticipants
);

export default router;