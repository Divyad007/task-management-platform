import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
});

pool.connect()
    .then(() => {
        console.log("Database connected");
    })
    .catch((err:Error) => {
        console.log("Database connection error", err);
    });

export default pool;