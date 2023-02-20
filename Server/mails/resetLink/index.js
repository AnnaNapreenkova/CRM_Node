const transporter = require('../../config/mail');
const fs = require('fs');
const path = require('path');


module.exports = (to, data) => {
    let emailHtml = fs.readFileSync(path.join(__dirname + `/index.html`), 'utf-8')

    emailHtml = emailHtml
        .replace('#email', encodeURI(data.email))
        

    const emailText = `
    Ваша почта: ${data.email} `;

    const emailData = {
        from: '"Megaorion Group" ' + process.env.SMTP_LOGIN,
        to: to,
        subject: 'Ссылка для обновление пароля!',
        text: emailText,
        html: emailHtml
    }

    transporter.sendMail(emailData)
}