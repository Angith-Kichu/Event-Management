import eventRepository from "../repositories/eventRepository.js";

import { EventStatus }
    from "../models/index.js";

import { BadRequestError, NotFoundError } from "../errors/index.js";

export async function createEvent(data) {

    if (new Date(data.end_date)
        < new Date(data.start_date)) {
        throw new BadRequestError(
            "End date cannot be before start date."
        );
    }

    if (data.max_participants <= 0) {
        throw new BadRequestError(
            "Invalid participant count."
        );
    }

    data.status =
        EventStatus.UPCOMING;

    return await eventRepository.createEvent(data);
}

export async function getEvents() {

    return await eventRepository.getAllEvents();
}

export async function getEvent(id) {

    const event =
        await eventRepository.getById(id);

    if (!event)
        throw new NotFoundError("Event not found.");

    return event;
}

export async function updateEvent(id, data) {

    const event =
        await eventRepository.getById(id);

    if (!event)
        throw new NotFoundError("Event not found.");

    return await eventRepository.updateEvent(
        id,
        data
    );
}

export async function deleteEvent(id) {

    return await eventRepository.deleteEvent(id);
}

export default {
    createEvent,
    getEvents,
    getEvent,
    updateEvent,
    deleteEvent,
};
