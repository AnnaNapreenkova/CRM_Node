const { transformUser } = require("../scripts/transform");
require("dotenv/config");
const orm = require(`./${process.env.DB_TYPE}`);
const baseUserSchema = require("./config").users;
const UserSchemaDescription = orm.convert(baseUserSchema);
const UserSchema = orm.createSchema(UserSchemaDescription);
if(process.env.DB_TYPE === "mongo"){
	UserSchema.options.toJSON = {
		transform: transformUser,
	};
}

const User = orm.compileModel("users", UserSchemaDescription);

User.roles = new Set(["Admin", "Manager", "Partner", "AdminClient", "PartnerClient"]);

module.exports = User;
