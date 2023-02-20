require("dotenv/config");
const orm = require(`./${process.env.DB_TYPE}`);
const baseServicesSchema = require("./config").services;
const ServicesSchemaDescription = orm.convert(baseServicesSchema);
const ServicesSchema = orm.createSchema(ServicesSchemaDescription);
module.exports = orm.compileModel("services", ServicesSchema);
