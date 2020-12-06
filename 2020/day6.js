const {entireFileAsString} = require('../helpers/util');

const abc = Array.from('abcdefghijklmnopqrstuvwxyz');
//const abc = Array.from('abc');

// each line needs to know:
//   What letters have already been found within the grouping?
//   
const getCountOfYes = (() => {
    var runningTotal = 0;
    var people = 0;
    var yes = {};
    const increaseTotal = (val) => {
        runningTotal += val;
    }

    const addPerson = () => people++;

    const getCountForAll = () => {
        const count = abc.filter((x) => yes[x] === people).length;
        console.log(count);
        return count;
    }
    
    const resetPeople = () => people = 0;
        
    return {
        readLine: line => {
            console.log(line);
            if(line === '') {
                console.log(people, yes);
                increaseTotal(getCountForAll());
                yes = {};
                resetPeople();
                return;
            }
            addPerson();
            const lineArr = Array.from(line);
            lineArr.forEach(x => {
                if(!yes[x] || yes[x]===0) {
                    //increaseTotal(1);
                    yes[x] = 1;
                } else {
                    yes[x]++;
                } 
            });
            //console.log(yes, runningTotal);
        },
        getRunningTotal: () => {
            increaseTotal(getCountForAll())
            return runningTotal;
        }
    }
})();

(async () => {
    let yes = {};
    let runningTotal = 0;
    const data = await entireFileAsString('./inputs/day6.input.txt');
    const result = data.split('\r\n').forEach(getCountOfYes.readLine);
    console.log(getCountOfYes.getRunningTotal());
})().catch(e => {
    console.log(e)
})