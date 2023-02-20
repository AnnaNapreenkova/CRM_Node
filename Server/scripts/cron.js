const cron = require('node-cron');
const Notification = require("../model/Notification");
const Service = require("../model/Services");
const User = require("../model/User")


let taskminute = cron.schedule('*/1 * * * *', async () => {

  try {

    let services = await Service.find();

    let serviceList = [
      "Collocation",
      "Разработка сайта",
      "Администрирование серверов",
      "Доработка 1С",
      "Сопровождение 1С",
      "Облачное хранилище",
    ]

    services.forEach(async (service) => {

      let data = {
        user: service.client,
        from: null,
        type: "alert",
        title: `Информация про срока сервиса ${serviceList[service.service_type]}`,
        text: `Срок сервиса ${serviceList[service.service_type]} осталось ${service.days} дней`,
        link: `service/${service.id}`,
      };

      let notification = await Notification.save(data);

      console.log("notification", notification);
      

      // res.status(201).json({
      //   notification: notification

      // });

    });


  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ msg: "Error in saving" });
  }

  console.log('running a task every minute');
});



module.exports = [taskminute];

// module.exports.notificationPostFunction = async (req, res) => {
 
//   try {

//     let services = await Services.find();

//     let serviceList = [
//       "Collocation",
//       "Разработка сайта",
//       "Администрирование серверов",
//       "Доработка 1С",
//       "Сопровождение 1С",
//       "Облачное хранилище",
//     ]

//     services.forEach(service => {

//       let data = {
//         user: service.user,
//         from: null,
//         type: "alert",
//         title: `Информация про срока сервиса ${serviceList[service.service_type]}`,
//         text: `Срок сервиса ${serviceList[service.service_type]} осталось ${service.days} дней`,
//         link: `service/${this.service.id}`,
//       };

//       let notification = await Notification.save(data);
      

//       res.status(201).json({
//         notification: notification

//       });

//     });


//   } catch (err) {
//     console.log(err);
//     res
//       .status(500)
//       .json({ msg: "Error in saving" });
//   }
// };