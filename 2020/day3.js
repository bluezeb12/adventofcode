const { readFileAs2DArray } = require('../helpers/util');

const createSlope = (x, y) => ({
    down: y,
    right: x
});

const getStartingPosition = () => ({
    y: 0,
    x: 0
});

const addSlopeToPos = (slope, {x, y}, maxX) => ({
    y: y + slope.down,
    x: (x + slope.right >= maxX) ?
        -((maxX - x) - slope.right) : 
        (x + slope.right)
});

const checkForTreeAtCoords = (map, {x, y}) => map[y][x] === '#';

const traverseMapBySlope = (map, slope) => {
    let position = getStartingPosition();
    let numberOfTrees = 0;
    while (position.y < map.length - 1) {
        position = addSlopeToPos(slope, position, map[position.y].length);
        //console.log(position);
        //console.log(map[position.y][position.x]);
        numberOfTrees = numberOfTrees + (checkForTreeAtCoords(map, position) ? 1 : 0)
    }
    return numberOfTrees;
}


(async () => {
    const arr = await readFileAs2DArray('./inputs/day3.input.txt');
    const result = traverseMapBySlope(arr, createSlope(3, 1));
    console.log(result);

    const slopes = [
        createSlope(1, 1),
        createSlope(3, 1),
        createSlope(5, 1),
        createSlope(7, 1),
        createSlope(1, 2)
    ];
    const trees = slopes.map(slope => traverseMapBySlope(arr, slope));
    console.log(trees);
    const total = trees.reduce((product, val) => product * val, 1);
    console.log(total);
    // console.log(arr);
    // console.log(arr[0][0]);
    // console.log(arr[1][3]);
    // console.log(arr[2][6]);
})().catch(ex => {
    console.log(ex);
});