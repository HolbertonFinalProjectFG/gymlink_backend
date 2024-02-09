const dotenv = require('dotenv')

dotenv.config();

const PORT = process.env.PORT || 3000;
const POSTGRES_USER = process.env.POSTGRES_USER || "GymLink"
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD || "POC_gimlink"
const POSTGRES_DB = process.env.POSTGRES_DB || "gymlink_db"
const DB_HOST = process.env.DB_HOST || "database"
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "YiLaeshRzfAYaiFjyVBDnintFsebaVhs"
const FRONTED_HOST = process.env.FRONTED_HOST || "http://localhost:5173"

module.exports = {
    PORT,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_DB,
    DB_HOST,
    JWT_SECRET_KEY,
    FRONTED_HOST
}