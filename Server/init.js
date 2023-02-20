
const sequelize = require("./sequelize");
const AdminProfile = require("./model/AdminProfile");
const Agreement = require("./model/Agreement");
const ClientProfile = require("./model/ClientProfile");
const ManagerProfile = require("./model/ManagerProfile");
const PartnerProfile = require("./model/PartnerProfile");
const Services = require("./model/Services");
const Notification = require("./model/Notification");
const Ticket = require("./model/Ticket");
const Message = require("./model/Message");
const User = require("./model/User");
const l = console.log.bind(console);
l(User.sync);
sequelize.authenticate()
.then(async()=>({
	AdminProfile: await AdminProfile.sync({ alter: true }),
	Agreement: await Agreement.sync({ alter: true }),
	ClientProfile: await ClientProfile.sync({ alter: true }),
	ManagerProfile: await ManagerProfile.sync({ alter: true }),
	PartnerProfile: await PartnerProfile.sync({ alter: true }),
	Services: await Services.sync({ alter: true }),
	User: await User.sync({ alter: true }),
	Notification: await Notification.sync({ alter: true }),
	Ticket: await Ticket.sync({ alter: true }),
	Message: await Message.sync({ alter: true }),
}))
	.then(l,l);
