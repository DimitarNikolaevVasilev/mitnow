const env = require('../util/env');
const Promise = require('bluebird');

const nexmo = new (require('nexmo'))({
    apiKey: env.phoneService.nexmo_api_key,
    apiSecret: env.phoneService.nexmo_api_secret
});

// Pensar en otro promisify
nexmo.verify.request = Promise.promisify(nexmo.verify.request);
nexmo.verify.check = Promise.promisify(nexmo.verify.check);

module.exports = {
    async sendVerificationCode(phoneNumber){
        return await nexmo.verify.request({
           number: phoneNumber,
           brand: 'Mitnow',
            code_length: '6'
        });
    },
    async verifyPhoneNumberCode(id, code){
        return await nexmo.verify.check({
            request_id: id,
            code: code
        });
/*
Ejemplo:
        {
            "request_id": "cac9bcd549ed4b00944f899557f8a89c",
            "status": "0",
            "event_id": "15000000CE9434E3",
            "price": "0.05000000",
            "currency": "EUR",
            "estimated_price_messages_sent": "0.06890000"
        }*/
    }
}
