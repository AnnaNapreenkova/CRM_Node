const express = require("express");
const router = express.Router();

const controller = require("../controllers/client");


//Получение подключенных услуг
router.get(
    "/services",
    controller.getServicesMiddleware,
    controller.getServicesFunction
)

//Получение договоров клиента
router.get(
    "/agreements",
    controller.getAgreementsMiddleware,
    controller.getAgreementsFunction
)

//Получение профиля клиента
router.get(
    "/profile",
    controller.clientProfileGetMiddleware,
    controller.clientProfileGetFunction
)

//Редактирование клиента
router.patch(
    "/patch/:id",
    controller.clientProfilePatchMiddleware,
    controller.clientProfilePatchFunction
)

module.exports = router;








