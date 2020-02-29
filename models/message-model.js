const Sequelize = require("sequelize");
const db = require("./db");

const MessageModel = db.define("message", {
    id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
    },
    message_id: Sequelize.INTEGER(20),
    user_id: Sequelize.INTEGER(20),
    session_id: Sequelize.INTEGER(11),
    text: Sequelize.STRING(4000),
    date: Sequelize.DATE,
}, { timestamps: false, freezeTableName: true });

module.exports = MessageModel;