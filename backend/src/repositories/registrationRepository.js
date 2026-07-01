import pool from "../config/db.js";

export async function registerUser(userId, eventId) {
  const query = `
    INSERT INTO registrations (
      user_id,
      event_id
    )
    VALUES ($1,$2)
    RETURNING *;
  `;

  const { rows } = await pool.query(query, [
    userId,
    eventId,
  ]);

  return rows[0];
}

export async function isAlreadyRegistered(userId, eventId) {
  const query = `
    SELECT id
    FROM registrations
    WHERE user_id = $1
    AND event_id = $2;
  `;

  const { rows } = await pool.query(query, [
    userId,
    eventId,
  ]);

  return rows.length > 0;
}

export async function getParticipants(eventId) {
  const query = `
    SELECT
      u.id,
      u.name,
      u.email,
      r.registered_at
    FROM registrations r
    JOIN users u
      ON r.user_id = u.id
    WHERE r.event_id = $1;
  `;

  const { rows } = await pool.query(query, [eventId]);

  return rows;
}

export default {
  registerUser,
  isAlreadyRegistered,
  getParticipants,
}