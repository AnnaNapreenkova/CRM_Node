const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const { randomString, randomNumber } = require("../scripts/random");
const sendRegistrationEmail = require("../mails/registration");
const sendCallEmail = require("../mails/support");


const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const User = require("../model/User");
//Профили
const ClientProfile = require("../model/ClientProfile");
const PartnerProfile = require("../model/PartnerProfile");
const ManagerProfile = require("../model/ManagerProfile");
const AdminProfile = require("../model/AdminProfile");

const Agreement = require("../model/Agreement");
const Services = require("../model/Services")
// const ServerLink = "http://localhost:5000/";
const ServerLink = process.env.FULLLINK;


//Создание пользователей админом
module.exports.adminUserListPostMiddleware = [
    auth,
    check("phone", "Please Enter a Valid Phone").not().isEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    // check("service_type", "Пожалуйста, введите правильную тип сервиса").custom(
    //   (value, { req }) =>
    //   Services.service_type.has(value)
    // ),
  ];

module.exports.adminUserListPostFunction = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
        });
    }

    const { phone, email, role, surname, name, patronim, agreement, percent,
      service, serviceprice, end_data, days, orgName, inn, kpp, ogrn, person, post, func} = req.body;

      console.log("req.body", req.body);
      console.log("surname", surname);
      console.log("name", name);
      console.log("patronim", patronim);
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

        // let password = randomString(8);
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
        console.log("Password: ", password);
        
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
      
      

        switch (user.role) {            
            /* case "PartnerClient":
              profile = new ClientProfile({ user: user._id, partner: partner });
              break; */
              

            case "AdminClient":

              let serviceList = [
                "Collocation",
                "Разработка сайта",
                "Администрирование серверов",
                "Доработка 1С",
                "Сопровождение 1С",
                "Облачное хранилище",
              ]
              
              let new_service = {
                client: user.id,
                service_type: service,
                service_price: serviceprice,
                service_status: "not_purchased",
                end_data: end_data,
                days: days
              };
              new_service = await Services.save(new_service);

              let new_agreement = {
                client: user.id,
                services: new_service.id, 
                doc_number: agreement,
                doc_type: "agreement",
                doc_name: `Договор на услугу ${serviceList[service]}`,
                doc_status: "pending"
              };
              new_agreement = await Agreement.save(new_agreement);

              let clientProfile = {
                user: user.id,
                is_admin: true,
                agreement: new_agreement.id,
                service: new_service.id,   
                name: orgName,
                inn: inn,
                kpp: kpp,
                ogrn: ogrn,
                person: person,
                post: post

              };
              clientProfile = await ClientProfile.save(clientProfile);
              res.status(201).json({
                user: user,
                profile: clientProfile,
                agreement: new_agreement,
                service: new_service,
              });              
              break;
            case "Partner":
              let partnerProfile = {
                user: user.id,
                name: orgName,
                inn: inn,
                kpp: kpp,
                ogrn: ogrn,
                person: person,
                post: post,
                percent: percent,
                functionality: func,
              };
              partnerProfile = await PartnerProfile.save(partnerProfile);
              res.status(201).json({
                user: user,
                profile: partnerProfile,
              });                 
              break;
            case "Manager":
              let managerProfile = {user: user.id};
              managerProfile = await ManagerProfile.save(managerProfile);
              res.status(201).json({
                user: user,
                profile: managerProfile,
              });   
              break;
            default:
              break;
          }  
    } catch (err) { 
        console.log(err);
        res
            .status(500)
            .json({msg: "Error in saving"});
    }
};
//Получение клиентов админа
module.exports.adminClientListGetMiddleware = auth;
module.exports.adminClientListGetFunction = async (req, res) => {
    try {
        let users = await User.find({ role: "AdminClient" });

        users.forEach(user => {
          if(user.img) {
            user.img = ServerLink + user.img;
          }
        });
       

        res.status(200).json(users);
      } catch (err) {
        console.log(err);
        res
            .status(500)
            .json({msg: "Error in fetching"})
      }
};
//Получение партнеров админа
module.exports.adminPartnersListGetMiddleware = auth;
module.exports.adminPartnersListGetFunction = async (req, res) => {
    try {
        let users = await User.find({ role: "Partner" });

        users.forEach(user => {
          if(user.img) {
            user.img = ServerLink + user.img;
          }
        });

        res.status(200).json(users);
      } catch (err) {
        res
            .status(500)
            .json({msg: "Error in fetching"})
      }
};
//Просмотр аккаунта клиента
module.exports.adminUserDetailMiddleware = auth;
module.exports.adminUserDetailFunction = async (req, res) => {
  try {       
    let account = await User.findById(req.params.id);   
    if (account.img) {
      account.img = ServerLink + account.img;
    }     
    if (!account) return res.status(404).json({ msg: "Account not found" });           
    res.status(200).json(account);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error in fetching account");
  }
};
//Просмотр профиля клиента
module.exports.adminClientDetailMiddleware = auth;
module.exports.adminClientDetailFunction = async (req, res) => {
    try {        
        let client = await ClientProfile.get({ user: req.params.id });        
        if (!client) return res.status(404).json({ msg: "Client not found" });      
    
        let user = await User.findById(req.params.id);
        client.ban = user.isBaned;
        res.status(200).json(client);
      } catch (err) {
        console.log(err);
        res.status(500).send("Error in fetching profile");
      }
};
//Создание договора админом
module.exports.adminCreateAgreementMiddleware = auth;
module.exports.adminCreateAgreementFunction = async (req, res) => {

  try {
    let agreement = {...req.body};

    

    if (agreement.doc_type == "ext_agreement") {
      try {        
        let service = await Services.save({id: agreement.services, service_price: agreement.servicePrice, end_data: agreement.serviceDate, days: agreement.days}); 
        agreement = await Agreement.save(agreement);
        res.status(201).json({      
          agreement: agreement,
          service: service
        });   

      } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error on saving" });
        return
      }           

    } else {
      agreement = await Agreement.save(agreement);
      res.status(201).json({      
        agreement: agreement,
      });   

    }
    
    
  } catch (err) {
    console.log(err);
    res
        .status(500)
        .json({msg: "Error in fetching" })
  }


};

//Изменение соглашение с клиентом
module.exports.adminPatchAgreementMiddleware = auth;
module.exports.adminPatchAgreementFunction = async (req, res) => {
  try {
    let agreementInfo = { ...req.body, id: req.params.id };

    console.log("agreementInfo", agreementInfo);    

    try {
      await Agreement.save(agreementInfo);
      
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error on saving" });
      return
    }
    
    let agreement = await Agreement.findById(req.params.id);
    
    res.status(200).json({
      msg: "Updated",     
      data: agreement
    });
    
  } catch (err) {
    console.log(err);
    res
        .status(500)
        .json({msg: "Error in fetching services" })
  }
}


//Получение списка договоров админом
module.exports.adminGetAgreementsMiddleware = auth;
module.exports.adminGetAgreementsFunction = async (req, res) => {
  try {
    let doc = await Agreement.find();
    res.status(200).json(doc);
  } catch (err) {
    console.log(err);
    res
        .status(500)
        .json({msg: "Error in fetching" })
  }
}


//Получение списка услуг админом
module.exports.adminGetAllServicesMiddleware = auth;
module.exports.adminGetAllServicesFunction = async (req, res) => {
  try {
    let doc = await Services.find();
    res.status(200).json(doc);
  } catch (err) {
    console.log(err);
    res
        .status(500)
        .json({msg: "Error in fetching" })
  }
}

//Договора определенного клиента
module.exports.adminGetClientsAgreementsMiddleware = auth;
module.exports.adminGetClientsAgreementsFunction = async (req, res) => {
  try {
    let agreements = await Agreement.find({ client: req.params.id })
    res.status(200).json(agreements);
  } catch (err) {
    console.log(err);
    res
        .status(500)
        .json({msg: "Error in fetching agreement" })
  }
}

//Договора конкретной услуги
module.exports.adminGetServiceAgreementsMiddleware = auth;
module.exports.adminGetServiceAgreementsFunction = async (req, res) => {
  try {
    let agreements = await Agreement.find({ services: req.params.id })
    res.status(200).json(agreements);
  } catch (err) {
    console.log(err);
    res
        .status(500)
        .json({msg: "Error in fetching agreement" })
  }
}

//Получение всех услуг клиента
module.exports.adminGetServicesMiddleware = auth;
module.exports.adminGetServicesFunction = async (req, res) => {
  try {
    let service = await Services.find({ client: req.params.id });
    console.log("services", service)
    res.status(200).json(service);
  } catch (err) {
    console.log(err);
    res
        .status(500)
        .json({msg: "Error in fetching services" })
  }
}

//Получение конкретную услугу клиента
module.exports.adminGetServiceMiddleware = auth;
module.exports.adminGetServiceFunction = async (req, res) => {
  try {
    let service = await Services.get({ id: req.params.id });
    console.log("service", service)
    res.status(200).json(service);
  } catch (err) {
    console.log(err);
    res
        .status(500)
        .json({msg: "Error in fetching services" })
  }
}

//Изменение услугу клиента
module.exports.adminPatchServiceMiddleware = auth;
module.exports.adminPatchServiceFunction = async (req, res) => {
  try {
    let serviceInfo = { ...req.body, id: req.params.id };

    console.log("serviceInfo", serviceInfo);
    
    // await Services.save(query, serviceInfo, (err) => {
    //   if (err) {
    //     console.log(err);
    //     res.status(500).json({ error: "Error on saving" });
    //   }
    // });

    try {
      await Services.save(serviceInfo);

      let agreements = await Agreement.find({services: req.params.id})

      console.log(agreements)

      agreements.forEach(async (agreement) => {
        if (serviceInfo.service_status == "in_work") {
          await Agreement.save({id: agreement.id, doc_status: "process"});
        } else if (serviceInfo.service_status == "done") {
          await Agreement.save({id: agreement.id, doc_status: "closed"});
        }

      });      
      
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error on saving" });
      return
    }
    
    let service = await Services.findById(req.params.id);
    let agreements = await Agreement.find({services: req.params.id});
    
    res.status(200).json({
      msg: "Updated",     
      service: service,
      agreements: agreements
    });
    
  } catch (err) {
    console.log(err);
    res
        .status(500)
        .json({msg: "Error in fetching services" })
  }
}

//Получение клиентов партнера
module.exports.getPartnerClientsMiddleware = auth;

module.exports.getPartnerClientsFunction = async (req, res) => {
  try {
    // let clients = await ClientProfile.find({
    //   partner: req.user.id,
    // }).populate("user");
    let clients = await ClientProfile.find({
      partner: req.params.id,
    });
   
    clients = await Promise.all(
      clients.map(async (client) =>
      ({
        ...client,
        user: await User.findById(client.user),
      })
      )
    );
    
    res.json(clients);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error in Fetching ", error: err });
  }
};


//Отправка e-mail почту админа
module.exports.adminSendEmailMiddleware = auth;
module.exports.adminSendEmailFunction = async (req, res) => {

  try {
    let emailbody = {...req.body};

    let user = emailbody;
    const admins = await User.find({role: "Admin"});

    admins.forEach(async(admin) => {
      let email = admin.email;     
      console.log("email", admin.email); 
      sendCallEmail(email, { user: user });
    })

    res.status(201).json({      
      msg: "Email успешно отправлен"
    });   
    
  } catch (err) {
    console.log(err);
    res
        .status(500)
        .json({msg: "Error in fetching" })
  }


};


// Получение профиля админа 
module.exports.adminProfileGetMiddleware = auth;
module.exports.adminProfileGetFunction = async (req, res) => {
  try {
    const profile = await AdminProfile.get({user: req.user.id});
    if (profile) {
      res.json(profile);
    } else {
      AdminProfile.save({user: req.user.id});
      profile = await AdminProfile.get({user: req.user.id});
      res.json(profile);
      // res.status(404).json({ msg: "Not found" });
    }
  } catch (err) {
    console.log("error", err)
    res.status(500).json({ msg: "Error in Fetching User", error: err });
  }  
}


//Изменение профиля админа
module.exports.adminProfilePatchMiddleware = auth;
module.exports.adminProfilePatchFunction = async (req, res) => { 
  
  
  try {
    let profileInfo = { ...req.body, id: req.params.id};

    console.log("profileInfo", profileInfo);

    try {
      await AdminProfile.save(profileInfo);
    } catch (error) {
      console.log(err);
      res.status(500).json({ error: "Error on saving" });
      return
    }    

    let adminprofile = await AdminProfile.findById(req.params.id);

    console.log("adminprofile", adminprofile)

    res.status(200).json(adminprofile);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error on saving" });
  }
}

