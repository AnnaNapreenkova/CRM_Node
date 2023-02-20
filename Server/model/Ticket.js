require("dotenv/config");
const orm = require(`./${process.env.DB_TYPE}`);
const baseTicketSchema = require("./config").ticket;
const TicketSchemaDescription = orm.convert(baseTicketSchema);
const TicketSchema = orm.createSchema(TicketSchemaDescription);
module.exports = orm.compileModel("ticket", TicketSchema);