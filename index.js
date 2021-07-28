/*
Title:up to down time Monitoring application
Description:A RESTFUL API to monitor up or down time User Using Link
Date:26/7/21
Author:Mahfuz Alam
*/
// dependencies
const http = require('http');

const { handleReqRes } = require('./helpers/handleReqRes');

// app object= module scaffolding
const app = {};
// configuration
app.config = {
    port: 3000,
};

// create server
app.createServer = () => {
    const server = http.createServer(app.handleReqRes);
    server.listen(app.config.port, () => {
        console.log(`listening to the port ${app.config.port}`);
    });
};

// Handle Request Response
app.handleReqRes = handleReqRes;

// start server
app.createServer();
