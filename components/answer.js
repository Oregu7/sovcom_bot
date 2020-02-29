const _ = require("lodash");

class Answer {
    constructor(joy, sadness, anger) {
        this._validateProperties(joy, sadness, anger);

        this.joy = joy;
        this.sadness = sadness;
        this.anger = anger;
    }

    _validateProperties(...props) {
        for (let prop of props)
            if (!_.isArray(prop))
                throw new Error("Arguments must be arrays");
    }

    getRandomByEmojiType(emojiType) {
        const sequence = this[emojiType];
        if (!sequence)
            throw new Error("Invalid emoji type");

        return _.sample(sequence);
    }
}

class AnswerCollection {
    constructor(defaults, joy, sadness, anger) {
        this._validateProperties(defaults, joy, sadness, anger);
        this.defaults = defaults;
        this.joy = joy;
        this.sadness = sadness;
        this.anger = anger;
    }

    _validateProperties(...props) {
        for (let prop of props)
            if (!(prop instanceof Answer))
                throw new Error("Arguments must be Answer objects");
    }

    getRandomByContextAndEmojiType(context, emojiType) {
        if (!context.length) {
            return "Привет. " + this.defaults.getRandomByEmojiType(emojiType);
        }
        const answer = this[context];
        if (!answer)
            throw new Error("Invalid context");

        return answer.getRandomByEmojiType(emojiType);
    }
}

module.exports = {
    Answer,
    AnswerCollection,
};