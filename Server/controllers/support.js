const User = require("../model/User");
const Ticket = require("../model/Ticket");
const Message = require("../model/Message");
const auth = require("../middleware/auth");
const { upload, ticketUpload } = require("../middleware/files");
const { Op, or } = require("sequelize");
const ServerLink = process.env.FULLLINK;

//Получения всех тикетов
module.exports.getTicketsMiddleware = auth;
module.exports.getTicketsFunction = async (req, res) => {
    try {
        if (!req.user.id) {
            res.status(403).json({ msg: "must login" });
            return;
        }
        let user = await User.findById(req.user.id);
        console.log("user", user);
        var tickets;
        if (user.role === "Admin") {
            tickets = await Ticket.find({});
        } else {
            tickets = await Ticket.find({ user: user.id });
        }

        tickets = await Promise.all(
            tickets.map(async (ticket) =>
            ({
                ...ticket,
                // messages: await Message.find({ ticket: ticket.id }),
                read: !(await Message.find({
                    ticket: ticket.id, 
                    read: false, 
                    // user: {
                    //     [Op.not]: {
                    //         [Op.eq]: parseInt(req.user.id)
                    //     } 
                    // }

                })).filter(({user}) => user != parseInt(req.user.id)).length
                    
            })
            )
        );

        tickets = await Promise.all(
            tickets.map(async (ticket) =>
            ({
                ...ticket,
                user: await User.findById(ticket.user)

            })
            )
        );

        // tickets.forEach(async (ticket) => {
        //     newMessages = await Message.find({ticket: ticket.id, read: false});
        //     if (newMessages.length && ticket.user != req.user.id) {
        //         ticket.read = false;
        //     }
        // })

        tickets.forEach(ticket => {
            ticket.user.img = ServerLink + ticket.user.img;
        })

        //   tickets.messages = await Promise.all(
        //     tickets.messages.map(async (message) =>
        //     ({
        //       ...message,
        //       user: user
        //     })
        //     )
        //   );

        // tickets.forEach(async (ticket) => {
        //     ticket.messages = await Message.find({user: user.id});
        //     console.log("messages", ticket.messages);
        //     ticket.messages.user = user;
        // })

        console.log("tickets", tickets);
        res.json(tickets);
    } catch (e) {
        console.log("error", e);
        res.status(500).json({ msg: "DB error", error: e });
    }
};

//Создание тикета поддержки
module.exports.postTicketMiddleware = [auth, ticketUpload.single("file")];
module.exports.postTicketFunction = async (req, res) => {
    try {
        if (!req.user.id) {
            res.status(403).json({ msg: "must login" });
            return;
        }

        let user = await User.findById(req.user.id);
        let ticketData = {
            user: user.id,
            title: req.body.ticketTitle,
            service: req.body.service,
            close: false,
        }
        let ticket = await Ticket.save(ticketData);

        console.log("ticket1", ticket)

        ticket.update = (new Date(ticket.updatedAt)).toJSON();

        console.log("ticket2", ticket)

        await Ticket.save(ticket);

        console.log("ticket3", ticket)

        let admins = await User.find({ role: "Admin" })

        let messages = [];

        console.log("file", req.body.file);
        let messageFile;

        if (req.file) {
            messageFile = req.file.path;
        }

        admins.forEach(async (admin) => {
            let messageData = {
                user: user.id,
                title: req.body.messageTitle,
                ticket: ticket.id,
                text: req.body.text,
                file: messageFile,//TODO base64
                destination: admin.id,
                read: false,
            }
            let message = await Message.save(messageData);
            messages.push(message);

        })




        res.json({
            ticket: ticket,
            messages: messages
        });
    } catch (e) {
        console.log("error", e);
        res.status(500).json({ msg: "DB error", error: e });
    }
}


//Создание сообщении поддержки
module.exports.postMessageMiddleware = [auth, ticketUpload.single("file")];
module.exports.postMessageFunction = async (req, res) => {
    try {
        if (!req.user.id) {
            res.status(403).json({ msg: "must login" });
            return;
        }
        console.log("req body", req.body);

        let messageFile;

        if (req.file) {
            messageFile = req.file.path;
        }

        let user = await User.findById(req.user.id);

        let messageData = {
            user: user.id,
            title: req.body.title,
            ticket: req.body.ticket,
            text: req.body.text,
            file: messageFile,//TODO base64
            destination: req.body.destination,
            read: false,
        }
        let message = await Message.save(messageData);

        let ticket = await Ticket.findById(message.ticket);

        ticket.update = (new Date(message.updatedAt)).toJSON();
        ticket = await Ticket.save(ticket);

        res.json({
            id: message.id
        });
    } catch (e) {
        console.log("error", e);
        res.status(500).json({ msg: "DB error", error: e });
    }
}



//Получение сообщении конкретного тикета
module.exports.getTicketMessagesMiddleware = auth;
module.exports.getTicketMessagesFunction = async (req, res) => {
    try {
        if (!req.user.id) {
            res.status(403).json({ msg: "must login" });
            return;
        }
        // let user = User.findById(req.user.id);
        let messages = await Message.find({ ticket: req.params.ticketId });

        messages = await Promise.all(
            messages.map(async (message) =>
            ({
                ...message,
                ticket: await Ticket.findById(message.ticket),
                user: await User.findById(message.user)

            })
            )
        );

        messages.forEach(message => {
            message.user.img = ServerLink + message.user.img;
        })

        console.log("messages", messages);
        // if(user.role === "admin"){
        //     message = await Message.find({ticket: req.params.ticketId});
        // }else{
        //     message = await Message.find({
        //         ticket: req.params.ticketId,
        //         $or: [
        //             {
        //                 user: user.id
        //             },
        //             {
        //                 destination:user.id
        //             }
        //         ]
        //     });
        // }
        res.json(messages);
    } catch (e) {
        console.log("error", e);
        res.status(500).json({ msg: "DB error", error: e });
    }
}



//Изменение сообщении поддержки
module.exports.patchMessageMiddleware = auth;
module.exports.patchMessageFunction = async (req, res) => {
    try {
        if (!req.user.id) {
            res.status(403).json({ msg: "must login" });
            return;
        }
        // let user = User.findById(req.user.id);
        let message = await Message.findById(req.params.id);

        console.log("message detail", message);
        console.log("req user", req.user.id);



        // if(!message || message.user!==req.user.id || message.read){
        if (!message || message.read) {
            res.status(403).json({ msg: "can tot edit" });
            return;
        }
        let messageData = {
            id: req.params.id,
            // user: user.id,
            title: req.body.title,
            theme: req.body.theme,
            text: req.body.text,
            file: req.body.file,//TODO base64
            destination: req.body.destination,
            read: req.body.read,
        }

        console.log("message.data", messageData);
        message = await Message.save(messageData);
        res.json({
            message
        });
    } catch (e) {
        console.log("error", e);
        res.status(500).json({ msg: "DB error", error: e });
    }
}



//Изменение тикета поддержки
module.exports.patchTicketMiddleware = auth;
module.exports.patchTicketFunction = async (req, res) => {
    try {
        if (!req.user.id) {
            res.status(403).json({ msg: "must login" });
            return;
        }
        // let user = User.findById(req.user.id);


        // if (!message || message.read) {
        //     res.status(403).json({ msg: "can tot edit" });
        //     return;
        // }


        let ticketData = {
            id: req.params.id,
            close: req.body.close,
        }

        console.log("message.data", ticketData);
        let ticket = await Ticket.save(ticketData);
        res.json({
            ticket
        });
    } catch (e) {
        console.log("error", e);
        res.status(500).json({ msg: "DB error", error: e });
    }
}



