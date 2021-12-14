const {readFileAsArray} = require('../helpers/util');

const getDepth = (depth, val, index, arr) => {
    //const num = Number(val);
    //console.log(num, val);
    if(index === 0 || !val || !arr[index-1]) {
        return depth;
    }
    if(val > arr[index-1]) {
        console.log(`increased: ${val}`);
        return depth+1;
    }else {
        //console.log(`decreased: ${num}`);
    }
    return depth;
}

(async () => {
    const input = await (await readFileAsArray('inputs/input.txt')).map(Number);
    const result = input.reduce(getDepth, 0)
    console.log(result);
});

(async () => {
    const input = await (await readFileAsArray('inputs/1-1.txt')).map(Number);
    console.log(input);
    const modified = input.map((val, idx, arr) => {
        if(!arr[idx+2]){
            return undefined;
        }
        return val + arr[idx+1] + arr[idx+2];
    }).filter(x => x);
    console.log(modified)
    const result = modified.reduce(getDepth, 0);
    console.log(result);
})();