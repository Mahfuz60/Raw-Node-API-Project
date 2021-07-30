/*
Title:up to down time Monitoring application
Description:A RESTFUL API to monitor up or down time User Using Link
Date:26/7/21
Author:Mahfuz Alam
*/
// dependencies
const http = require('http');

const { handleReqRes } = require('./helpers/handleReqRes');
const environment = require('./helpers/environment');
const data = require('./lib/data');

// app object= module scaffolding
const app = {};
// testing the file system
data.create('test', 'newFile', { name: 'Bangladesh', language: 'Bengali' }, (err) => {
    console.log(err);
});
// create server
app.createServer = () => {
    const server = http.createServer(app.handleReqRes);
    server.listen(environment.port, () => {
        console.log(`listening to the port ${environment.port}`);
    });
};

// Handle Request Response
app.handleReqRes = handleReqRes;

// start server
app.createServer();
