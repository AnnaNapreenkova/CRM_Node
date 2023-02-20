const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const auth = require("../middleware/auth");

const User = require("../model/User");
//Профили
const ClientProfile = require("../model/ClientProfile");
const ManagerProfile = require("../model/ManagerProfile");

const Agreement = require("../model/Agreement");
const Services = require("../model/Services")
// const ServerLink = "http://localhost:5000/";
const ServerLink = process.env.FULLLINK;


//Получение услуг клиента
module.exports.getServicesMiddleware = auth;
module.exports.getServicesFunction = async (req, res) => {
  try {
    let services = await Services.find({ client: req.user.id });
    console.log("services", services)
    res.status(200).json(services);
  } catch (err) {
    console.log(err);
    res
        .status(500)
        .json({msg: "Error in fetching services" })
  }
}


//Получение договоров клиента
module.exports.getAgreementsMiddleware = auth;
module.exports.getAgreementsFunction = async (req, res) => {
  try {
    let agreements = await Agreement.find({ client: req.user.id });
    console.log("agreements", agreements)
    res.status(200).json(agreements);
  } catch (err) {
    console.log(err);
    res
        .status(500)
        .json({msg: "Error in fetching services" })
  }
}


// Получение данных профиля клиента 
module.exports.clientProfileGetMiddleware = auth;
module.exports.clientProfileGetFunction = async (req, res) => {
  try {
    const profile = await ClientProfile.get({user: req.user.id});
    if (profile) {
      res.json(profile);
    } else {
      res.status(404).json({ msg: "Not found" });
    }
  } catch (err) {
    res.status(500).json({ msg: "Error in Fetching User" });
  }  
}

//Изменение данных клиентского профиля
module.exports.clientProfilePatchMiddleware = auth;
module.exports.clientProfilePatchFunction = async (req, res) => {
  
  
  
  try {
    let profileInfo = { ...req.body, id: req.params.id};

    try {
      await ClientProfile.save(profileInfo);
    } catch (error) {
      console.log(err);
      res.status(500).json({ error: "Error on saving" });
      return
    }    

    let clientprofile = await ClientProfile.findById(req.params.id);

    res.status(200).json({
      msg: "Updated",     
      data: clientprofile
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error on saving" });
  }
}