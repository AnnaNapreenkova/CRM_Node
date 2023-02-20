require("dotenv/config");
const orm = require(`./${process.env.DB_TYPE}`);
const baseAgreementSchema = require("./config").agreements;
const AgreementSchemaDescription = orm.convert(baseAgreementSchema);
const AgreementSchema = orm.createSchema(AgreementSchemaDescription);
module.exports = orm.compileModel("agreement", AgreementSchema);
