const {readFileAsArray} = require('../helpers/util');

const getSeatId = (row, col) => row * 8 + col;

const getMidpoint = (min, max, fn) => (fn((max-min)/2) + min);

const minimizeHelper = (remaining, min, max, bottom) => {
    if(remaining.length === 1) {
        return remaining[0] === bottom ?
            min : max;
    }
    const bottomOrTop = remaining[0];
    return bottomOrTop === bottom ?
        minimizeHelper(remaining.slice(1), min, getMidpoint(min,max, Math.floor), bottom) :
        minimizeHelper(remaining.slice(1), getMidpoint(min, max, Math.ceil), max, bottom);
}

//This will expect only the first 7 characters, which will be either L or R
const getRow = (rowPiece) => {
    //console.log(rowPiece)
    return minimizeHelper(rowPiece, 0, 127, 'F');
}

const getCol = (colPiece) => {
    return minimizeHelper(colPiece, 0, 7, 'L')
}

const getSeat = (line) => {
    const arr = Array.from(line);
    //console.log(arr.slice(0,))
    const row = getRow(arr.slice(0,7));
    const col = getCol(arr.slice(7));
    //console.log(getSeatId(row, col));
    return getSeatId(row, col);
};

(async () => {
    const lines = await readFileAsArray('./inputs/day5.input.txt');
    const allSeatIds = lines.map(getSeat);
    console.log(Math.max.apply(this, allSeatIds));
    const sorted = allSeatIds.sort((a,b) => a < b ? -1 : a > b ? 1 : 0);
    const mySeat = sorted.find((seat, idx, arr) => {
        if(idx === arr.length - 1) {
            return -1;
        }
        console.log(seat, arr[idx+1]);
        return arr[idx + 1] === seat + 2;

    }) + 1;
    console.log(mySeat);
})().catch((ex) => {
    console.log(ex);
});