const parser = require('xml2js');
const path = require('path');
const fs = require('fs');
const fsp = require('fs').promises;

function getBestName(game) {
    const locales = game.locale;
    const myLocale = locales.find((locale) => locale['$'].lang === 'EN');
    return myLocale.title[0];
}

const ParseWiiTDB = (path) => {
    return new Promise((resolve, reject) => {

        fs.readFile(path, "utf8", (err, xmlString) => {
            if (err) return reject(err);


            parser.parseString(xmlString, function (error, result) {
                if (error) return reject(error);

                const file = result.datafile;
                const games = file.game;
                const gamesAndId = games
                    .reduce((theMap, game) => {
                        theMap[game.id[0]] = getBestName(game);
                        return theMap;
                    }, {});

                resolve(gamesAndId);

            });

        });

    });
}

module.exports.ParseWiiTDB = ParseWiiTDB;