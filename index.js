const path = require('path');
const fs = require('fs');
const fsp = require('fs').promises;
const filenamify = require('filenamify');
const DiscHeaderParser = require('./src/WiiGCNDiscHeaderParser').Parser;
const DiscHeaderReader = require('./src/WiiGCNDiscHeaderReader').Reader;
const { ParseWiiTDB } = require('./src/WiiTDBParser');
const WiiTDBDownloader = require('./src/WiiTDBDownloader').Downloader;

const myArgs = process.argv.slice(2);
console.log(myArgs);

const root = myArgs[0];

const gameFileRegex = /^game\.\w+$/;

const sortByImagePriority = (a, b) => {
  if (gameFileRegex.test(a)) {
    return -1;
  }
  if (gameFileRegex.test(b)) {
    return 1;
  }
  return a.localeCompare(b);
};

const isDiscFile = (file) => {
  const fileLc = file.toLowerCase();
  return fileLc.endsWith('.iso') || fileLc.endsWith('.wbfs') || fileLc.endsWith('.gcm');
};

const normalizeDirectories = (wiiTDB) => {
  fsp.readdir(root)
    .then((directories) => {
      directories.forEach((isodir) => {
        const pathtoisodir = path.join(root, isodir);
        fsp.readdir(pathtoisodir)
          .then((isofiles) => {
            const onlyIso = isofiles
              .map((file) => file)
              .filter((file) => isDiscFile(file))
              .sort(sortByImagePriority);

            if (!onlyIso.length) {
              console.error(isodir);
              return;
            }

            const isoName = onlyIso[0];
            const pathToIso = path.join(pathtoisodir, isoName);

            DiscHeaderReader(pathToIso)
              .then((data) => {
                const header = DiscHeaderParser(data);

                const newTitle = `${filenamify(wiiTDB[header.titleId])} [${header.titleId}]`;

                const newpathtoisodir = path.join(root, newTitle);

                if (pathtoisodir !== newpathtoisodir) {
                  console.log('Renaming', {
                    original: pathtoisodir,
                    new: newpathtoisodir,
                  });

                  const result = fs.renameSync(pathtoisodir, newpathtoisodir);
                  console.log(result);
                }

                if (header.isGameCubeDisc && onlyIso.length === 1 && !gameFileRegex.test(isoName)) {
                  const extension = /\.\w+$/.exec(isoName)[0];
                  const newName = `game${extension}`;
                  console.log('renaming iso');
                  const updatedPathToIso = path.join(newpathtoisodir, isoName);
                  fs.renameSync(updatedPathToIso, path.join(newpathtoisodir, newName));
                }
              });
          });
      });
    });
};


WiiTDBDownloader('db/wiitdb.xml')
  .then((wiitdbPath) => ParseWiiTDB(wiitdbPath)
    .then((wiiTDB) => normalizeDirectories(wiiTDB)));
