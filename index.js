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
// testing the  write file system
data.create(
    'test',
    'newFile',
    {
        Country: 'Bangladesh',

        language: 'Bengali',
        independent: 1971,
        nationality: 'Bangladeshi',
        population: 20200000,
    },
    (err) => {
        console.log('Error was', err);
    }
);

// testing the read file system

data.read('test', 'newFile', (err, result) => {
    console.log(err, result);
});
// testing the update file system
data.update('test', 'newFile', { name: 'England', language: 'English' }, (err) => {
    console.log(err);
});
// testing delete file system
data.delete('test', 'newFile', (err) => {
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
