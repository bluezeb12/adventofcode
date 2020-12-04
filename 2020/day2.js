
const { readFileAsArray } = require('../helpers/util');

const createBinaryObj = (string, char, label1, label2) => {
    const split = (string.split(char || '-')).map(Number);
    return {
        [label1]: split[0],
        [label2]: split[1]
    };
}

const createRange = (string, char) => createBinaryObj(string, char, 'min', 'max');

const createPositions = (string, char) => createBinaryObj(string, char, 'first', 'last');

const createTernaryObjectFromLine = (line, reg, lbl1, lbl2, lbl3, fn) => {
    const matches = reg.exec(line);
    //console.log(matches);
    return {
        [lbl1]: fn(matches[1]),
        [lbl2]: matches[2],
        [lbl3]: matches[3]
    };
}

const parseLine = (line) => createTernaryObjectFromLine(line, /(\d*-\d*) (\w): (\w*)/gm, 'range', 'letter', 'password', createRange);

const parseLine2 = (line) => createTernaryObjectFromLine(line, /(\d*-\d*) (\w): (\w*)/gm, 'positions', 'letter', 'password', createPositions);

const checkForValidPassword = ({range, letter, password}) => {
    const strArray = Array.from(password);
    const count = strArray.reduce((count, ltr) => 
        count + (letter === ltr ? 1 : 0)
        , 0);
    return count >= range.min && count <= range.max;
}

const fixPositions = (positions) => ({
    first: positions.first - 1,
    last: positions.last - 1
})

const checkForValidTobogganPassword = ({positions, letter, password}) => {
    const strArray = Array.from(password);
    const pos = fixPositions(positions);
    const isInFirstPosition = strArray[pos.first] === letter;
    const isInSecondPosition = strArray[pos.last] === letter;
    return ( (isInFirstPosition && !isInSecondPosition) ||
        (!isInFirstPosition && isInSecondPosition) );
}

(async() => {
    const input = await readFileAsArray('./inputs/day2.input.txt');
    //const line = '1-3 a: abcde';
    const result = input.reduce((count, line) => {
        return count + ((checkForValidPassword(parseLine(line))) ? 1 : 0)
    }
    , 0);
    console.log('first', result);
    const result2 = input.reduce((count, line) => {
        return count + ((checkForValidTobogganPassword(parseLine2(line))) ? 1 : 0)
    }
    , 0);
    console.log(result2);
})().catch(ex => {
    console.log(ex);
})