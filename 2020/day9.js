const {entireFileAsString} = require('../helpers/util');

const isValid = (last, num) => {
    let isValid = false;
    last.forEach((x,index,arr) => {
        if(isValid) return;
        arr.forEach((y, idx) => {
            if(isValid) return;
            if(index === idx) {
                return;
            }
            //console.log(x, y, x+y === num);
            isValid = x + y === num;
        });
    });
    return isValid;
}

isValid([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25], 26);

const findNonValidEntry = (preambleLength, data) => {
    const preamble = data.splice(0,preambleLength).map(Number);
    console.log(preamble);
    const left = data.map(Number);
    console.log(left);
    let pre = preamble.map(x => x);
    left.forEach((x) => {
        //console.log(pre);
        const valid = isValid(pre, x);
        if(!valid) {
            console.log('not valid', pre, x);
        }
        
        const temp = pre.slice(1,preambleLength);
        //console.log(temp, pre);
        temp.push(x);
        pre = temp;
        
        //console.log(temp, pre, x);
    })
}

(async () => {
    const file = await entireFileAsString('./inputs/day9.input.txt');
    const data = file.split('\r\n').map(Number);
    findNonValidEntry(25, data);
})().catch(console.log);

// findNonValidEntry(5, `35
// 20
// 15
// 25
// 47
// 40
// 62
// 55
// 65
// 95
// 102
// 117
// 150
// 182
// 127
// 219
// 299
// 277
// 309
// 576`.split('\n'));
