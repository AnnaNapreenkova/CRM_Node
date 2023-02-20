const express = require("express");
const router = express.Router();

const controller = require("../controllers/partner");

//Создание клиентов
router.post(
    "/client",
    controller.ClientPostMiddleware,
    controller.ClientPostFunction
);

//Получение клиентов партнера
router.get(
    "/client",
    controller.ClientGetMiddleware,
    controller.ClientGetFunction
)

//Получение профиля партнера
router.get(
    "/profile",
    controller.PartnerProfileGetMiddleware,
    controller.PartnerProfileGetFunction
)

//Редактирование профиля
router.patch(
    "/patch/:id",
    controller.PartnerProfilePatchMiddleware,
    controller.PartnerProfilePatchFunction
)


//Создание услуги партнером
router.post(
    "/service",
    controller.partnerCreateServiceMiddleware,
    controller.partnerCreateServiceFunction
)


//Получение списка своих договоров партнером
router.get(
    "/agreements",
    controller.partnerGetAgreementsMiddleware,
    controller.partnerGetAgreementsFunction
)


//Получение списка своих услуг партнером
router.get(
    "/services",
    controller.partnerGetServicesMiddleware,
    controller.partnerGetServicesFunction
)


//Получение конкретную услугу партнером
router.get(
    "/service/:id",
    controller.partnerGetServiceMiddleware,
    controller.partnerGetServiceFunction
)



module.exports = router;





