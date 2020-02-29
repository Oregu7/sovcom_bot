const Sequelize = require("sequelize");
const db = require("./db");

const SessionModel = db.define("session", {
    id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
    },
    start_time: Sequelize.DATE,
    end_time: Sequelize.DATE,
}, { timestamps: false, freezeTableName: true });

module.exports = SessionModel;