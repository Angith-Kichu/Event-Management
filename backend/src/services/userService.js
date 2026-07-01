import userRepository from "../repositories/userRepository.js";

export async function getProfile(id) {

    const user =
        await userRepository.findById(id);

    if (!user)
        throw new NotFoundError("User not found.");

    return user;
}

export async function updateProfile(id, data) {

    const updated =
        await userRepository.updateProfile(
            id,
            data
        );

    return updated;
}

export default {
    getProfile,
    updateProfile,
};

