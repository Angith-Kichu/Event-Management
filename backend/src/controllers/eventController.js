import asyncHandler from "../utils/asyncHandler.js";
import eventService from "../services/eventService.js";

const createEvent = asyncHandler(async (req, res) => {

    const event = await eventService.createEvent({
        ...req.body,
        created_by: req.user.id,
    });

    res.status(201).json({
        success: true,
        message: "Event created successfully.",
        data: event,
    });

});

const getEvents = asyncHandler(async (req, res) => {

    const events = await eventService.getEvents();

    res.json({
        success: true,
        data: events,
    });

});

const getEvent = asyncHandler(async (req, res) => {

    const event = await eventService.getEvent(req.params.id);

    res.json({
        success: true,
        data: event,
    });

});

const updateEvent = asyncHandler(async (req, res) => {

    const updated = await eventService.updateEvent(
        req.params.id,
        req.body
    );

    res.json({
        success: true,
        message: "Event updated successfully.",
        data: updated,
    });

});

const deleteEvent = asyncHandler(async (req, res) => {

    const deleted = await eventService.deleteEvent(req.params.id);

    res.json({
        success: true,
        message: "Event cancelled successfully.",
        data: deleted,
    });

});

export default {
    createEvent,
    getEvents,
    getEvent,
    updateEvent,
    deleteEvent,
};