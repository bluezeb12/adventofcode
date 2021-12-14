//*
// A board will be defined like so:
/*
    [
        [{val: Number, marked: boolean}, {val, marked}, ...],
        [{}, {}, ...],
        [{}, {}, ...],
        [{}, {}, ...],
        [{}, {}, ...],
    ]
*/
//

const { readFileAsArray } = require("../helpers/util");

const b = [
    [{val: 14, marked: true}, {val: 21, marked: true}, {val: 17, marked: true}, {val: 24, marked: false}, {val: 4, marked: true}],
    [{val: 10, marked: false}, {val: 16, marked: false}, {val: 15, marked: false}, {val: 9, marked: true}, {val: 19, marked: false}],
    [{val: 18, marked: true}, {val: 8, marked: false}, {val: 23, marked: true}, {val: 26, marked: false}, {val: 20, marked: false}],
    [{val: 22, marked: true}, {val: 11, marked:true}, {val: 13, marked: false}, {val: 6, marked: false}, {val: 5, marked: true}],
    [{val: 2, marked: true}, {val: 0, marked:false}, {val: 12, marked: true}, {val: 3, marked: true}, {val: 7, marked:true}]
];

const markASpot = (board, val) => {
    console.log(val);
    let i;
    const contains = board.flatMap(x => x).filter((x, index) => {if(x.val === val) { i = index; return x.val === val;}});
    console.log(contains, i);
    if(i || contains.length > 0) {
        board[Math.floor(i / 5)][(i - (5 * Math.floor(i / 5)))].marked = true;
        console.log(board[Math.floor(i / 5)][(i - (5 * Math.floor(i / 5)))]);
    }
    return board;
}

const calculateUnMarked = (board) => {
    const sum = board.reduce((sum, row, idx) => {
        const innerSum = row.reduce((inSum, space) => {
            return inSum + (!space.marked ? space.val : 0);
        }, 0);
        return sum + innerSum;
    }, 0);
    return sum;
}

// console.log(calculateUnMarked(b));

const boardHasWon = (board) => {
    for(let x = 0; x < board.length; x++) {
        for(let y = 0; y < board[x].length; y++) {
            if(x === 0 && board[x][y].marked) {
                const hasWonDown = board.reduce((won, row) => {
                    return won && row[y].marked;
                }, true);
                console.log('down', hasWonDown);
                if(hasWonDown) {
                    return hasWonDown;
                }
            }
            //Disable Diagonal (for now?)
            // if(x === 0 && (y === 0 || y === board[x].length - 1) && board[x][y].marked) {
            //     let won = true;
            //     if(y === 0) {
            //         for(let i = y; i < board[x].length; i++) {
            //             won = won && board[i][i].marked
            //         }
            //     }
            //     if(y === board[x].length - 1) {
            //         for(let i = y, j = 0; i > 0; i--, j++) {
            //             won = won && board[j][i].marked
            //         }
                    
            //     }
            //     console.log('diagonal', won);
            //     if(won){
            //         return won;
            //     }
            // }
            if(y === 0 && board[x][y].marked) {
                const hasWonAcross = board[x].reduce((won, col) => {
                    return won && col.marked;
                }, true);
                console.log('across', hasWonAcross);
                if(hasWonAcross) {
                    return hasWonAcross;
                }
            }
        }
    }
}

const r = [
    '22 13 17 11 0',
    '8 2 23 4 24',
    '21 9 14 16 7',
    '6 10 3 18 5',
    '1 12 20 15 19'
]

const createBoard = (rows) => {
    const b = rows.map((r) => {
        //console.log(r);
        const line = r.split(' ').filter(x => x).map(Number);
        //console.log(line);
        return line.map((l) => ({val: l, marked: false}));
    });
    return b;
}

(async () => {
    const input = await readFileAsArray('inputs/4-1.txt');
    const calledNumbers = input[0].split(',').map(Number);
    //console.log(input.length);
    const boardCount = Math.floor((input.length - 2) / 5);
    console.log(boardCount);
    let boards = [];
    for(let i = 0; i < boardCount; i++){
        boards.push(createBoard(input.slice(2 + (i * 6), (2 + (i * 6)) + 5)));
    }
    //console.log(JSON.stringify(boards, null, 2));
    let winner = {board: -1, called: -1};
    calledNumbers.forEach((num) => {
        console.log(num);
        if(winner.board >= 0) {
            return;
        }
        boards = boards.map(b => {
            return markASpot(b, num);
        })
        boards.forEach((b, i) => {
            if(boardHasWon(b)){
                winner = {
                    board: i,
                    called: num
                }
            }
        });
    })
    console.log('Winner', winner);
    console.log('Winner Board:', boards[winner.board]);
    console.log(calculateUnMarked(boards[winner.board]) * winner.called);
    // boards.forEach(board => boardHasWon(board));
    // boards.forEach(board => markASpot(board, 23));
    //console.log(boardHasWon(b));
});

(async () => {
    const input = await readFileAsArray('inputs/4-1.txt');
    const calledNumbers = input[0].split(',').map(Number);
    //console.log(input.length);
    const boardCount = Math.floor((input.length - 2) / 6);
    console.log(boardCount);
    let boards = [];
    for(let i = 0; i < boardCount; i++){
        boards.push(createBoard(input.slice(2 + (i * 6), (2 + (i * 6)) + 5)));
    }
    //console.log(JSON.stringify(boards, null, 2));
    let winners = [];
    calledNumbers.forEach((num) => {
        console.log(num);
        if(winners.length === boardCount) {
            console.log('all won');
            return;
        }
        boards = boards.map(b => {
            return markASpot(b, num);
        })
        boards.forEach((b, i) => {
            if(boardHasWon(b)){
                const winner = {
                    board: i,
                    called: num
                }
                //console.log(winner);
                const ind = winners.findIndex(val => val.board === i)
                //console.log(ind);
                if(ind === -1){
                    winners.push(winner);
                }
            }
        });
    })
    console.log('Winner', winners, winners.length, boardCount);
    console.log(winners[winners.length - 1]);
    console.log('Winner Board:', boards[winners[winners.length-1].board]);
    console.log(calculateUnMarked(boards[winners[winners.length-1].board]) * winners[winners.length-1].called);
    // boards.forEach(board => boardHasWon(board));
    // boards.forEach(board => markASpot(board, 23));
    //console.log(boardHasWon(b));
})();

//console.log(createBoard(r));