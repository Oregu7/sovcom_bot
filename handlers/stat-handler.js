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
        `▫️ Процент успешных ответов Бота: <b>${roundValue(percent.Percent)} %</b>\n` +
        `▫️ Количество сессий: <b>${sessionStat.Count}</b>\n` +
        `▫️ Среднее время сессии: <b>${roundValue(sessionStat.AvgTime)} сек</b>\n` +
        `▫️ Количество уникальных клиентов: <b>${uniqUsers.Count}</b>`;

    return ctx.replyWithHTML(message);
};

function roundValue(value, fractionDigidts) {
    return Number(value || 0).toFixed(fractionDigidts);
}