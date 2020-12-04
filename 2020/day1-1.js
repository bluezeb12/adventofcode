const inputStr = [];
const fs = require('fs');
const readline = require('readline');
const readInterface = readline.createInterface({
    input: fs.createReadStream('./inputs/day1-1.input.txt')
});

readInterface.on('line', (x) => {
    inputStr.push(x);
});
const input = [
    1721,
    979,
    366,
    299,
    675,
    1456,
];
const findThreeValuesThatSumToNum = (arr, num) => {
    let vals = [];
    arr.find((x) => {
        const diff = num - x;
        const otherTwo = findTwoValuesThatSumToNum(arr, diff);
        if(otherTwo.length > 0) {
            vals.push(...otherTwo, x);
            return true;
        }
    });
    return vals;
}

const findTwoValuesThatSumToNum = (arr, num) => {
    let vals = [];
    arr.find((x) => {
        const diff = num - x;
        const hasDiff = arr.includes(diff);
        if (hasDiff) {
            vals.push(x, diff);
            return true;
        }
    });
    return vals;
}

const getProduct = (x, y) => x * y;

const getProductOfMany = (many) => 
    many.reduce((prod, x) => getProduct(prod, x), 1);


const main = () => {
    const input = inputStr.map(x => Number(x));
    //const results = findTwoValuesThatSumToNum(input, 2020);
    const three = findThreeValuesThatSumToNum(input, 2020);
    console.log(three);
    console.log(getProductOfMany(three));
}

//main();
readInterface.on('close', main);
