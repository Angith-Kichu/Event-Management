import pkg from "pg";
import { env } from "./env.js";

const { Pool } = pkg;

const pool = new Pool({
    connectionString: env.database.url,
    ssl: {
        rejectUnauthorized: false,
    },
});

export async function connectDB() {
    try {
        const client = await pool.connect();

        console.log("✅ Connected to Supabase PostgreSQL");

        client.release();
    } catch (error) {
        console.error("❌ Database Connection Failed");
        console.error(error.message);

        process.exit(1);
    }
}

export default pool;