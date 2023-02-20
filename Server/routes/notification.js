const express = require("express");
const router = express.Router();

const controller = require("../controllers/notification");

//Создание уведомлении
router.post(
    "",
    controller.notificationPostMiddleware,
    controller.notificationPostFunction
);

//Получение уведомлении по id пользователя
router.get(
    "/notifications/:id",
    controller.notificationsListGetByIdMiddleware,
    controller.notificationsListGetFunction
)

//Получение последних 5 уведомлении по id пользователя
router.get(
    "/last/:id",
    controller.lastNotificationsListGetByIdMiddleware,
    controller.lastNotificationsListGetFunction
)

//Получение уведомлении по токену пользователя
router.get(
    "/notifications",
    controller.notificationsListGetMiddleware,
    controller.notificationsListGetFunction
)

//Получение последних 5 уведомлении по токену пользователя
router.get(
    "/last",
    controller.lastNotificationsListGetMiddleware,
    controller.lastNotificationsListGetFunction
  );

//Получение конкретного уведомление по id
router.get(
    "/:id",
    controller.notificationGetMiddleware,
    controller.notificationGetFunction
)


//Изменение уведомлении
router.patch(
    "/:id",
    controller.patchNotificationMiddleware,
    controller.patchNotificationFunction
)


module.exports = router;