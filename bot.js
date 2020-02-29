const config = require("config");
const Telegraf = require("telegraf");
const middlewares = require("./middlewares");
const handlers = require("./handlers");

const bot = new Telegraf(config.get("bot.token"));
// middlewares
bot.use(middlewares.session);
bot.use(middlewares.logMessage);
bot.use(middlewares.context);