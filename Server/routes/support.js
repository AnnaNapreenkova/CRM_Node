const express = require("express");
const router = express.Router();

const controller = require("../controllers/support");
router
    .get("", controller.getTicketsMiddleware, controller.getTicketsFunction)
    .post("", controller.postTicketMiddleware, controller.postTicketFunction)
    .post("/message", controller.postMessageMiddleware, controller.postMessageFunction)
    .get("/messages/:ticketId", controller.getTicketMessagesMiddleware, controller.getTicketMessagesFunction)
    .get("ticket", controller.getTicketsMiddleware, controller.getTicketsFunction)
    .patch("/message/:id", controller.patchMessageMiddleware, controller.patchMessageFunction)
    .patch("/:id", controller.patchTicketMiddleware, controller.patchTicketFunction)
module.exports = router;