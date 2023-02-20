const mongoose = require("mongoose");
module.exports = {

	convert: (model)=>{
		return Object.keys(model).reduce(
			(out, field)=>{
				const newField = {};
				if(model[field].type === "String")
					newField.type = String;
				if(model[field].type === "Text")
					newField.type = String;
				else if(model[field].type === "Boolean")
					newField.type = Boolean;
				else if(model[field].type === "Number")
					newField.type = Number;
				else if(model[field].type === "Integer")
					newField.type = Number;
				else if(model[field].type === "ObjectId"){
					newField.type = mongoose.Schema.Types.ObjectId;
					if("ref" in model[field])
						newField.ref = model[field].ref
				}
				else newField.type = String;

				if("default" in model[field])
					newField.default = model[field].default;

				if(model[field].required)
					newField.required = true;
				if("enum" in model[field])
					newField.enum = model[field].enum;
				
				
				out[field] = newField;
				return out;
			},
			{}
		);
		
	},
	createSchema: (schema)=>mongoose.Schema(schema),
	classFromModel: (name, schema)=>mongoose.model(name, schema),
	convertQuery: (q)=>q,
}
