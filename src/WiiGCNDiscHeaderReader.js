const fsp = require('fs').promises;
const fs = require('fs');

// we read 512 extra bytes because those are the wbfs info bytes
const HEADER_SIZE = 512 + 1024;

const Reader = (path) => {
    return fsp.open(path, 'r')
        .then(fileHandle => fileHandle.fd)
        .then(fd => {
            return new Promise((resolve, reject) => {
                fs.open(path, 'r', (status, fileDescriptor) => {
                    const buffer = Buffer.alloc(HEADER_SIZE);
                    fs.read(fileDescriptor, buffer, 0, HEADER_SIZE, 0, (err, bytesRead, buffer) => {
                        if (err) return reject(err);
                        return resolve(buffer);
                    });
                });
            })
            
        }) 
    
}

module.exports.Reader = Reader;