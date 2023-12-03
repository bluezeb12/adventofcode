const { readFileAsArray } = require('../helpers/util');

const colorRegEx = /((\d+ red)|(\d+ blue)|(\d+ green))/g

const maxCubes = {
    red: 12,
    green: 13,
    blue: 14
};

const isGamePossible = line => {
    const [gameNumStr, gamesStr] = line.split(':');
    const gameNum = Number(/\d+/g.exec(gameNumStr)[0]);
    const gamesSplit = gamesStr.split(';');
    const games = gamesSplit.map(g => {
        const matches = g.match(colorRegEx);
        const result = {};
        matches.forEach((x) => {
            const spl = x.split(' ');
            result[spl[1]] = Number(spl[0]);
        });
        console.log(result);
        return result;
    });
    return games.filter(x => {
        return (x.red && x.red <= maxCubes.red) &&
            (x.green && x.green <= maxCubes.green) &&
            (x.blue && x.blue <= maxCubes.blue);
    }).length == games.length;
};

(async () => {
    const lines = readFileAsArray('inputs/2-test.txt');
    const filtered = lines.filter(isGamePossible);
    console.log(filtered);
})();