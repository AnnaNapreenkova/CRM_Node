const { transformUser } = require("../scripts/transform");
require("dotenv/config");
const orm = require(`./${process.env.DB_TYPE}`);
const baseClientProfileSchema = require("./config").ClientProfile;
const ClientProfileSchemaDescription = orm.convert(baseClientProfileSchema);
const ClientProfileSchema = orm.createSchema(ClientProfileSchemaDescription);
if(process.env.DB_TYPE === "mongo"){
    ClientProfileSchema.options.toJSON = {
        transform: function (doc, ret, options) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    }
}
module.exports = orm.compileModel("ClientProfile", ClientProfileSchema);
