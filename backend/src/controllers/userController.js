import asyncHandler from "../utils/asyncHandler.js";
import userService from "../services/userService.js";
import storageService from "../services/storageService.js";

const getProfile = asyncHandler(async (req, res) => {

    const user = await userService.getProfile(req.user.id);

    res.json({
        success: true,
        data: user,
    });

});

const updateProfile = asyncHandler(async (req, res) => {

    // If a new profile image file is uploaded, upload to S3 and clean up old one
    if (req.file) {
        const currentUser = await userService.getProfile(req.user.id);

        // Delete old profile image from S3 if it exists
        if (currentUser.profile_image) {
            await storageService.deleteImage(currentUser.profile_image);
        }

        req.body.profile_image = await storageService.uploadImage(
            req.file,
            "profiles"
        );
    }

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