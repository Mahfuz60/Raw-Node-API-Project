const handlers = {};
handlers.notFoundHandler = (requestProperties, callback) => {
    callback(404, {
        message: 'Your request is not found',
    });
};
module.exports = handlers;
