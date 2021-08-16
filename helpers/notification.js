// dependencies
const https = require('https');
const querystring = require('querystring');
const { twilio } = require('./environment');
// scaffolding
const notifications = {};
// send sms to user using TwilioSms api
notifications.sendTwilioSms = (phone, msg, callback) => {
    const userPhone = typeof phone === 'string' && phone.trim().length > 11 ? phone.trim() : false;
    const userMsg =
        typeof msg === 'string' && msg.trim().length > 0 && msg.trim().length <= 1600
            ? msg.trim()
            : false;

    if (userPhone && userMsg) {
        // configure the request payload
        const payload = {
            From: twilio.fromPhone,
            To: `+88{userPhone}`,
            Body: userMsg,
        };
        // stringify the payload
        const payloadString = querystring.stringify(payload);
        // configure the request details
        const requestDetails = {
            hostName: 'api.twilio.com',
            method: 'POST',
            path: `/2010-04-01/Accounts/${twilio.accountSid}/Messages.json`,
            auth: `${twilio.accountSid}:${twilio.authToken}`,
            headers: {
                ' Content-Type': 'application/x-www-from-urlencode',
            },
        };
        // instantiate the request object
        const req = https.request(requestDetails, (res) => {
            // get the status  send request
            const status = res.statusCode;
            // callback successfully if the request went through
            if (status === 200 || status === 201) {
                callback(false);
            } else {
                callback(`status code returned${status}`);
            }
        });
        req.on('error', (e) => {
            callback(e);
        });
        req.write(payloadString);
        req.end();
    } else {
        callback('Given parameters is missing or invalid');
    }
};
// export module
module.exports = notifications;
