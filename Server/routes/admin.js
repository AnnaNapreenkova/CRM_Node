const express = require("express");
const router = express.Router();

const controller = require("../controllers/admin");

//Создание пользователя админом
router.post(
    "/user",
    controller.adminUserListPostMiddleware,
    controller.adminUserListPostFunction
);

//Получение клиентов админа
router.get(
    "/clients",
    controller.adminClientListGetMiddleware,
    controller.adminClientListGetFunction
)

//Получение партнеров админа
router.get(
    "/partners",
    controller.adminPartnersListGetMiddleware,
    controller.adminPartnersListGetFunction
)

//Просмотр аккаунта клиента
router.get(
    "/account/:id",
    controller.adminUserDetailMiddleware,
    controller.adminUserDetailFunction
)

//Просмотр профиля клиента
router.get(
    "/client/:id",
    controller.adminClientDetailMiddleware,
    controller.adminClientDetailFunction
  );

//Просмотр списка договоров
router.get(
    "/agreements",
    controller.adminGetAgreementsMiddleware,
    controller.adminGetAgreementsFunction
)

//Просмотр списка услуг
router.get(
    "/services",
    controller.adminGetAllServicesMiddleware,
    controller.adminGetAllServicesFunction
)

//Договора определенного клиента
router.get(
    "/agreements/:id",
    controller.adminGetClientsAgreementsMiddleware,
    controller.adminGetClientsAgreementsFunction
)

//Договора конкретной услуги
router.get(
    "/service/agreements/:id",
    controller.adminGetServiceAgreementsMiddleware,
    controller.adminGetServiceAgreementsFunction
)

//Создание договора клиента
router.post(
    "/agreement/",
    controller.adminCreateAgreementMiddleware,
    controller.adminCreateAgreementFunction
)

//Изменение соглашение с клиентом
router.patch(
    "/agreement/:id",
    controller.adminPatchAgreementMiddleware,
    controller.adminPatchAgreementFunction
)

//Получение всех услуг клиента
router.get(
    "/services/:id",
    controller.adminGetServicesMiddleware,
    controller.adminGetServicesFunction
)

//Получение конкретную услугу клиента
router.get(
    "/service/:id",
    controller.adminGetServiceMiddleware,
    controller.adminGetServiceFunction
)

//Изменение услугу клиента
router.patch(
    "/service/:id",
    controller.adminPatchServiceMiddleware,
    controller.adminPatchServiceFunction
)


//Получение клиентов партнера
router.get(
    "/partner/clients/:id",
    controller.getPartnerClientsMiddleware,
    controller.getPartnerClientsFunction
)


//Отправка email админу
router.post(
    "/sendemail",
    controller.adminSendEmailMiddleware,
    controller.adminSendEmailFunction
)


//Получение профиля админа
router.get(
    "/profile",
    controller.adminProfileGetMiddleware,
    controller.adminProfileGetFunction
)


//Изменение профиля админа
router.patch(
    "/changeprofile/:id",
    controller.adminProfilePatchMiddleware,
    controller.adminProfilePatchFunction
)

module.exports = router;