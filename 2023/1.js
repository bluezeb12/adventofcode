const {readFileAsArray} = require('../helpers/util');

const strToNum = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9
}

/** This was borrowed from here: 
 * https://github.com/ivanjermakov/adventofcode/blob/master/aoc2023/src/day1/day1b.ts
 * To assist with debugging a minor discrepancy.. It was found that overlapping values casued regex issues
 * eightsevenvqvzlqxkbm6rqhsgqpnine7twonex
 * see above, the twone, share an o so it misses the 1, making the total higher/lower than expected.
 * This helped me solve this discrepancy using the 'backwards' regexp below
 * Technique learned from here: https://mtsknn.fi/blog/how-to-do-overlapping-matches-with-regular-expressions/
 */
// const solve = (input) => {
//     const data = input.map(l => {
//         const dgs = l.split('')
//             .map((c, i) => {
//                 const nxt = l.slice(i);
//                 if (nxt.startsWith('one')) return 1
//                 if (nxt.startsWith('two')) return 2
//                 if (nxt.startsWith('three')) return 3
//                 if (nxt.startsWith('four')) return 4
//                 if (nxt.startsWith('five')) return 5
//                 if (nxt.startsWith('six')) return 6
//                 if (nxt.startsWith('seven')) return 7
//                 if (nxt.startsWith('eight')) return 8
//                 if (nxt.startsWith('nine')) return 9
//                 return parseInt(c)
//             })
//             .filter(n => !!n);
//         return Number('' + dgs[0] + dgs[dgs.length-1]);
//     })
//     console.dir(data, {maxArrayLength: null});
    
//     return data.reduce((a,b) => a+b, 0);
// }

const getComplexCalibrationValue = (line) => {
    const numRe = /(1|2|3|4|5|6|7|8|9)/;
    const re = /(1|2|3|4|5|6|7|8|9|one|two|three|four|five|six|seven|eight|nine|ten)/g
    const backwards = /(?<=(1|2|3|4|5|6|7|8|9|one|two|three|four|five|six|seven|eight|nine|ten))/g
    const nums = line.match(re);
    const back = Array.from(line.matchAll(backwards));
    // console.log(back);
    // console.log(back[back.length-1][1]);
    let [first, last] = [nums[0], back[back.length-1][1]];
    // console.log(first, last);
    // console.log(`${first}: ${numRe.test(first)}, ${last}: ${numRe.test(last)}`);
    if(!numRe.test(first)) {
        first = strToNum[first];
    }
    if(!numRe.test(last)) {
        last = strToNum[last];
    }
    // console.log(`${first}${last}`);
    //return nums.length === 1 ? Number.parseInt(first) * 10 : Number.parseInt('' + first + last);
    return Number.parseInt(first) * 10 + Number.parseInt(last);
}

const getCalibrationValue = (line) => {
    const re = /\d/g;
    const nums = line.match(re);
    console.log(line, nums);
    return Number.parseInt('' + nums[0] + nums[nums.length - 1]);
}

(async () => {
    const input = await readFileAsArray('inputs/1-1.txt');
    const calibrationValues = input.map(getComplexCalibrationValue);
    console.dir(calibrationValues, {maxArrayLength: null});
    console.log(calibrationValues.reduce((a, c) => a+c, 0));
})();
