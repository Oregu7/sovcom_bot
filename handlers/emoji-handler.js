const { Answer, AnswerCollection } = require("../components/answer");
const defaultAnswers = require("../data/default_answers.json");
const joyAnswers = require("../data/joy_answers.json");
const sadnessAnswers = require("../data/sadness_answers.json");
const angerAnswers = require("../data/anger_answers.json");

const answers = new AnswerCollection(
    new Answer(...defaultAnswers),
    new Answer(...joyAnswers),
    new Answer(...sadnessAnswers),
    new Answer(...angerAnswers),
);

module.exports = (emojiType) => (ctx) => {
    const { context = "" } = ctx.data;
    const message = answers.getRandomByContextAndEmojiType(context, emojiType);
    // set context
    ctx.data.context = emojiType;
    return ctx.reply(message);
};