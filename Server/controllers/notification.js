const auth = require("../middleware/auth");

const { check, validationResult } = require("express-validator");
const Notification = require("../model/Notification");
const User = require("../model/User")



//Создание уведомлении
module.exports.notificationPostMiddleware = [
  auth,

  // check("type", "Пожалуйста, введите правильную тип уведомлении").custom(
  //   (value, { req }) =>
  //   Notification.type.has(value)
  // ),
];

module.exports.notificationPostFunction = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  try {

    let notification = { ...req.body };
    if (notification.user == "admin") {
      notification.users = await User.find({role: "Admin"});

      notification.users.forEach(async(user) => {
        notification.user = user.id;      
        notification = await Notification.save(notification);
      })
    } else {
      notification = await Notification.save(notification);
    }    

    res.status(201).json({
      notification: notification

    });



  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ msg: "Error in saving" });
  }
};

//Получение уведомлении по id пользователя
module.exports.notificationsListGetByIdMiddleware = auth;
module.exports.notificationsListGetFunction = async (req, res) => {
  try {
    let notifications = await Notification.find({ user: req.params.id });

    res.status(200).json(notifications);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ msg: "Error in fetching" })
  }
};


//Получение последних 5 уведомлении по id пользователя
module.exports.lastNotificationsListGetByIdMiddleware = auth;
module.exports.lastNotificationsListGetFunction = async (req, res) => {
  try {
    const notification = await Notification.find({ user: req.params.id })
      .limit(5)
      .sort({ date: -1 });
    res.json(notification);
  } catch (err) {
    res.status(500).json({ msg: "Ошибка при получении" });
  }
};


//Получение уведомлении по токену пользователя
module.exports.notificationsListGetMiddleware = auth;
module.exports.notificationsListGetFunction = async (req, res) => {
  try {
    let notifications = await Notification.find({ user: req.user.id });

    res.status(200).json(notifications);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ msg: "Error in fetching" })
  }
};


//Получение последних 5 уведомлении по токену пользователя
module.exports.lastNotificationsListGetMiddleware = auth;
module.exports.lastNotificationsListGetFunction = async (req, res) => {
  try {
    const notification = await Notification.find({ user: req.user.id })
      .limit(5)
      .sort({ date: -1 });
    res.json(notification);
  } catch (err) {
    res.status(500).json({ msg: "Ошибка при получении" });
  }
};


//Получение конкретного уведомление по id
module.exports.notificationGetMiddleware = auth;
module.exports.notificationGetFunction = async (req, res) => {
  try {
    let notifications = await Notification.findOne({ id: req.params.id });

    res.status(200).json(notifications);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ msg: "Error in fetching" })
  }
};


//Изменение уведомлении
module.exports.patchNotificationMiddleware = auth;
module.exports.patchNotificationFunction = async (req, res) => {
  try {
    let notificationInfo = { ...req.body, id: req.params.id };

    console.log("notificationInfo", notificationInfo);

    try {
      await Notification.save(notificationInfo);
      
    } catch (error) {
      console.log(err);
      res.status(500).json({ error: "Error on saving" });
      return
    }
    
    let notification = await Notification.findById(req.params.id);
    
    res.status(200).json({
      msg: "Updated",     
      data: notification
    });
    
  } catch (err) {
    console.log(err);
    res
        .status(500)
        .json({msg: "Error in fetching services" })
  }
}


