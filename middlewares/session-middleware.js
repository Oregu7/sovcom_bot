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
        if (ctx.session) {
            console.log(`close session: ${ctx.session.id}`);
            SessionModel.update({ end_time: new Date() }, { where: { id: ctx.session.id } });
        }
        ctx.session = null;
    }
}, minuteMilliseconds, moduleContext);

module.exports = async(ctx, next) => {
    moduleContext.lastMessageDate = Date.now();
    if (!moduleContext.session) {
        let date = new Date();
        moduleContext.session = await SessionModel.create({ start_time: date, end_time: date });
    }
    ctx.session = moduleContext.session;

    return next();
};