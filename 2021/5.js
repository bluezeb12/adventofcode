const { readFileAsArray } = require('../helpers/util');

(async () => {
    const input = await readFileAsArray('inputs/5-test.txt');
    
    const coords = input.map(line => {
        const parts = line.replace('\r', '').split(' -> ');
        const first = parts[0].split(',').map(Number);
        const second = parts[1].split(',').map(Number);
        return {
            start: {x: first[0], y: first[1]},
            end: {x: second[0], y:second[1]}
        }
    });
    const onlyLines = coords.filter(line => {
        return line.start.x === line.end.x ||
            line.start.y === line.end.y;
    });
    let count = 0;
    const board = [][];
    onlyLines.forEach(line => {
        if(line.start.x === line.end.x) {
            
        } else {

        }
    })
    console.log(coords);
    console.log(onlyLines);
    // console.log(input); 
})();