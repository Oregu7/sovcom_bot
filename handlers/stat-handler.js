const { SessionModel, MessageModel } = require("../models");

module.exports = async(ctx) => {
    const [
        percent,
        uniqUsers,
        sessionStat,
    ] = await Promise.all([
        MessageModel.getPercentOfSuccessful(),
        MessageModel.getCountOfUniqUsers(),
        SessionModel.getAverageTimeAndCount(),
    ]);
    const message = "📈<b>Статистика бота</b>\n\n" +
        `▫️ Процент успешных ответов Бота: <b>${percent.Percent} %</b>\n` +
        `▫️ Количество сессий: <b>${sessionStat.Count}</b>\n` +
        `▫️ Среднее время сессии: <b>${sessionStat.AvgTime} сек</b>\n` +
        `▫️ Количество уникальных клиентов: <b>${uniqUsers.Count}</b>`;

    return ctx.replyWithHTML(message);
};