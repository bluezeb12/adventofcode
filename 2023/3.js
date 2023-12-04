const { readFileAs2DArray } = require('../helpers/util');

const re = /[^a-zA-Z_\.]/g;
const onlyNumbers = /[0-9\.]+/g;
const symbols = /[*/+@$\#\-=]+/g;

(async () => {
    const input = await readFileAs2DArray('inputs/3-test.txt','\n');
    console.log(input);
    const indexes = [];
    input.forEach((x, i) => {
        const str = x.join('');
        // console.log(symbols.test(str));
        const hasSymbol = /[*/+@$\#\-=]+/g.test(str);
        console.log(str, hasSymbol, i);
        if(hasSymbol) indexes.push(i);
        return hasSymbol;
    });
    console.log(indexes);
    //console.log(symbolLines);
    
})();