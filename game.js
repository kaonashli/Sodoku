let board = [];

let game = [
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


function DisplayBoard() {
    let strHTML = ""
    for (let row = 0; row < game.length; row++) {
        strHTML += `<tr>`
        for (let square = 0; square < game[row].length; square++) {
            strHTML += `<td id="R${row}C${square}" class="${(game[row][square] === 0 ? 'editable' : 'stone')}"> 
            ${(game[row][square] === 0 ? '' : game[row][square])} </td>`
        }
        strHTML += `</tr>`
    }
    document.querySelector("#board").innerHTML = strHTML
};

function SetUpBoard() {
    console.log("bismillah")
    for (let row = 0; row < game.length; row++) {
        board.push([])
        for (let square = 0; square < game[row].length; square++) {
            if (game[row][square] === 0) {
                board[row].push(new Square(game[row][square], true, []));
            } else {
                board[row].push(new Square(game[row][square], false, []));
            }
        }
    }

};

function DisplayPossibleValues() {
    let strHTML = ""
    let index = 0;
    let i = 1;
    for (let row = 0; row < board.length; row++) {
        strHTML += `<tr>`
        for (let square = 0; square < board[row].length; square++) {
            index = 0;
            i = 1;
            strHTML += `<td id="pencilR${row}C${square}"> <table cellspacing="0">`
            for (let r = 0; r < 3; r++) {
                strHTML += `<tr>`
                for (let c = 0; c < 3; c++) {
                    if (board[row][square].possibleValues.length > 0) {
                        if (i === board[row][square].possibleValues[index]) {
                            strHTML += `<td>${board[row][square].possibleValues[index]}</td>`
                            index++;
                        } else {
                            strHTML += `<td></td>`;
                        }
                    } else {
                        strHTML += `<td></td>`;
                    }
                    i++;
                }
                strHTML += `</tr>`
            }
            strHTML += `</table></td>`
        }
        strHTML += `</tr>`
    }
    document.querySelector("#pencil").innerHTML = strHTML
};

function DeterminePossibleValues() {
    // check row >
    let tempRow = [];
    let tempColumnValues = [];
    let tempGridValues = [];
    let tempGridCoordinates = [];
    let possibleValues = [];
    let countIndex = 0;
    let x = 0;
    let newGrid = true;
    for (let row = 0; row < board.length; row++) {
        tempRow = board[row].slice();
        tempRow.sort((a, b) => a.value < b.value);
        for (let square = 0; square < board[row].length; square++) {
            if(square%3 === 0){
                newGrid = true;
            }
            if (board[row][square].value === 0) {
                possibleValues = [1, 2, 3, 4, 5, 6, 7, 8, 9];
                // check row possibilities
                countIndex = 0;
                while (tempRow[countIndex].value !== 0 && countIndex < tempRow.length) {
                    if (possibleValues.indexOf(tempRow[countIndex].value) >= 0) {
                        possibleValues.splice(possibleValues.indexOf(tempRow[countIndex].value), 1);
                    }
                    countIndex++;
                }

                // check column possibilities >
                tempColumnValues = [];
                countIndex = 0;
                for (let col = 0; col < board.length; col++) {
                    tempColumnValues.push(board[col][square].value)
                }
                tempColumnValues.sort((a, b) => a < b);
                while (tempColumnValues[countIndex] !== 0 && countIndex <= tempColumnValues.length) {
                    if (possibleValues.indexOf(tempColumnValues[countIndex]) >= 0) {
                        possibleValues.splice(possibleValues.indexOf(tempColumnValues[countIndex]), 1)
                    }
                    countIndex++;
                }

                // check grid possibilities
                if (row === 1) {
                    x = 1;
                }
                if (square%3 === 0 || newGrid) {
                    tempGridValues = [];
                    tempGridCoordinates = GetGridCoordinates(row, square);
                    for (let gridRow = tempGridCoordinates[1]; gridRow < tempGridCoordinates[1] + 3; gridRow++) {
                        for (let gridCol = tempGridCoordinates[0]; gridCol < tempGridCoordinates[0] + 3; gridCol++) {
                            if (board[gridRow][gridCol].value !== 0) {
                                tempGridValues.push(board[gridRow][gridCol].value);
                            }
                        }
                    }
                    tempGridValues.sort((a, b) => a < b);
                    newGrid = false;
                }
                countIndex = 0;
                while (tempGridValues[countIndex] !== 0 && countIndex < tempGridValues.length) {
                    if (possibleValues.indexOf(tempGridValues[countIndex]) >= 0) {
                        possibleValues.splice(possibleValues.indexOf(tempGridValues[countIndex]), 1)
                    }
                    countIndex++;
                }

                board[row][square].possibleValues = possibleValues;
            }
        }
    }

    console.table(board);
};

function DisplayImpossibleValues(){

}

function DetermineImpossibilities(){

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
    for (let row = 0; row < board.length; row++) {
        for (let row2 = 0; row < board[row].length; row2++) {
            tempSpace = board[row][row2];

        }
    }
};

function CheckSquareGrid() {

};

function CheckRow() {

};

function CheckColumn() {

};

class Square {
    constructor(value, editable, possibleValues) {
        this.value = value;
        this.editable = editable;
        this.possibleValues = possibleValues;
    }
};

DisplayBoard();
SetUpBoard();
DeterminePossibleValues();
DisplayPossibleValues();