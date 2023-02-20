const transporter = require('../../config/mail');
const fs = require('fs');
const path = require('path');


module.exports = (to, data) => {
    let emailHtml = fs.readFileSync(path.join(__dirname + `/index.html`), 'utf-8')

    emailHtml = emailHtml
        .replace('#user', data.user)
        .replace('#id', data.user.id)
        .replace('#surname', data.user.surname)
        .replace('#name', data.user.name)
        .replace('#patronim', data.user.patronim)
        .replace('#phone', data.user.phone)       

    const emailText = `Письмо от клиента ${data.user.surname} ${data.user.name} ${data.user.patronim}`;

    const emailData = {
        from: '"Megaorion Group" ' + process.env.SMTP_LOGIN,
        to: to,
        subject: 'Обратный звонок для клиента!',
        text: emailText,
        html: emailHtml
    }

    transporter.sendMail(emailData)
}