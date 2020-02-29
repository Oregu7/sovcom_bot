const LocalSession = require("telegraf-session-local");

const property = "data";

const localSession = new LocalSession({
    database: `${property}_db.json`,
    property,
    storage: LocalSession.storageFileAsync,
    // Format of storage/database (default: JSON.stringify / JSON.parse)
    format: {
        serialize: (obj) => JSON.stringify(obj, null, 2), // null & 2 for pretty-formatted JSON
        deserialize: (str) => JSON.parse(str),
    },
});

module.exports = localSession.middleware();