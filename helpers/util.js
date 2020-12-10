
/**
 * 
 * @param {string} filename The fiile name to read
 * @param {*} fn a Function that expects one parameter, x -> which represents the line from the file.
 */
const lineByLineInput = (filename, fn, onClose) => {
    const fs = require('fs');
    const readline = require('readline');
    const readInterface = readline.createInterface({
        input: fs.createReadStream(filename)
    });
    readInterface.on('line', fn);
    if(onClose)
        readInterface.on('close', onClose);
}

const readFileAsArray = async (filename, modifier) => {
    const fs = require('fs').promises;
    
    let data = await fs.readFile(filename, 'utf8');
    const arr = data.split('\r\n').map(x => modifier ? modifier(x) : x);
    return Promise.resolve(arr);
}

const readFileAs2DArray = async (filename) => {
    const fs = require('fs').promises;

    let data = await fs.readFile(filename, 'utf8');
    const lines = data.split('\r\n');
    const arr = lines.map(x=> Array.from(x));

    return arr;
}

const entireFileAsString = async (filename) => {
    const fs = require('fs').promises;
    let data = await fs.readFile(filename, 'utf8');
    
    return data;
}


module.exports = {
    lineByLineInput,
    readFileAsArray,
    readFileAs2DArray,
    entireFileAsString
};