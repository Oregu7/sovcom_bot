const { MessageModel } = require("../models");

module.exports = async(ctx) => {
    ctx.data.context = "";
    const message = "Я тебя не понимаю";
    // send && save bot message
    const { message_id: messageId } = await ctx.reply(message);
    return MessageModel.saveBotMessage(ctx, message, messageId);
};