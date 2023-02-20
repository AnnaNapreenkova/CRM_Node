require("dotenv/config");
const orm = require(`./${process.env.DB_TYPE}`);
const baseMessageSchema = require("./config").message;
const MessageSchemaDescription = orm.convert(baseMessageSchema);
const MessageSchema = orm.createSchema(MessageSchemaDescription);
module.exports = orm.compileModel("message", MessageSchema);