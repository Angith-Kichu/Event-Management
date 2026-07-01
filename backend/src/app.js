import express from "express";

import {
    authRoutes,
    userRoutes,
    eventRoutes,
    registrationRoutes,
} from "./routes/index.js";

import { errorMiddleware } from "./middlewares/index.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Event Management API Running 🚀",
    });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/registrations", registrationRoutes);

// 404 Handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found.",
    });
});

// Global Error Handler
app.use(errorMiddleware);

export default app;