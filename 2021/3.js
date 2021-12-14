const {readFileAs2DArray} = require('../helpers/util');

const mostCommon = (column) => {
    const nums = column.map(Number);
    const ones = nums.filter(x => x).length;
    const zeros = nums.filter(x => !x).length;
    //console.log(`1: ${ones} 0: ${zeros}`);
    return ones === zeros ? '1' : Math.max(ones, zeros) === ones ? '1' : '0';
}

const leastCommon = (column) => {
    return mostCommon(column) === '1' ? '0' : '1';
}

const transposeArray = (input) => 
    input[0].map((x, i) => input.map(x=> x[i]));

(async () => {
    const input = await (await readFileAs2DArray('inputs/3-1.txt'));
    console.log(input);
    const trasnposed = input[0].map((x, i) => input.map(x=> x[i]));
    console.log(trasnposed);
    const result = trasnposed.map((column) => {
        const nums = column.map(Number);
        const ones = nums.filter(x => x).length;
        const zeros = nums.filter(x => !x).length;
        return Math.max(ones, zeros) === ones ? '1' : '0';
    });
    console.log(result);
    const bin = result.join('');
    console.log(bin);
    const num1 = Number.parseInt(bin, 2)
    console.log(`Gamma: ${num1}`);
    const inverse = result.map(x => x === '1' ? '0' : '1');
    const bin2 = inverse.join('');
    console.log(bin2);
    const num2 = Number.parseInt(bin2, 2);
    console.log(`Epsilon: ${num2}`);
    console.log(num1 * num2);
});

const removeFirstEntry = (arr) => 
    arr.map((row) => row.slice(1));

const removeRows = (arr, rowsToRemove) => 
    arr.filter((x,idx) => !rowsToRemove.includes(idx))

const calculateRatingsRecHelper = (arr, trans, op) => {

}

/**
 * 
 * @param {Array} arr - Original input, in original order
 * @param {Array} trans - Transposed array for simplicity
 * @param {*} op - the operator to use, either `mostCommon` or `leastCommon`
 *      A function that takes a `column` (1 row from the transposed 2D array)
 */
const calculateRatings = (arr, trans, op) => {
    //console.log(arr);
    let modifiedArr = arr.slice();
    const countOfBits = trans.length;
    for(let x = 0; x < countOfBits; x++) {
        if(!modifiedArr || modifiedArr.length <= 1 ||
            !trans || trans.length === 0) break;
        trans = transposeArray(modifiedArr);
        const valueToKeep = op(trans[x]);
        //console.log(valueToKeep);
        modifiedArr = modifiedArr.filter((row) => row[x] === valueToKeep);
        //console.log(modifiedArr);
    }
    return modifiedArr.flatMap(x => x);
}

(async () => {
    const input = await (await readFileAs2DArray('inputs/3-1.txt'));
    //console.log(input);
    const transposed = transposeArray(input);

    const oxygenRating = calculateRatings(input, transposed, mostCommon);
    const o2 = Number.parseInt(oxygenRating.join(''), 2);
    console.log('Oxygen', o2);
    const co2Rating = calculateRatings(input, transposed, leastCommon);
    const co2 = Number.parseInt(co2Rating.join(''), 2);
    console.log('CO2', co2);
    console.log('life support rating:', o2 * co2)
    // while(bitPosition < trasnposed.length) {
    //     const bits = trasnposed[bitPosition];
    //     const oxy = mostCommon(firstBits);
    //     // const co2 = leastCommon(firstBits);
    //     const toKeep = firstBits.map((x, idx) => {
    //         return x === bitCrit ? idx : undefined;
    //     }).filter(x => x);
    //     console.log(toKeep);
    //     const kept = input.filter((x, idx) => toKeep.includes(idx));
    //     console.log(kept);
    // }
    
})();