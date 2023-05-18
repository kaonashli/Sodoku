const INITIAL_BOARD = [
    [7, 6, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 8, 4, 0, 5, 0, 0, 0],
    [0, 9, 0, 0, 0, 0, 7, 3, 1],
    [5, 0, 3, 0, 0, 0, 2, 0, 0],
    [0, 0, 0, 5, 1, 7, 0, 0, 9],
    [0, 0, 0, 0, 0, 0, 4, 5, 7],
    [0, 0, 0, 9, 8, 4, 0, 0, 3],
    [0, 0, 0, 2, 0, 0, 9, 7, 5],
    [9, 0, 1, 7, 0, 0, 0, 0, 4]
]


class Game {
    constructor(initial, board, rowValues, columnValues, gridValues) {
        this.Initial = initial;
        this.Board = board;
        this.ColumnValues = columnValues;
        this.RowValues = rowValues;
        this.GridValues = gridValues;
    }
};

class Square {
    constructor(value, editable, PossibleValues, imPossibleValues, gridNum, gridCoordinates) {
        this.Value = value;
        this.Editable = editable;
        this.PossibleValues = PossibleValues;
        this.ImPossibleValues = imPossibleValues;
        this.GridNum = gridNum;
        this.GridCoordinates = gridCoordinates;
    }
};

let board = [];
let game = new Game(INITIAL_BOARD, [], [], [], []);

function DisplayBoard() {
    let strHTML = ""
    for (let row = 0; row < INITIAL_BOARD.length; row++) {
        strHTML += `<tr>`
        for (let square = 0; square < INITIAL_BOARD[row].length; square++) {
            strHTML += `<td id="R${row}C${square}" class="${(INITIAL_BOARD[row][square] === 0 ? 'editable' : 'stone')}"> 
            ${(INITIAL_BOARD[row][square] === 0 ? '' : INITIAL_BOARD[row][square])} </td>`
        }
        strHTML += `</tr>`
    }
    document.querySelector("#board").innerHTML = strHTML
};

function SetUpBoard() {
    console.log("bismillah")
    let gridCoordinates = [];
    let gridNum = 0;
    for (let row = 0; row < INITIAL_BOARD.length; row++) {
        game.Board.push([])
        for (let square = 0; square < INITIAL_BOARD[row].length; square++) {
            if (square % 3 === 0) {
                gridCoordinates = GetGridCoordinates(row, square)
                gridNum++
            }
            if (INITIAL_BOARD[row][square] === 0) {
                game.Board[row].push(new Square(INITIAL_BOARD[row][square], true, [], [], gridNum, gridCoordinates));
            } else {
                game.Board[row].push(new Square(INITIAL_BOARD[row][square], false, [], [], gridNum, gridCoordinates));
            }
        }
    }

};

function DisplayPossibleValues() {

    let strHTML = ""
    let index = 0;
    let number = 1;
    for (let row = 0; row < game.Board.length; row++) {
        strHTML += `<tr>`
        for (let square = 0; square < game.Board[row].length; square++) {
            index = 0;
            number = 1;
            strHTML += `<td id="pencilR${row}C${square}"> <table cellspacing="0">`
            for (let r = 0; r < 3; r++) {
                strHTML += `<tr>`
                for (let c = 0; c < 3; c++) {
                    if (game.Board[row][square].PossibleValues.length > 0) {
                        if (number === game.Board[row][square].PossibleValues[index]) {
                            strHTML += `<td class="possible">${game.Board[row][square].PossibleValues[index]}</td>`
                            index++;
                        } else {
                            strHTML += `<td></td>`;
                        }
                    } else {
                        strHTML += `<td></td>`;
                    }
                    number++;
                }
                strHTML += `</tr>`
            }
            strHTML += `</table></td>`
        }
        strHTML += `</tr>`
    }
    document.querySelector("#pencil").innerHTML = strHTML
};

function DetermineInitialPossibleValuesOld() {
    // check row >
    let tempRow = [];
    let tempColumnValues = [];
    let tempGridValues = [];
    let tempGridCoordinates = [];
    let PossibleValues = [];
    let countIndex = 0;
    let tempGridNum = 0;
    let newGrid = true
    let efficientCounter = 0;
    for (let row = 0; row < game.Board.length; row++) {
        // tempRow.sort((a, b) => a.Value < b.Value);
        game.RowValues.push([]);
        tempRow = game.Initial[row].slice();
        game.RowValues[row] = tempRow.filter((num) => num !== 0);
        // console.log(game.RowValues[row]);
        for (let square = 0; square < game.Board[row].length; square++) {
            if (game.Board[row][square].Value === 0) {
                PossibleValues = [1, 2, 3, 4, 5, 6, 7, 8, 9];
                // check row possibilities >
                countIndex = 0;
                while (countIndex < game.RowValues[row].length) {
                    PossibleValues = PossibleValues.filter((num) => !game.RowValues[row].includes(num));
                    countIndex++;
                }

                // check column possibilities >
                tempColumnValues = [];
                countIndex = 0;
                game.ColumnValues.push([]);
                for (let col = 0; col < game.Board.length; col++) {
                    tempColumnValues.push(game.Board[col][square].Value)
                    efficientCounter++;
                }
                game.ColumnValues[square] = tempColumnValues.filter((num) => num !== 0);
                while (countIndex <= tempColumnValues.length) {
                    PossibleValues = PossibleValues.filter((num) => !game.ColumnValues[square].includes(num));
                    countIndex++;
                }
                console.log(efficientCounter);

                console.log(game.RowValues[row]);
                console.log("col", game.ColumnValues[square]);

                // check grid possibilities >
                if (tempGridNum !== game.Board[row][square].GridNum) {
                    tempGridNum = game.Board[row][square].GridNum
                    tempGridValues = [];
                    tempGridCoordinates = game.Board[row][square].GridCoordinates;
                    for (let gridRow = tempGridCoordinates[1]; gridRow < tempGridCoordinates[1] + 3; gridRow++) {
                        for (let gridCol = tempGridCoordinates[0]; gridCol < tempGridCoordinates[0] + 3; gridCol++) {
                            if (game.Board[gridRow][gridCol].Value !== 0) {
                                tempGridValues.push(game.Board[gridRow][gridCol].Value);
                            }
                        }
                    }
                    tempGridValues.sort((a, b) => a < b);
                }
                
                countIndex = 0;
                while (tempGridValues[countIndex] !== 0 && countIndex < tempGridValues.length) {
                    if (PossibleValues.indexOf(tempGridValues[countIndex]) >= 0) {
                        PossibleValues.splice(PossibleValues.indexOf(tempGridValues[countIndex]), 1)
                    }
                    countIndex++;
                }
                game.Board[row][square].PossibleValues = PossibleValues;
            }
        }
    }
};

function DetermineInitialPossibleValues() {
    let tempRow = [];
    let tempCol = [];
    for (let row = 0; row < game.Initial.length; row++) {
        game.RowValues.push([]);
        tempRow = game.Initial[row].slice();
        game.RowValues[row] = tempRow.filter((num) => num !== 0);
        console.log(game.RowValues[row]);
    }

    for (let col = 0; col < game.Initial.length; col++) {

        game.ColumnValues.push(col);
        tempCol = game.Initial
    }
}

function UpdatePossibleValues() {

}

function DisplayImpossibleValues() {

}

function DetermineImpossibilities() {

}

function GetGridCoordinates(row, col) {
    let coordinates = [];
    if (col <= 2) {
        coordinates.push(0);
    } else if (col <= 5) {
        coordinates.push(3);
    } else {
        coordinates.push(6);
    }

    if (row <= 2) {
        coordinates.push(0);
    } else if (row <= 5) {
        coordinates.push(3);
    } else {
        coordinates.push(6);
    }
    return coordinates
}

function CheckSoleCandidate() {

};

function CheckUniqueCandidate() {

};

function CheckSolution() {
    let tempSpace;
    for (let row = 0; row < game.Board.length; row++) {
        for (let row2 = 0; row < game.Board[row].length; row2++) {
            tempSpace = game.Board[row][row2];

        }
    }
};

function CheckSquareGrid() {

};

function CheckRow() {

};

function CheckColumn() {

};



DisplayBoard();
SetUpBoard();
DetermineInitialPossibleValuesOld();
DisplayPossibleValues();