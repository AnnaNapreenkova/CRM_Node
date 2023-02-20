const { Sequelize, Op } = require("sequelize");
require("dotenv/config");
sequelize = new Sequelize(
	process.env.MYSQL_BD_NAME,
	process.env.MYSQL_BD_USER,
	process.env.MYSQL_PASSWORD,
	{
		//port: process.env.MYSQL_DB_PORT,
		host: process.env.MYSQL_DB_HOST,
		dialect: "mysql",
		operatorsAliases: {
			$eq: Op.eq,
			$ne: Op.ne,
			$gte: Op.gte,
			$gt: Op.gt,
			$lte: Op.lte,
			$lt: Op.lt,
			$not: Op.not,
			//is
			//in
			//notIn
			//like
			//notLike
			//iLike
			//notILike
			//startsWith
			//endsWith
			//substring
			//regexp
			//notRegexp
			//iRegexp
			//notIRegexp
			//between
			//notBetween
			//overlap
			//contains
			//contained
			//adjacent
			//strictLeft
			//strictRight
			//noExtendRight
			//noExtendLeft
			$and: Op.and,
			$or: Op.or,
			//any
			//all
			//values
			//col
			//placeholder
			//join
			//match
  }
});
module.exports = sequelize;
