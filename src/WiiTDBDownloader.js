const download = require('download-file');
const fs = require('fs');
const temp = require('temp');
const path = require('path');
const unzipper = require('unzipper');

const url = 'https://www.gametdb.com/wiitdb.zip?LANG=EN&WIIWARE=1&GAMECUBE=1';

const Downloader = (wiitdbPath) => {
  const alreadyExists = fs.existsSync(wiitdbPath);
  if (alreadyExists) {
    console.log('Wiitdb present, skipping download');
    return Promise.resolve(wiitdbPath);
  }

  return new Promise((resolve, reject) => {
    const tempName = temp.path({ suffix: '.zip' });

    const location = path.parse(tempName);

    const options = {
      directory: location.dir,
      filename: location.base,
    };

    console.log('Downloading Wiitdb');

    download(url, options, (err) => {
      if (err) return reject(err);
      fs.createReadStream(tempName)
        .pipe(unzipper.Extract({ path: path.parse(wiitdbPath).dir }))
        .promise()
        .then(() => resolve(wiitdbPath))
        .catch((error) => reject(error));
    });
  });
};

module.exports.Downloader = Downloader;
