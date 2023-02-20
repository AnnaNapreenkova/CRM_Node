require("dotenv/config");
const orm = require(`./${process.env.DB_TYPE}`);
const baseNotificationSchema = require("./config").notification;
const NotificationSchemaDescription = orm.convert(baseNotificationSchema);
const NotificationSchema = orm.createSchema(NotificationSchemaDescription);
module.exports = orm.compileModel("notification", NotificationSchema);
