// dependencies
const data = require('../../lib/data');
const { hash } = require('../../helpers/utilities');
// scaffolding
const handlers = {};
handlers.userHandler = (requestProperties, callback) => {
    const acceptedMethods = ['get', 'post', 'put', 'delete'];
    if (acceptedMethods.indexOf(requestProperties.method) > -1) {
        handlers._users[requestProperties.method](requestProperties, callback);
    } else {
        callback(405);
    }
};
handlers._users = {};

handlers._users.post = (requestProperties, callback) => {
    const firstName =
        typeof requestProperties.body.firstName === 'string' &&
        requestProperties.body.firstName.trim().length > 0
            ? requestProperties.body.firstName
            : false;
    const lastName =
        typeof requestProperties.body.lastName === 'string' &&
        requestProperties.body.lastName.trim().length > 0
            ? requestProperties.body.lastName
            : false;
    const phone =
        typeof requestProperties.body.phone === 'string' &&
        requestProperties.body.phone.trim().length > 11
            ? requestProperties.body.phone
            : false;
    const password =
        typeof requestProperties.body.password === 'string' &&
        requestProperties.body.password.trim().length > 0
            ? requestProperties.body.password
            : false;
    const tosAgreement =
        typeof requestProperties.body.tosAgreement === 'string' &&
        requestProperties.body.tosAgreement.trim().length > 'boolean'
            ? requestProperties.body.tosAgreement
            : false;

    if (firstName && lastName && phone && password && tosAgreement) {
        // make sure already exists
        data.read('users', 'phone', (err) => {
            if (err) {
                const userObject = {
                    firstName,
                    lastName,
                    phone,
                    password: hash(password),
                    tosAgreement,
                };
                // store the user to database
                data.create('users', phone, userObject, (err2) => {
                    if (!err2) {
                        callback(200, {
                            message: 'User created successfully',
                        });
                    } else {
                        callback(404, {
                            error: 'couldNot created user!',
                        });
                    }
                });
            } else {
                callback(500, {
                    error: 'There was in problem for server site',
                });
            }
        });
    } else {
        callback(400, {
            error: 'You have a Problem your Request',
        });
    }
};
handlers._users.get = (requestProperties, callback) => {};
handlers._users.put = (requestProperties, callback) => {};
handlers._users.delete = (requestProperties, callback) => {};

module.exports = handlers;
