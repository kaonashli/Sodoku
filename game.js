const EASY_BOARD = [
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

const MEDIUM_BOARD = [
    [0, 1, 8, 0, 0, 0, 0, 4, 0],
    [7, 5, 3, 0, 0, 0, 1, 0, 0],
    [0, 0, 6, 0, 5, 7, 0, 0, 0],
    [0, 3, 0, 0, 7, 2, 0, 0, 4],
    [6, 0, 9, 8, 3, 0, 2, 0, 0],
    [8, 0, 0, 0, 0, 9, 0, 0, 0],
    [0, 0, 5, 0, 6, 0, 0, 2, 9],
    [0, 7, 0, 0, 0, 8, 0, 6, 1],
    [0, 0, 0, 0, 1, 0, 0, 0, 0]
]

const HARD_BOARD = [
    [0, 1, 0, 0, 0, 6, 0, 0, 0],
    [7, 0, 0, 3, 0, 0, 8, 0, 5],
    [0, 0, 0, 0, 0, 0, 7, 9, 0],
    [1, 7, 0, 5, 0, 0, 0, 0, 9],
    [9, 0, 3, 0, 2, 7, 0, 0, 8],
    [0, 0, 0, 1, 0, 0, 0, 0, 0],
    [8, 0, 5, 0, 0, 1, 0, 3, 0],
    [0, 0, 0, 9, 7, 0, 0, 8, 0],
    [0, 0, 0, 0, 0, 5, 9, 0, 2]
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
    constructor(value, editable, possibleValues, impossibleValues, gridNum, gridCoordinates) {
        this.Value = value;
        this.Editable = editable;
        this.PossibleValues = possibleValues;
        this.ImPossibleValues = impossibleValues;
        this.GridNum = gridNum;
        this.GridCoordinates = gridCoordinates;
    }
};

let board = [];
let game = new Game(EASY_BOARD, [], [], [], []);

function DisplayUserBoard() {
    let strHTML = ""
    for (let row = 0; row < game.Board.length; row++) {
        strHTML += `<tr>`
        for (let square = 0; square < game.Board[row].length; square++) {
            strHTML += `<td id="R${row}C${square}" class="${(game.Board[row][square].Editable ? 'editable' : 'stone')}"> 
            ${(game.Board[row][square].Value === 0 ? '' : game.Board[row][square].Value)} </td>`
        }
        strHTML += `</tr>`
    }
    document.querySelector("#board").innerHTML = strHTML
};

function SetUpBoard() {
    console.log("bismillah")
    let gridCoordinates = [];
    let gridNum = 0;
    for (let row = 0; row < game.Initial.length; row++) {
        game.Board.push([])
        for (let square = 0; square < game.Initial[row].length; square++) {
            if (square % 3 === 0) {
                gridCoordinates = GetGridCoordinates(row, square)
                gridNum++
            }
            if (game.Initial[row][square] === 0) {
                game.Board[row].push(new Square(game.Initial[row][square], true, [], [], gridNum, gridCoordinates));
            } else {
                game.Board[row].push(new Square(game.Initial[row][square], false, [], [], gridNum, gridCoordinates));
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
                // console.log(efficientCounter);

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

function DeterminePossibleValues() {
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
        tempRow = game.Board[row].slice();
        tempRow = tempRow.filter((num) => num !== 0);
        for (let square = 0; square < game.Board[row].length; square++) {
            if (game.Board[row][square].Value === 0) {
                PossibleValues = [1, 2, 3, 4, 5, 6, 7, 8, 9];
                // check row possibilities >
                countIndex = 0;
                while (countIndex < 9) {
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
                // console.log(efficientCounter);

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
}

function DetermineSingleCandidates() {
    let found = false;
    for (let row = 0; row < game.Board.length; row++) {
        for (let col = 0; col < game.Board[row].length; col++) {
            if (game.Board[row][col].PossibleValues.length === 1) {
                game.Board[row][col].Value = game.Board[row][col].PossibleValues[0];
                RemovePossibleValue(game.Board[row][col].PossibleValues[0], row, col, game.Board[row][col].GridCoordinates);
                DisplayUserBoard();
                DisplayPossibleValues();
                row = 0;
                col = -1;
                found = true
            }
        }
    }
    return found;
}

function DetermineOnlyPossibilityInRow() {
    let found = false;
    let dict = createDictionary();
    let onlyOne = [];
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            game.Board[row][col].PossibleValues.forEach((value) => {
                dict[value]++;
            })
            if (col === 8) {
                for (let key in dict) {
                    if (dict[key] === 1) {
                        onlyOne.push(key);
                        console.log("found only one: " + key + " row: " + row);
                    }
                }
                let c = 0;
                let x = 0;
                while (c < 9) {
                    x = 0;
                    while (x < onlyOne.length) {
                        if (game.Board[row][c].PossibleValues.indexOf(parseInt(onlyOne[x])) >= 0) {
                            game.Board[row][c].Value = parseInt(onlyOne[x]);
                            RemovePossibleValue(parseInt(onlyOne[x]), row, c, game.Board[row][c].GridCoordinates);
                            game.Board[row][c].PossibleValues = [];
                            DisplayUserBoard();
                            DisplayPossibleValues();
                            row = 0;
                            col = 0;
                            x = onlyOne.length;
                            c = 9;
                            found = true;
                        }
                        x++
                    }
                    c++
                }
                dict = createDictionary();
                onlyOne = [];
            }
        }
    }
    return found;
}

function DetermineOnlyPossibilityInColumn() {
    let found = false;
    let dict = createDictionary();
    let onlyOne = [];
    for (let col = 0; col < 9; col++) {
        for (let row = 0; row < 9; row++) {
            game.Board[row][col].PossibleValues.forEach((value) => {
                dict[value]++;
            })
            if (row === 8) {
                for (let key in dict) {
                    if (dict[key] === 1) {
                        onlyOne.push(key);
                        console.log("found only one: " + key + " row: " + row);
                    }
                }
                let r = 0;
                let x = 0;
                while (r < 9) {
                    x = 0;
                    while (x < onlyOne.length) {
                        if (game.Board[r][col].PossibleValues.indexOf(parseInt(onlyOne[x])) >= 0) {
                            game.Board[r][col].Value = parseInt(onlyOne[x]);
                            RemovePossibleValue(parseInt(onlyOne[x]), r, col, game.Board[r][col].GridCoordinates);
                            game.Board[r][col].PossibleValues = [];
                            DisplayUserBoard();
                            DisplayPossibleValues();
                            row = 0;
                            col = 0;
                            x = onlyOne.length;
                            r = 9;
                            found = true;
                        }
                        x++
                    }
                    r++
                }
                dict = createDictionary();
                onlyOne = [];
            }
        }
    }
    return found;
}

function DetermineOnlyPossibility() {

    let tempSection = [];

    for (let row = 0; row < game.Board.length; row++) {
        for (let col = 0; col < game.Board[row].length; col++) {
            tempSection.push(game.Board[row][col].PossibleValues);
            // console.log("test", tempSection);
        }
    }
    // console.log("Initiating DetermineOnlyPossibilityInRow()");
}



function createDictionary() {
    let dict = {};

    for (let i = 1; i <= 9; i++) {
        dict[i] = 0;
    }
    return dict;
}



function DetermineOnlyPossibilityInGrid() {

}

function RemovePossibleValue(value, row, col, gridCoor) {
    // console.log("before", game.Board[row][col].PossibleValues);
    game.Board[row][col].PossibleValues = game.Board[row][col].PossibleValues.filter((num) => num !== value)
    for (let count = 0; count < 9; count++) {
        game.Board[row][count].PossibleValues = game.Board[row][count].PossibleValues.filter((num) => num !== value);
        game.Board[count][col].PossibleValues = game.Board[count][col].PossibleValues.filter((num) => num !== value);
    }
    for (let gridRow = gridCoor[1]; gridRow < gridCoor[1] + 3; gridRow++) {
        for (let gridCol = gridCoor[0]; gridCol < gridCoor[0] + 3; gridCol++) {
            game.Board[gridRow][gridCol].PossibleValues = game.Board[gridRow][gridCol].PossibleValues.filter((num) => num !== value);
        }
    }
    // console.log("after", game.Board[row][col].PossibleValues);

}

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

function Reset() {
    SetUpBoard();
    DisplayUserBoard();
    DetermineInitialPossibleValues();
    DisplayPossibleValues();
};

SetUpBoard();
DisplayUserBoard();

document.querySelector("#btnPossibleValues").addEventListener("click", (e) => {
    DetermineInitialPossibleValuesOld();
    DisplayPossibleValues();
    DisplayUserBoard();
});

document.querySelector("#btnSolvePuzzle").addEventListener("click", (e) => {
    SolvePuzzle()
});

function SolvePuzzle() {
    found = true
    DeterminePossibleValues();
    while(found === true){
        found = DetermineSingleCandidates();
        // DetermineOnlyPossibility();
        found = DetermineOnlyPossibilityInRow();
        found = DetermineOnlyPossibilityInColumn();
        DisplayUserBoard();
    }
    
}

document.querySelector("#btnReset").addEventListener("click", (e) => {
    game = new Game(game.Initial, [], [], [], []);
    Reset();
});

document.querySelector("#btnEasy").addEventListener("click", (e) => {
    game = new Game(EASY_BOARD, [], [], [], []);
    Reset();
});

document.querySelector("#btnMedium").addEventListener("click", (e) => {
    game = new Game(MEDIUM_BOARD, [], [], [], []);
    Reset();
});

document.querySelector("#btnHard").addEventListener("click", (e) => {
    game = new Game(HARD_BOARD, [], [], [], []);
    Reset();
});