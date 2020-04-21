const env = require('../util/env');
const sec = require('../util/sec');
const {models, createOrUpdate} = require('../db/db');

const emailer = require('@sendgrid/mail');


emailer.setApiKey(env.emailService.SendGrid_api_key);

/*
async  function f() {
    const msg = {
        to: 'test@example.com',
        from: 'test@example.com',
        subject: 'Sending with Twilio SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    };
    emailer.send(msg).catch(err => {
        console.log(err);
    });
}

f();
*/


module.exports = {
    async sendConfirmationEmail(user){
        let token = await sec.generateRandomString(16);
        await createOrUpdate(models.verificacionemail,
            {idUsuario: user.idUsuario},
            {token: token});

        let link = `${env.server.hostURL}/verify_email?token=${encodeURI(token)}&id=${user.idUsuario}`;

        emailer.send({
           to: user.email,
           from: env.emailService.fromConfirmationEmail,
           subject: 'Email activation',
           text: `Visit this link: ${link}`,
           html: `Click <a href="${link}">Here</a> to find your best friend`
        });
    },
    async verifyEmail(p) {
        let valid = await models.verificacionemail.count({
            where: {idUsuario: p.id, token: p.token}
        });
        if(!valid)return false;

        await models.usuario.update({email_validato: 1}, {
            where: {usuarioId: p.id}
        });
        await models.verificacionemail.destroy({
            where: {usuarioId: p.id}
        });
        return true;
    }
}
