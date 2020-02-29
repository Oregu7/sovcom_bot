const { MessageModel } = require("../models");

module.exports = (ctx, next) => {
    MessageModel.saveUserMessage(ctx);
    return next();
};