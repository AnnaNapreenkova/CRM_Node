const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const User = require("../model/User");
const AdminProfile = require("../model/AdminProfile");
const { upload, avatarUpload } = require("../middleware/files");
const sendChangePasswordEmail = require("../mails/changepasswordemail");
const sendRegistrationEmail = require("../mails/registration");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const { randomString } = require("../scripts/random");


signupPostMiddleware = [
    check("phone", "Пожалуйста, введите телефон").not().isEmpty(),
    check("email", "Пожалуйста, введите правильную электронную почту").isEmail(),
    check("role", "Пожалуйста, введите правильную роль").custom(
      (value, { req }) =>
        User.roles.has(value)
    ),
  ];
  //Регистрация
signupPostFunction = async () => {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return console.log("errors_400", errors.array());
    //   return res.status(400).json({
    //      errors: errors.array(),
    //   });
    // }
    
    console.log("Проверка 1");
  
    const phone = "7 (777) 777-77-77"
    // const email = "mrismayil2012@gmail.com"
    // const email = "evgeny_pr@mail.ru"
    const email = "admin@mail.ru"
    const role = "Admin"
    try {
      // Проверка на наличие юзера
      let user = await User.get({
        email,
      });
      if (user) {
        return console.log("Электронная почта уже зарегистрирована в системе");
        // return res.status(411).json({
        //   msg: "Электронная почта уже зарегистрирована в системе"
        // });
      }
      user = await User.get({
        phone,
      });
      if (user) {
        return console.log("Телефонный номер уже зарегистрирован в системе");
        // return res.status(412).json({
        //   msg: "Телефонный номер уже зарегистрирован в системе"
        // });
      }
      //Проверка на наличие юзера
      
      console.log("Проверка 2");
  
      // let password = randomString(8);
      let password = "7777";
      user = {
        phone,
        email,
        password,
        role,
      };
  
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt)
  
      user = await User.save(user);
      sendRegistrationEmail(email, { email: email, password: password });  
      console.log("Password: ", password);
      console.log("user", user);

      console.log("Проверка 3");
  
      const data = {
        user: {
          id: user.id,
        },
      };
  
      jwt.sign(
        data,
        "randomString",
        {
          expiresIn: 10000,
        },
        (err, token) => {
          if (err) throw err;
          return console.log("token", token)
          
          // res.status(201).json({
          //   token,
          // });
        }
      );

      let adminProfile = {
        user: user.id,        

      };
      adminProfile = await AdminProfile.save(adminProfile);
      return console.log("Админ успешно создан");
    } catch (err) {
      return console.log(err);
      // res.status(500).send("Ошибка при сохранении. Обратитесь к администрации");
    }
  }
  
//   signupPostMiddleware()
  signupPostFunction()
  