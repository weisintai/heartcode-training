import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

// Create a PostgreSQL connection pool
const pool = new Pool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432"),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: process.env.DATABASE_URL ? true : false,
});

// Create and export the database instance
export const db = drizzle(pool);
