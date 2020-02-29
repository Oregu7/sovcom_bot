// загружаем переменные окружения
require("dotenv").config();
// необходимые переменные окружения
const REQUIRED_VARIABLES = [
    "NODE_ENV",
    "BOT_TOKEN",
    "BOT_USERNAME",
    "DB_NAME",
    "DB_USER",
    "DB_PASSWORD",
];
REQUIRED_VARIABLES.forEach((name) => {
    if (!process.env[name]) {
        throw new Error(`Environment variable ${name} is missing`);
    }
});
// загружаем компоненты
const constants = require("./constants");

// шарим конфиг
module.exports = {
    constants,
    env: process.env.NODE_ENV,
    bot: {
        username: process.env.BOT_USERNAME,
        token: process.env.BOT_TOKEN,
    },
    database: {
        name: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
    },
};