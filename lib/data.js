// dependencies
const fs = require('fs');
const path = require('path');
// scaffolding
const lib = {};
// base directory of the data folder
lib.basedir = path.join(__dirname, '/../.data/');

// write data to file
lib.create = (dir, file, data, callback) => {
    // open file for writing
    fs.open(`${lib.basedir + dir}/${file}.json`, 'wx', (err, fileDescriptor) => {
        if (!err && fileDescriptor) {
            // convert data to string
            const stringData = JSON.stringify(data);

            // write data to file then close it
            fs.writeFile(fileDescriptor, stringData, (err2) => {
                if (!err2) {
                    fs.close(fileDescriptor, (err3) => {
                        if (!err3) {
                            callback(false);
                        } else {
                            callback('Error closing the new file');
                        }
                    });
                } else {
                    callback('Error writing to the new file');
                }
            });
        } else {
            callback('There was an error,file already exists');
        }
    });
};
// read data from file
lib.read = (dir, file, callback) => {
    fs.readFile(`${lib.basedir + dir}/${file}.json`, 'utf8', (err, data) => {
        callback(err, data);
    });
};

// update the existing file

lib.update = (dir, file, data, callback) => {
    // file open system
    fs.open(`${lib.basedir + dir}/${file}.json`, 'r+', (err, fileDescriptor) => {
        if (!err && fileDescriptor) {
            // convert to data stringify
            const stringData = JSON.stringify(data);
            // truncate the data(faka kore dawa file)
            fs.ftruncate(fileDescriptor, (err2) => {
                if (!err2) {
                    // writing the file and close it

                    fs.writeFile(fileDescriptor, stringData, (err3) => {
                        if (!err3) {
                            // close the file
                            fs.close(fileDescriptor, (err4) => {
                                if (!err4) {
                                    callback(false);
                                } else {
                                    callback('Error closing file ');
                                }
                            });
                        } else {
                            callback('Error writing file!');
                        }
                    });
                } else {
                    callback('Error is truncate file!');
                }
            });
        } else {
            console.log('error file updating does not exist');
        }
    });
};
// delete the existing file
lib.delete = (dir, file, callback) => {
    // unlink file
    fs.unlink(`${lib.basedir + dir}/${file}.json`, (err) => {
        if (!err) {
            callback(false);
        } else {
            callback('Error is detected');
        }
    });
};

// export
module.exports = lib;
