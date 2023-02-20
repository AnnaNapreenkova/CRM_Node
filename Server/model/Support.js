require("dotenv/config");
const orm = require(`./${process.env.DB_TYPE}`);
const baseSupportSchema = require("./config").support;
const SupportSchemaDescription = orm.convert(baseSupportSchema);
const SupportSchema = orm.createSchema(SupportSchemaDescription);
module.exports = orm.compileModel("chat", SupportSchema);
