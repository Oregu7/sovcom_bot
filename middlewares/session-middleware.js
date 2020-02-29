const { SessionModel } = require("../models");

const moduleContext = {
    lastMessageDate: 0,
    session: null,
};
const minuteMilliseconds = 1000 * 60;

// session cleaner
setInterval((ctx) => {
    const currentDate = Date.now();
    if (currentDate - ctx.lastMessageDate >= minuteMilliseconds) {
        const session = ctx.session;
        ctx.session = null;

        session.end_time = new Date();
        session.save();
    }
}, minuteMilliseconds, moduleContext);

module.exports = async(ctx, next) => {
    moduleContext.lastMessageDate = Date.now();
    if (!moduleContext.session) {
        moduleContext.session = await SessionModel.create({ start_time: new Date() });
    }
    ctx.session = moduleContext.session;

    return next();
};