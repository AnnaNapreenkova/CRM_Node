const {DataTypes} = require('sequelize');
const sequelize = require("../sequelize");
module.exports = {
	convert: (model)=>{
		return Object.keys(model).reduce(
			(out, field)=>{
				const newField = {};
				if(model[field].type === "String")
					newField.type = DataTypes.STRING;
				else if(model[field].type === "Text")
					newField.type = DataTypes.TEXT;
				else if(model[field].type === "Boolean")
					newField.type = DataTypes.BOOLEAN;
				else if(model[field].type === "Number")
					newField.type = DataTypes.NUMERIC;
				else if(model[field].type === "Integer")
					newField.type = DataTypes.INTEGER;
				else if(model[field].type === "ObjectId")
					newField.type = DataTypes.INTEGER;///Нужно описание внешнего ключа
				else newField.type = DataTypes.STRING;

				if("default" in model[field])
					newField.defaultValue = model[field].default;
				
				if(model[field].required)
					newField.allowNull = false;
				
				if("enum" in model[field])
					newField.enum = model[field].enum;
				
				out[field] = newField;
				return out;
			},
			{
				id: {
					allowNull: false,
					autoIncrement: true,
					primaryKey: true,
					type: DataTypes.INTEGER
				},
			}
		);
		
	},
		
	createSchema: (schema)=>schema,
	compileModel: (name, schema)=>{
		const Model = sequelize.define(name, schema);
		Model.find = async function(query){
			data = await this.findAll({where: query});
			return data.map(x=>x.dataValues);
		};
		Model.get = async function(query){
			data = await this.findOne({where: query});
			if(data==null) return null;
			return data.dataValues;
		};
		Model.findById = function(id){
			return this.get({id});
		};
		Model.findBy = async function({query, sort, limit}){
			let sortVal = this.findAll({where: query});
			if (sort) {
				sortVal = sortVal.sort(sort);
			} 

			if (limit) {
				sortVal = sortVal.limit(limit);
			} 

			return (await sortVal).dataValues;
		};
		Model.save = async function(data){
			if(data.id){
				await this.update(data, {where: {id: data.id}});
				return (await this.get({id: data.id})).dataValues;
			}else{
				return (await this.create(data)).dataValues;
			}
		};
		return Model;
	},
	convertQuery: (q)=>q,
}
