require("dotenv/config");
const orm = require(`./${process.env.DB_TYPE}`);
const baseManagerProfileSchema = require("./config").managerProfile;
const ManagerProfileSchemaDescription = orm.convert(baseManagerProfileSchema);
const ManagerProfileSchema = orm.createSchema(ManagerProfileSchemaDescription);
if(process.env.DB_TYPE === "mongo"){
    ManagerProfileSchema.options.toJSON = {
        transform: function (doc, ret, options) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    }
}
module.exports = orm.compileModel("managerProfile", ManagerProfileSchema);
