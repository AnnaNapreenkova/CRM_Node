const express = require("express");
const router = express.Router();

const controller = require("../controllers/user");

// Регистрация
router.post(
  "/signup",
  controller.signupPostMiddleware,
  controller.signupPostFunction
);
// Вход
router.post(
  "/login",
  controller.loginPostMiddleware,
  controller.loginPostFunction
);

//Профиль
router.get(
  "/account", 
  controller.UserGetMiddleware,
  controller.UserGetFunction
);

// Смена забытого пароля
router.patch(
  "/reset_password", 
  controller.PasswordForgetMiddleware, 
  controller.PasswordForgetFunction
  );

// Изменение аккаунта
router.patch(
  "",
  controller.userPatchMiddleware,
  controller.userPatchFunction
);

module.exports = router;
