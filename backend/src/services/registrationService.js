import registrationRepository
    from "../repositories/registrationRepository.js";

import eventRepository
    from "../repositories/eventRepository.js";

import { NotFoundError, ConflictError } from "../errors/index.js";

export async function register(userId, eventId) {

    const event =
        await eventRepository.getById(eventId);

    if (!event)
        throw new NotFoundError("Event not found.");

    const exists =
        await registrationRepository
            .isAlreadyRegistered(
                userId,
                eventId
            );

    if (exists)
        throw new ConflictError(
            "Already registered."
        );

    if (
        new Date() >
        new Date(event.registration_deadline)
    ) {
        throw new ConflictError(
            "Registration closed."
        );
    }

    return await registrationRepository
        .registerUser(
            userId,
            eventId
        );
}

export async function getParticipants(eventId) {

    return await registrationRepository
        .getParticipants(eventId);
}

export default {
    register,
    getParticipants,
};