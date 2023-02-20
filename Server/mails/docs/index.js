const transporter = require('../../config/mail');
const fs = require('fs');
const path = require('path');


module.exports = (to, data) => {
    let emailHtml = fs.readFileSync(path.join(__dirname + `/index.html`), 'utf-8')

    emailHtml = emailHtml
        .replace('#contractFile', data.contractFile)
        .replace('#billFile', data.billFile)
        .replace('#aktFile', data.aktFile)

    emailText = "Документы для оплаты счета";
    

    const emailData = {
        from: '"Business Fox" ' + process.env.SMTP_LOGIN,
        to: to,
        subject: 'Документы успешно отправились!',
        text: emailText,
        html: emailHtml,
        attachments: [
            { filename: 'Договор', path: fs.readFile(data.contractFile, (err, data) => {
                if (err) throw err;
                console.log(data);
              })},
            { filename: 'Акт', path: fs.readFile(data.aktFile, (err, data) => {
                if (err) throw err;
                console.log(data);
              })},
            { filename: 'Счет', path: fs.readFile(data.billFile, (err, data) => {
                if (err) throw err;
                console.log(data);
              })},
            
          ],
    }

    transporter.sendMail(emailData)
}