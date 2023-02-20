const auth = require("../middleware/auth");
const { json } = require("express");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");

const User = require("../model/User");

//Менеджер управляет пользователями админа
//Создание пользователей админа
module.exports.adminUserListPostMiddleware = [
    auth,
    check("phone", "Please Enter a Valid Phone").not().isEmpty(),
    check("email", "Please enter a valid email").isEmail(),
  ];

module.exports.adminUserListPostFunction = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
        });
    }

    const { phone, email, role } = req.body;
    try {
        // Проверка на наличие юзера
        let user = await User.get({
            email,
        });
        if (user) {
            return res.status(411).json({
                msg: "Email Already Registered",
            });
        }
        user = await User.get({
            phone,
        });
        if (user) {
            return res.status(412).json({
                msg: "Phone Already Registered"
            });
        }
        // Проверка на наличие юзера

        let password = "7777";
        user = {
            phone,
            email,
            password,
            role,
        };

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        user = await User.save(user);

        const data = {
            user: {
                id: user.id,
            },
        };

        jwt.sign(
            data,
            (err, token) => {
                if (err) throw err;
                res.status(201).json({
                    token,
                });
            }
        );
    } catch (err) {
        console.log(err);
        res.status(500).send("Error while saving");
    }
};

//Получение партнеров и клиентов админа
module.exports.adminUserListPostMiddleware = auth;

module.exports.adminUserListGetFunction = async (res) => {
    try {
        let users = [];        
        users += await User.find({ role: "Partner" });
        users += await User.find({ role: "AdminClient" });

        res.status(200).json(users);
    } catch (err) {
        console.log(err);
        res.status(500).send("Error in fetching user");
    }
}; 