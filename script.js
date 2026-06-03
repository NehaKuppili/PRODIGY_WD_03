const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");

const newGameBtn = document.getElementById("new-game");
const resetScoreBtn = document.getElementById("reset-score");

const xScoreDisplay = document.getElementById("x-score");
const oScoreDisplay = document.getElementById("o-score");
const drawScoreDisplay = document.getElementById("draw-score");

let currentPlayer = "X";

let board = ["", "", "", "", "", "", "", "", ""];

let gameActive = true;

let xScore = 0;
let oScore = 0;
let drawScore = 0;

const winningCombinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],

    [0,3,6],
    [1,4,7],
    [2,5,8],

    [0,4,8],
    [2,4,6]
];

cells.forEach(cell => {
    cell.addEventListener("click", handleCellClick);
});

newGameBtn.addEventListener("click", resetBoard);

resetScoreBtn.addEventListener("click", resetScores);

function handleCellClick() {

    const index = this.dataset.index;

    if(board[index] !== "" || !gameActive) {
        return;
    }

    board[index] = currentPlayer;

    this.textContent = currentPlayer;

    this.classList.add(currentPlayer.toLowerCase());

    checkWinner();

    if(gameActive) {

        currentPlayer =
            currentPlayer === "X" ? "O" : "X";

        statusText.textContent =
            `Player ${currentPlayer}'s Turn`;
    }
}

function checkWinner() {

    let winnerFound = false;

    winningCombinations.forEach(combination => {

        const [a,b,c] = combination;

        if(
            board[a] &&
            board[a] === board[b] &&
            board[a] === board[c]
        ) {

            winnerFound = true;

            cells[a].classList.add("win");
            cells[b].classList.add("win");
            cells[c].classList.add("win");
        }
    });

    if(winnerFound) {

        statusText.textContent =
            `Player ${currentPlayer} Wins!`;

        gameActive = false;

        if(currentPlayer === "X") {
            xScore++;
            xScoreDisplay.textContent = xScore;
        }
        else {
            oScore++;
            oScoreDisplay.textContent = oScore;
        }

        return;
    }

    if(!board.includes("")) {

        statusText.textContent =
            "It's a Draw!";

        drawScore++;

        drawScoreDisplay.textContent =
            drawScore;

        gameActive = false;
    }
}

function resetBoard() {

    board = ["", "", "", "", "", "", "", "", ""];

    gameActive = true;

    currentPlayer = "X";

    statusText.textContent =
        "Player X's Turn";

    cells.forEach(cell => {

        cell.textContent = "";

        cell.classList.remove(
            "x",
            "o",
            "win"
        );
    });
}

function resetScores() {

    xScore = 0;
    oScore = 0;
    drawScore = 0;

    xScoreDisplay.textContent = 0;
    oScoreDisplay.textContent = 0;
    drawScoreDisplay.textContent = 0;

    resetBoard();
}