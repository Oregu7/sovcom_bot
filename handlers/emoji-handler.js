const { Answer, AnswerCollection } = require("../components/answer");

const answers = new AnswerCollection(
    new Answer([], [], []),
    new Answer([], [], []),
    new Answer([], [], []),
    new Answer([], [], []),
);

module.exports = (emojiType) => (ctx) => {
    const { context = "" } = ctx.data;
    const message = answers.getRandomByContextAndEmojiType(context, emojiType);
    // set context
    ctx.data.context = emojiType;
    return ctx.reply(message);
};