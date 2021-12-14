const {readFileAsArray} = require('../helpers/util');

const actions = {
    'forward': (pos, delta) => {pos.x = pos.x + delta; return pos},
    'down': (pos, delta) => {pos.y = pos.y + delta; return pos},
    'up': (pos, delta) => {pos.y = pos.y - delta; return pos}
};

const actions2 = {
    'forward': (pos, delta) => {
        pos.x = pos.x + delta;
        pos.y = (pos.aim * delta) + pos.y;
        return pos
    },
    'down': (pos, delta) => {pos.aim = pos.aim + delta; return pos},
    'up': (pos, delta) => {pos.aim = pos.aim - delta; return pos}
};

(async () => {
    const input = await (await readFileAsArray('inputs/2-1.txt'));
    let startingPos = {x: 0, y: 0};
    input.forEach(line => {
        const [action, delta] = line.split(' ');
        startingPos = actions[action](startingPos, Number(delta));
    });
    console.log(startingPos);
    console.log(startingPos.x * startingPos.y);
})();

(async () => {
    const input = await (await readFileAsArray('inputs/2-1.txt'));
    let startingPos = {x: 0, y: 0, aim: 0};
    input.forEach(line => {
        const [action, delta] = line.split(' ');
        startingPos = actions2[action](startingPos, Number(delta));
    });
    console.log(startingPos);
    console.log(startingPos.x * startingPos.y);
})();