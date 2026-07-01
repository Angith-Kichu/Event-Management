import asyncHandler from "../utils/asyncHandler.js";
import userService from "../services/userService.js";

const getProfile = asyncHandler(async (req, res) => {

    const user = await userService.getProfile(req.user.id);

    res.json({
        success: true,
        data: user,
    });

});

const updateProfile = asyncHandler(async (req, res) => {

    const updated = await userService.updateProfile(
        req.user.id,
        req.body
    );

    res.json({
        success: true,
        message: "Profile updated successfully.",
        data: updated,
    });

});

export default {
    getProfile,
    updateProfile,
};