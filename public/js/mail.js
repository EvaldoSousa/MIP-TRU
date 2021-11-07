module.exports = function (para, sujeito, texto) {
    const mailer = require("nodemailer");
    //usando SMTP para envio
    const config = {
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: "jhonnierandler@gmail.com",
            pass: "nonekgpfqqvncebr"
        }
    };

    const transporter = mailer.createTransport(config);


    transporter.sendMail({
        from: "Jhon Randler <jhonnierandler@gmail.com>",
        to: para,
        subject: sujeito,
        text: texto
    }).then(message => {
        console.log(message);
    }).catch(err => {
        console.log(err);
    });

}