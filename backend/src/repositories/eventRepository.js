import pool from "../config/db.js";

export async function createEvent(event) {
  const query = `
    INSERT INTO events (
      title,
      description,
      banner_url,
      venue,
      start_date,
      end_date,
      max_participants,
      registration_deadline,
      status,
      created_by
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
    RETURNING *;
  `;

  const values = [
    event.title,
    event.description,
    event.banner_url,
    event.venue,
    event.start_date,
    event.end_date,
    event.max_participants,
    event.registration_deadline,
    event.status,
    event.created_by,
  ];

  const { rows } = await pool.query(query, values);

  return rows[0];
}

export async function getAllEvents() {
  const query = `
    SELECT
      e.*,
      u.name AS organizer
    FROM events e
    JOIN users u
      ON e.created_by = u.id
    ORDER BY start_date ASC;
  `;

  const { rows } = await pool.query(query);

  return rows;
}

export async function getById(id) {
  const query = `
    SELECT
      e.*,
      u.name AS organizer
    FROM events e
    JOIN users u ON e.created_by = u.id
    WHERE e.id = $1;
  `;

  const { rows } = await pool.query(query, [id]);

  return rows[0] || null;
}

export async function updateEvent(id, data) {
  const query = `
    UPDATE events
    SET
      title = $1,
      description = $2,
      banner_url = $3,
      venue = $4,
      start_date = $5,
      end_date = $6,
      max_participants = $7,
      registration_deadline = $8,
      status = $9
    WHERE id = $10
    RETURNING *;
  `;

  const values = [
    data.title,
    data.description,
    data.banner_url,
    data.venue,
    data.start_date,
    data.end_date,
    data.max_participants,
    data.registration_deadline,
    data.status,
    id,
  ];

  const { rows } = await pool.query(query, values);

  return rows[0];
}

export async function deleteEvent(id) {
  const query = `
    UPDATE events
    SET status='CANCELLED'
    WHERE id=$1
    RETURNING *;
  `;

  const { rows } = await pool.query(query, [id]);

  return rows[0];
}

export default {
  createEvent,
  getAllEvents,
  getById,
  updateEvent,
  deleteEvent
}
