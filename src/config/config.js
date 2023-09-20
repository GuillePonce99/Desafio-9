import dotenv from "dotenv"

const environment = "PRODUCTION"

dotenv.config({
    path: environment === "PRODUCTION" ? "./.env.prod" : "./.env.dev"
})

export default {
    PORT: process.env.PORT,
    MONGO_DB: process.env.MONGO_DB,
    MONGO_URI: process.env.MONGO_URI,
    MONGO_USER: process.env.MONGO_USER,
    MONGO_PASSWORD: process.env.MONGO_PASSWORD,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    GITHUB_CALLBACK_URL: process.env.GITHUB_CALLBACK_URL,
    COOKIE_KEY: process.env.COOKIE_KEY,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD
}