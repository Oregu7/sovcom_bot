const MessageModel = require("./message-model");
const SessionModel = require("./session-model");

// use associate
MessageModel.belongsTo(SessionModel, {
    foreignKey: "session_id",
    targetKey: "id",
});

module.exports = {
    MessageModel,
    SessionModel,
};