import app from "./src/app.js";
import { env } from "./src/config/env.js";
import { connectDB } from "./src/config/db.js";

const PORT = env.port;

const startserver = async () => {

    await connectDB();

    app.listen(PORT, () => {
        console.log(`
    ====================================
    🚀 Server is Running
    🌐 http://localhost:${PORT}
    📦 Environment: ${env.nodeEnv}
    ====================================
    `);
    });
}

startserver();