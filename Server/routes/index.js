const user = require("./user");
const admin = require("./admin");
const partner = require("./partner");
const client = require("./client");
const notification = require("./notification");
const support = require("./support");
//const { ticket } = require("../model/config")


module.exports = [ 
  {
    name: "user",
    router: user,
  },
  {
    name: "admin",
    router: admin,
  },
  {
    name: "partner",
    router: partner
  },
  {
    name: "client",
    router: client
  },
  {
    name: "notification",
    router: notification
  },
  {
    name: "support",
    router: support
  }
];
