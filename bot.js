const config = require("config");
const Telegraf = require("telegraf");
const middlewares = require("./middlewares");
const handlers = require("./handlers");

const bot = new Telegraf(config.get("bot.token"));
// middlewares
bot.use(middlewares.session);
bot.use(middlewares.logMessage);
bot.use(middlewares.context);
// commands

// patterns
bot.hears(/^😀|😄|😁|😆|😂|🤣|😊|🤩|😃|🥳$/u, handlers.emoji("joy"));
bot.hears(/^🙄|😞|😔|😟|😕|🙁|☹|😩|😫|😓|😒$/u, handlers.emoji("sadness"));
bot.hears(/^👿|😬|😤|😡|👺|💀|😠|🤯|🤨$/u, handlers.emoji("anger"));
// events
bot.on("message", handlers.default);
bot.catch(console.error);

module.exports = bot;