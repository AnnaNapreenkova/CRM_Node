require("dotenv/config");
const orm = require(`./${process.env.DB_TYPE}`);
const basePartnerProfileSchema = require("./config").PartnerProfile;
const PartnerProfileSchemaDescription = orm.convert(basePartnerProfileSchema);
const PartnerProfileSchema = orm.createSchema(PartnerProfileSchemaDescription);
if(process.env.DB_TYPE === "mongo"){
PartnerProfileSchema.options.toJSON = {
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
       }
  }
}
module.exports = orm.compileModel("PartnerProfile", PartnerProfileSchema);
