// scaffolding
const utilities = {};

// dependencies
const crypto = require('crypto');
const environment = require('./environment');

// parse JSON string to object
utilities.parseJSON = (jsonString) => {
    let output;

    try {
        output = JSON.parse(jsonString);
    } catch {
        output = {};
    }
    return output;
};
// hash string
utilities.hash = (str) => {
    if (typeof str === 'string' && str.length > 0) {
        console.log(environment, process.env.NODE_ENV);
        const hash = crypto.createHmac('sha256', environment.secretKey).update(str).digest('hex');
        return hash;
    }
    return false;
};
module.exports = utilities;
