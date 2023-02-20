
require("dotenv/config");
const orm = require(`./${process.env.DB_TYPE}`);
const baseAdminProfileSchema = require("./config").adminProfile;
const AdminProfileSchemaDescription = orm.convert(baseAdminProfileSchema);
const AdminProfileSchema = orm.createSchema(AdminProfileSchemaDescription);
module.exports = orm.compileModel("adminProfile", AdminProfileSchema);
