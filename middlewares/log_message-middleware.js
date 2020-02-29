const { MessageModel } = require("../models");

module.exports = (ctx, next) => {
    const {
        from: { id: userId },
        text = "",
        message_id: messageId,
    } = ctx.message;

    MessageModel.create({
        message_id: messageId,
        user_id: userId,
        text,
        session_id: ctx.session.id,
        date: new Date(),
    });

    return next();
};