// dependencies
const data = require('../../lib/data');
const { hash } = require('../../helpers/utilities');
const { parseJSON } = require('../../helpers/utilities');
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
        requestProperties.body.phone.trim().length === 11
            ? requestProperties.body.phone
            : false;

    const password =
        typeof requestProperties.body.password === 'string' &&
        requestProperties.body.password.trim().length > 0
            ? requestProperties.body.password
            : false;

    const tosAgreement =
        typeof requestProperties.body.tosAgreement === 'boolean' &&
        requestProperties.body.tosAgreement
            ? requestProperties.body.tosAgreement
            : false;

    if (firstName && lastName && phone && password && tosAgreement) {
        // make sure that the user doesn't already exists
        data.read('users', phone, (err1) => {
            if (err1) {
                const userObject = {
                    firstName,
                    lastName,
                    phone,
                    password: hash(password),
                    tosAgreement,
                };
                // store the user to db
                data.create('users', phone, userObject, (err2) => {
                    if (!err2) {
                        callback(200, {
                            message: 'User was created successfully!',
                        });
                    } else {
                        callback(500, { error: 'Could not create user!' });
                    }
                });
            } else {
                callback(500, {
                    error: 'There was a problem in server side!',
                });
            }
        });
    } else {
        callback(400, {
            error: 'You have a problem in your request',
        });
    }
};
handlers._users.get = (requestProperties, callback) => {
    // check this valid phone number
    const phone =
        typeof requestProperties.queryStringObject.phone === 'string' &&
        requestProperties.queryStringObject.phone.trim().length === 11
            ? requestProperties.queryStringObject.phone
            : false;
    if (phone) {
        // lookup the user
        data.read('users', phone, (err1, usr) => {
            const user = { ...parseJSON(usr) };
            if (!err1 && user) {
                delete user.password;
                callback(200, user);
            } else {
                callback(404, {
                    error: 'Requested User is not found!',
                });
            }
        });
    } else {
        callback(404, {
            error: 'Requested User is not found!',
        });
    }
};
handlers._users.put = (requestProperties, callback) => {
    // check this valid phone number
    const phone =
        typeof requestProperties.body.phone === 'string' &&
        requestProperties.body.phone.trim().length === 11
            ? requestProperties.body.phone
            : false;
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

    const password =
        typeof requestProperties.body.password === 'string' &&
        requestProperties.body.password.trim().length > 0
            ? requestProperties.body.password
            : false;

    if (phone) {
        if (firstName || lastName || password) {
            // lookup the user
            data.read('users', phone, (err, usrData) => {
                const userData = { ...parseJSON(usrData) };
                if (!err && userData) {
                    if (firstName) {
                        userData.firstName = firstName;
                    }
                    if (lastName) {
                        userData.lastName = lastName;
                    }
                    if (password) {
                        userData.password = hash(password);
                    }
                    // store the data in dataBase
                    data.update('users', phone, userData, (err5) => {
                        if (!err5) {
                            callback(200, {
                                message: 'User was updated successfully',
                            });
                        } else {
                            callback(500, {
                                error: 'There was a server site problem',
                            });
                        }
                    });
                } else {
                    callback(400, {
                        error: 'you have problem your request',
                    });
                }
            });
        } else {
            callback(400, {
                error: 'you have probelm your request',
            });
        }
    } else {
        callback(400, {
            error: 'Invalid phone please try again later',
        });
    }
};
handlers._users.delete = (requestProperties, callback) => {
    // check this valid phone number
    const phone =
        typeof requestProperties.queryStringObject.phone === 'string' &&
        requestProperties.queryStringObject.phone.trim().length === 11
            ? requestProperties.queryStringObject.phone
            : false;
    if (phone) {
        // lookup the user
        data.read('users', phone, (err, userData) => {
            if (!err && userData) {
                data.delete('users', phone, (err2) => {
                    if (!err2) {
                        callback(200, {
                            message: 'User was successfully deleted',
                        });
                    } else {
                        callback(400, {
                            error: 'there was server site problem',
                        });
                    }
                });
            } else {
                callback(400, {
                    error: 'there was server site problem',
                });
            }
        });
    } else {
        callback(400, {
            error: 'there was problem in your request',
        });
    }
};

module.exports = handlers;
