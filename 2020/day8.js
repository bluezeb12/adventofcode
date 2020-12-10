const {entireFileAsString} = require('../helpers/util');

const operations = [
    'acc',
    'jmp',
    'nop'
];

const argRegEx = /(\+|-)(\d*)/gm;

const runProgram = (program) => {
    let running = true;
    let terminated = false;
    let i = 0;
    let acc = 0;
    let hasRun = [];
    program.forEach((x) => {hasRun.push(false)});
    
    while(running) { 
        //console.log(program, hasRun, i);
        if(i > hasRun.length - 1){
            terminated = true;
            running = false;
            continue;
        }
        //console.log('running line', i+1);
        if(hasRun[i]) {
            running = false;
            continue;
        }
        hasRun[i] = true;
        const statement = program[i];
        const [op, arg] = statement.split(' ');
        //console.log(op, ' ', arg);
        const [full, sign, num] = /(\+|-)(\d*)/gm.exec(arg);
        switch(op) {
            //acc
            case operations[0]: {
                //console.log(full, sign, num);
                acc = acc - (sign === '+' ? -num : num);
                //console.log('accumulator:', acc);
                i++;
                break;
            } 
            //jmp
            case operations[1]: {
                //console.log(sign, num, i);
                i = i - (sign === '+' ? -num : num);
                //console.log(i);
                //console.log(program[i]);
                break;
            }
            //nop
            case operations[2]:
                i++;
                break;
        }
        //console.log('i', i);
    }
    return {terminated, acc}
}

const attemptToTerminateProgram = (program) => {
    const jmpOrNopCount = program.filter(x => x.split(' ')[0] === operations[1] || x.split(' ')[0] === operations[2]).length;
    const changed = [];
    let result;
    for(let i = 0; i < jmpOrNopCount; i++){
        //console.log('iteration:', i);       
        const indx = program.findIndex((x, index) => {
            if(changed.includes(index)) {
                return false;
            }
            const [op, val] = x.split(' ');
            if(op === operations[1] || op === operations[2]){
                changed.push(index);
                return true;
            }
            return false;
        });
        //console.log('index', indx);
        const newProgram = program.map((x, idx) => {
            const [op, val] = x.split(' ');
            if(idx === indx) {
                return op === operations[1] ? 
                    `${operations[2]} ${val}` :
                    `${operations[1]} ${val}`;
            }
            return x;
        });
        //console.log(program);
        //console.log(newProgram);
        const {terminated, acc} = runProgram(newProgram);
        //console.log(terminated, acc);
        if(terminated) {
            result = acc;
            break;
        }
    }
    return result;
}

(async () => {
    const file = await entireFileAsString('./inputs/day8.input.txt');
    const lines = file.split('\r\n');
    const hasRun = [];
    lines.forEach((x) => {hasRun.push(false)});
    let running = true;
    let terminated = false;
    let i = 0;
    let acc = 0;
    const result = attemptToTerminateProgram(lines);
    console.log('result:', result);
    
    // while(running) { 
    //     if(i === hasRun.length - 1){
    //         terminated = true;
    //     }
    //     //console.log('running line', i+1);
    //     if(hasRun[i]) {
    //         running = false;
    //         continue;
    //     }
    //     hasRun[i] = true;
    //     const statement = lines[i];
    //     const [op, arg] = statement.split(' ');
    //     //console.log(op, ' ', arg);
    //     const [full, sign, num] = /(\+|-)(\d*)/gm.exec(arg);
    //     switch(op) {
    //         //acc
    //         case operations[0]: {
    //             //console.log(full, sign, num);
    //             acc = acc - (sign === '+' ? -num : num);
    //             //console.log('accumulator:', acc);
    //             i++;
    //             break;
    //         } 
    //         //jmp
    //         case operations[1]: {
    //             //console.log(sign, num, i);
    //             i = i - (sign === '+' ? -num : num);
    //             //console.log(i);
    //             //console.log(lines[i]);
    //             break;
    //         }
    //         //nop
    //         case operations[2]:
    //             i++;
    //             break;
    //     }
    //     //console.log('i', i);
    // }
    // console.log(acc);
    // console.log(terminated);
    // if(!terminated) {
    //     attemptToTerminateProgram(lines);
    // }
})().catch(e => {
    console.log(e);
})