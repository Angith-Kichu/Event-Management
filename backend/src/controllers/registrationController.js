import asyncHandler from "../utils/asyncHandler.js";
import registrationService from "../services/registrationService.js";

const register = asyncHandler(async (req, res) => {

    const registration =
        await registrationService.register(
            req.user.id,
            req.params.id
        );

    res.status(201).json({
        success: true,
        message: "Registration successful.",
        data: registration,
    });

});

const getParticipants = asyncHandler(async (req, res) => {

    const participants =
        await registrationService.getParticipants(
            req.params.id
        );

    res.json({
        success: true,
        data: participants,
    });

});

export default {
    register,
    getParticipants,
};