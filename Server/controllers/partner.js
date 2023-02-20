const { check, validationResult } = require("express-validator");

const User = require("../model/User");
const ClientProfile = require("../model/ClientProfile");
const Agreement = require("../model/Agreement");
const Services = require("../model/Services");
const Notification = require("../model/Notification");
const sendRegistrationEmail = require("../mails/registration");

const auth = require("../middleware/auth");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const PartnerProfile = require("../model/PartnerProfile");
const { notification } = require("../model/config");
const ServerLink = process.env.FULLLINK;

module.exports.ClientPostMiddleware = [
  auth,
];
module.exports.ClientPostFunction = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  const client = { ...req.body };
  const partner = req.user.id;
  //console.log(req);
  console.log("client", client);
  console.log("req body", req.body);
  console.log("req user", req.user.id);
  const email = client.email
  const phone = client.phone
  const role = client.role
  const surname = client.surname
  const name = client.name
  const patronim = client.patronim

  try {
    // Проверка на наличие юзера
    let user = await User.get({
      email,
    });
    if (user) {
      return res.status(411).json({
        msg: "Email Already Registered",
      });
    }
    user = await User.get({
      phone,
    });
    if (user) {
      return res.status(412).json({
        msg: "Phone Already Registered"
      });
    }
    // Проверка на наличие юзера      

    let password = "7777";
    user = {
      phone,
      email,
      password,
      role,
      surname,
      name, 
      patronim
    };

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    user = await User.save(user);

    sendRegistrationEmail(email, { email: email, password: password });  

    const data = {
        user: {
            id: user.id,
        },
    };        

    jwt.sign(
      data,
      "randomString",
      (err, token) => {
          if (err) throw err;             
      }
  );   
  
  const serviceList = [
    "Collocation",
    "Разработка сайта",
    "Администрирование серверов",
    "Доработка 1С",
    "Сопровождение 1С",
    "Облачное хранилище",
  ]
  
  // let new_service = {
  //   client: user.id,
  //   service_type: client.service,
  //   service_price: client.serviceprice,
  //   service_status: "not_purchased",
  //   end_data: client.end_data,
  //   days: client.days
  // };
  // new_service = await Services.save(new_service);

  // let new_agreement = {
  //   client: user.id,
  //   services: new_service.id, 
  //   doc_number: client.agreement,
  //   doc_type: "agreement",
  //   doc_name: `Договор на услугу ${serviceList[client.service]}`,
  //   doc_status: "pending"
  // };
  // new_agreement = await Agreement.save(new_agreement);

  console.log("req.user", req.user);

  const partnerAccount = await User.findById(partner);


  let notificationdata = {
    
    from: req.user.id,
    type: "service",
    title: 'Добавление сервиса для клиента партнера',
    text: `Партнер ${partnerAccount.surname} ${partnerAccount.name} ${partnerAccount.patronim} попросил добавить услугу ${serviceList[client.service]}  для своего клиента ${surname} ${name} ${patronim}`,
    link: `detail/${user.id}`,
  };

  admins = await User.find({role: "Admin"});

  admins.forEach(async(user) => {
    notificationdata.user = user.id;      
    partnerNotification = await Notification.save(notificationdata);
  });
 

  let clientProfile = {
    user: user.id,
    partner: partner,
    is_admin: true,
    // agreement: new_agreement.id,
    // service: new_service.id,   
    name: client.orgName,
    inn: client.inn,
    kpp: client.kpp,
    ogrn: client.ogrn,
    person: client.person,
    post: client.post

  };


  clientProfile = await ClientProfile.save(clientProfile);

  res.status(201).json({
    user: user,
    profile: clientProfile,
    notification: partnerNotification,
    // agreement: new_agreement,
    // service: new_service,
  });              
  

    // profile = { user: user.id, partner: partner, is_admin: false };
    // profile = await ClientProfile.save(profile);
    // res.status(201).json({
    //   user: user,
    //   profile: profile,
    // });
  } catch (err) {
    console.log(err)
    res
      .status(500)
      .json({ msg: "Error in saving" })
  }
};

module.exports.ClientGetMiddleware = auth;

module.exports.ClientGetFunction = async (req, res) => {
  try {
    // let clients = await ClientProfile.find({
    //   partner: req.user.id,
    // }).populate("user");
    let clients = await ClientProfile.find({
      partner: req.user.id,
    });
   
    clients = await Promise.all(
      clients.map(async (client) =>
      ({
        ...client,
        user: await User.findById(client.user),
        
      })
      )
    );

    clients.forEach(client => {
      if(client.user.img) {
        client.user.img = ServerLink + client.user.img;
      }
    });

    console.log("clients", clients);
    
    res.json(clients);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error in Fetching ", error: err });
  }
};

//  
module.exports.PartnerProfileGetMiddleware = auth;
module.exports.PartnerProfileGetFunction = async (req, res) => {
  try {
    const profile = await PartnerProfile.get({ user: req.user.id });
    if (profile) {
      res.json(profile);
    } else {
      res.status(404).json({ msg: "Not found" });
    }
  } catch (err) {
    res.status(500).json({ msg: "Error in Fetching User" });
  }
}

//Изменение данных партнерского профиля
module.exports.PartnerProfilePatchMiddleware = auth;
module.exports.PartnerProfilePatchFunction = async (req, res) => {

  try {
    let profileInfo = { ...req.body, id: req.params.id };

    try {
      await PartnerProfile.save(profileInfo);
    } catch (error) {
      console.log(err);
      res.status(500).json({ error: "Error on saving" });
      return
    }

    let partnerprofile = await PartnerProfile.findById(req.params.id);

    res.status(200).json({
      msg: "Updated",
      data: partnerprofile
    });


  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error on saving" });
  }
}


//Создание услуги партнером
module.exports.partnerCreateServiceMiddleware = auth;
module.exports.partnerCreateServiceFunction = async (req, res) => {

  try {
    const {client, service_type, service_price, service_status, end_data, days, agreement} = {...req.body};

    let serviceList = [
      "Collocation",
      "Разработка сайта",
      "Администрирование серверов",
      "Доработка 1С",
      "Сопровождение 1С",
      "Облачное хранилище",
    ]

    let new_service = {
      client: client,
      service_type: service_type,
      service_price: service_price,
      service_status: service_status,
      end_data: end_data,
      days: days
    };

    new_service = await Services.save(new_service);

    let new_agreement = {
      client: client,
      services: new_service.id, 
      doc_number: agreement,
      doc_type: "agreement",
      doc_name: `Договор на услугу ${serviceList[service_type]}`,
      doc_status: "pending"
    };
    new_agreement = await Agreement.save(new_agreement);

    let clientProfile = await ClientProfile.get({user: client});

    console.log("client", client);
    console.log("clientProfile", clientProfile);

    let profileInfo = { agreement: new_agreement.id, service: new_service.id, id: clientProfile.id };

    console.log("profileInfo", profileInfo);

    try {
      console.log("Проверка1");
      await ClientProfile.save(profileInfo);
      console.log("Проверка2");
    } catch (error) {
      console.log("errorprofile", error);
      res.status(500).json({ error: "Error on saving" });
      return
    }

    clientProfile = await ClientProfile.get({user: client});
    
    res.status(201).json({      
      service: new_service,
      agreement: new_agreement,
      clientProfile: clientProfile
    });   
    
  } catch (err) {
    console.log(err);
    res
        .status(500)
        .json({msg: "Error in fetching" })
  }

};


//Получение списка своих услуг партнером
module.exports.partnerGetServicesMiddleware = auth;
module.exports.partnerGetServicesFunction = async (req, res) => {
  try {
    let services = await Services.find({client: req.user.id});
    res.status(200).json(services);
  } catch (err) {
    console.log(err);
    res
        .status(500)
        .json({msg: "Error in fetching" })
  }
}


//Получение списка своих договоров партнером
module.exports.partnerGetAgreementsMiddleware = auth;
module.exports.partnerGetAgreementsFunction = async (req, res) => {
  try {
    let agreements = await Agreement.find({client: req.user.id});
    res.status(200).json(agreements);
  } catch (err) {
    console.log(err);
    res
        .status(500)
        .json({msg: "Error in fetching" })
  }
}


//Получение конкретную услугу партнером
module.exports.partnerGetServiceMiddleware = auth;
module.exports.partnerGetServiceFunction = async (req, res) => {
  try {
    let service = await Services.get({id: req.params.id});
    res.status(200).json(service);
  } catch (err) {
    console.log(err);
    res
        .status(500)
        .json({msg: "Error in fetching" })
  }
}