module.exports = function (para, sujeito, texto) {
    const mailer = require("nodemailer");
    //usando SMTP para envio
    const config = {
        // host: "sandbox.smtp.mailtrap.io",
        // port: 465,
        // secure: true,
        // auth: {
        //     user: "e84d4304c7234e",
        //     pass: "e84d4304c7234e:b615b3d0a93da5"
        // }
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "e84d4304c7234e",
          pass: "b615b3d0a93da5"
        }
    };

    const transporter = mailer.createTransport(config);


    transporter.sendMail({
        from: "Evaldo Sousa <fevaldo57@gmail.com>",
        to: para,
        subject: sujeito,
        text: texto
    }).then(message => {
        console.log(message);
    }).catch(err => {
        console.log(err);
    });

}
