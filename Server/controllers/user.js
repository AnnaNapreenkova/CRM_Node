const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const User = require("../model/User");
const { upload, avatarUpload } = require("../middleware/files");
const sendChangePasswordEmail = require("../mails/changepasswordemail");
const sendRegistrationEmail = require("../mails/registration");

const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const { randomString } = require("../scripts/random");
// const ServerLink = "http://localhost:5000/";
// const ServerLink = "http://lk-back.megaorion.ru/";
const ServerLink = process.env.FULLLINK;

//Регистрация
module.exports.signupPostMiddleware = [
  check("phone", "Пожалуйста, введите телефон").not().isEmpty(),
  check("email", "Пожалуйста, введите правильную электронную почту").isEmail(),
  check("role", "Пожалуйста, введите правильную роль").custom(
    (value, { req }) =>
      User.roles.has(value)
  ),
];
//Регистрация
module.exports.signupPostFunction = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  const { phone, email, role } = req.body;
  try {
    // Проверка на наличие юзера
    let user = await User.get({
      email,
    });
    if (user) {
      return res.status(411).json({
        msg: "Электронная почта уже зарегистрирована в системе"
      });
    }
    user = await User.get({
      phone,
    });
    if (user) {
      return res.status(412).json({
        msg: "Телефонный номер уже зарегистрирован в системе"
      });
    }
    //Проверка на наличие юзера

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
        res.status(201).json({
          token,
        });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).send("Ошибка при сохранении. Обратитесь к администрации");
  }
}

//Авторизация
module.exports.loginPostMiddleware = [
  check("email", "Почта неверная").isEmail(),
  check("password", "Пароль неверный").isLength({ min: 4}),
];
module.exports.loginPostFunction = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors);
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  const { email, password } = req.body;
  try {
    let user = await User.get({
      email,
    });
    if (!user) {
      return res.status(411).json({
        msg: "Пользователь с данной почтой не существует",
      });
  }   
  
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(412).json({
      msg: "Неверный пароль",
    })
  }

  const payload = {
    user: {
      id: user.id,
    },
  };

  jwt.sign(
    payload,
    "randomString",
    !req.body.remember
      ? {
        expiresIn: 10000,
      }
      : {},
    (err, token) => {
      if (err) throw err;
      res.status(200).json({
        token,
      });
    }  
  );  
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "Ошибка сервера. Обратитесь к администрации"
    });
  }
};

//Получение аккаунта
module.exports.UserGetMiddleware = auth;
module.exports.UserGetFunction = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    console.log(user.img);
    if (user.img) {
      user.img = ServerLink + user.img;
    }
     
    res.json(user);
  } catch (err) {
    res
      .status(500)
      .json({msg: "Ошибка на сервере. Обратитесь к администрации"})
  }
};

//Изменение данных аккаунта
module.exports.userPatchMiddleware = [auth, avatarUpload.single("img")];
module.exports.userPatchFunction = async (req, res) => {
  let userInfo = { ...req.body };

  // let user = await User.findById(req.user.id);

  // let userInfo = {
  //   email: req.body.email ? req.body.email : user.email,
  //   phone: req.body.phone ? req.body.phone : user.phone,
  //   surname: req.body.surname ? req.body.surname : user.surname,
  //   name: req.body.name ? req.body.name : user.name,
  //   patronim: req.body.patronim ? req.body.patronim : user.patronim,

  // }



  if (req.file) {
    userInfo.img = req.file.path;
  }

  if (userInfo.password) {
    const salt = await bcrypt.genSalt(10);
    userInfo.password = await bcrypt.hash(req.body.password, salt);
  }

  if (userInfo.email) {
    let oldUser = await User.get({email: userInfo.email});
    if (oldUser && oldUser.id != req.user.id) {
      return res
        .status(411)
        .json({ msg: "Указанная электронная почта уже сушествует" });
    }
  }

  if (userInfo.phone) {
    let oldUser = await User.get({phone: req.body.phone});
    if (oldUser && oldUser.id != req.user.id) {
      return res
        .status(412)
        .json({ msg: "Указанный телефон уже сушествует" });
    }
  }

  

  userInfo.id = req.user.id;

  try {
    const user = await User.save(userInfo);
    res.status(200).json({msg: "Updated"});
  } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Error on saving" });}
};

//Восстановление пароля
module.exports.PasswordForgetMiddleware = [
  check("email", "Пожалуйста, введите правильную электронную почту").isEmail(),
]
module.exports.PasswordForgetFunction = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  const { email, password, confirmpassword } = req.body;
  console.log(req.body.email);

  try {
    let user = await User.get({
      email,
    });

    if (!user) {
      return res.status(411).json({
        msg: "Пользователь с данной почтой не существует",
      });
    }

    if (password != confirmpassword) {
      return res.status(412).json({
        msg: "Пароли не совпадают",
      });
    } else {
      let password = randomString(8)
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await User.save(user);
      sendChangePasswordEmail(email, { email: email, password: password })
      res.status(200).json({ msg: "Пароль успешно обновлен" });

    }

  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "Ошибка сервера. Обратитесь к администрации",
    });
  }
};

