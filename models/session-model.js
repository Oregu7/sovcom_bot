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
}, { timestamps: false });

SessionModel.getAverageTimeAndCount = async function() {
    const query = `SELECT count(*) as Count, avg(TIMESTAMPDIFF(SECOND, start_time, end_time)) as AvgTime
    FROM sessions 
    WHERE end_time > start_time AND start_time >= date_sub(now(), INTERVAL 1 HOUR)`;

    const [result] = await db.query(query);
    return result[0];
};

module.exports = SessionModel;