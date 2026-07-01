import pool from "../config/db.js";

export async function createUser(user) {
  const query = `
    INSERT INTO users (
      name,
      email,
      password,
      role,
      profile_image
    )
    VALUES ($1,$2,$3,$4,$5)
    RETURNING id,
              name,
              email,
              role,
              profile_image,
              created_at,
              updated_at;
  `;

  const values = [
    user.name,
    user.email,
    user.password,
    user.role,
    user.profile_image,
  ];

  const { rows } = await pool.query(query, values);

  return rows[0];
}

export async function findByEmail(email) {
  const query = `
    SELECT *
    FROM users
    WHERE email = $1;
  `;

  const { rows } = await pool.query(query, [email]);

  return rows[0] || null;
}

export async function findById(id) {
  const query = `
    SELECT
      id,
      name,
      email,
      role,
      profile_image,
      created_at,
      updated_at
    FROM users
    WHERE id = $1;
  `;

  const { rows } = await pool.query(query, [id]);

  return rows[0] || null;
}

export async function updateProfile(id, data) {
  const query = `
    UPDATE users
    SET
      name = $1,
      profile_image = $2
    WHERE id = $3
    RETURNING
      id,
      name,
      email,
      role,
      profile_image,
      created_at,
      updated_at;
  `;

  const values = [
    data.name,
    data.profile_image,
    id,
  ];

  const { rows } = await pool.query(query, values);

  return rows[0];
}

export default {
  createUser,
  findByEmail,
  findById,
  updateProfile
}