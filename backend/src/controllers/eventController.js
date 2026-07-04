import asyncHandler from "../utils/asyncHandler.js";
import eventService from "../services/eventService.js";
import storageService from "../services/storageService.js";

const createEvent = asyncHandler(async (req, res) => {

    let banner_url = null;

    if (req.file) {
        banner_url = await storageService.uploadImage(
            req.file,
            "events"
        );
    }

    const event = await eventService.createEvent({
        ...req.body,
        banner_url,
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

    // If a new banner file is uploaded, upload to S3 and clean up old one
    if (req.file) {
        const existingEvent = await eventService.getEvent(req.params.id);

        // Delete old banner from S3 if it exists
        if (existingEvent.banner_url) {
            await storageService.deleteImage(existingEvent.banner_url);
        }

        req.body.banner_url = await storageService.uploadImage(
            req.file,
            "events"
        );
    }

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