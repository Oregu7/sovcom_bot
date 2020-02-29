const _ = require("lodash");
const Sequelize = require("sequelize");
const db = require("./db");

const BOT_ID = require("config").get("bot.id");

const MessageModel = db.define("message", {
    id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
    },
    message_id: Sequelize.INTEGER(20),
    user_id: Sequelize.INTEGER(20),
    session_id: Sequelize.INTEGER(11),
    text: Sequelize.STRING(4000),
    date: Sequelize.DATE,
}, { timestamps: false });

MessageModel.saveUserMessage = async function(ctx) {
    const {
        from: { id: userId },
        text = "",
        message_id: messageId,
    } = ctx.message;
    const sessionID = getSessionID(ctx);
    if (_.isNull(sessionID)) return null;

    return await this.create({
        message_id: messageId,
        user_id: userId,
        text,
        session_id: sessionID,
        date: new Date(),
    });
};

MessageModel.saveBotMessage = async function(ctx, text, messageId) {
    const sessionID = getSessionID(ctx);
    if (_.isNull(sessionID)) return null;

    return await this.create({
        message_id: messageId,
        user_id: BOT_ID,
        text,
        session_id: sessionID,
        date: new Date(),
    });
};

MessageModel.getPercentOfSuccessful = async function() {
    const query = `SELECT (SELECT COUNT(*) FROM messages WHERE text != "Я тебя не понимаю" AND user_id=${BOT_ID}) / COUNT(*) * 100 as Percent
    FROM messages
    WHERE user_id=${BOT_ID}`;

    const [result] = await db.query(query);
    return result[0];
};

MessageModel.getCountOfUniqUsers = async function() {
    const query = `SELECT count(DISTINCT user_id) as Count
    FROM messages 
    WHERE date >= date_sub(now(), INTERVAL 1 HOUR) AND user_id != ${BOT_ID};`;

    const [result] = await db.query(query);
    return result[0];
};

function getSessionID(ctx) {
    const { id = null } = ctx.session || {};
    return id;
}

module.exports = MessageModel;