import Game from "./tic-tac-toe.js";
let game = new Game();

const board = document.getElementById("board");
const cellElements = document.querySelectorAll("[data-cell]");
const winningMessageTextElement = document.querySelector("[data-winning-text]");
const winningMessageElement = document.getElementById("winning-message");
const restartBtn = document.getElementById("restart-button");
const resetBtn = document.getElementById("reset-button");
let userScoreElement = document.getElementById("user-score");
let botScoreElement = document.getElementById("bot-score");

loadScore();
updateScore();
game.startGame();

restartBtn.onclick = function () {
  game.startGame();
  winningMessageElement.classList.remove("show");
  updateGame();
};
resetBtn.onclick = function () {
  game = new Game();
  updateGame();
};
function updateGame() {
  updateBoard();
  updateScore();
}
function updateBoard() {
  for (let i = 0; i < game.board.length; i++) {
    if (game.board[i] == null) {
      cellElements[i].classList.remove("circle");
      cellElements[i].classList.remove("x");
    } else {
      cellElements[i].classList.add(game.board[i]);
    }
  }
}
function updateScore() {
  userScoreElement.innerText = game.userScore;
  botScoreElement.innerText = game.botScore;
  saveScore();
}
function saveScore() {
  localStorage.setItem("user-score", game.userScore);
  localStorage.setItem("bot-score", game.botScore);
}
function loadScore() {
  if (localStorage.getItem("user-score") != null)
    game.userScore = parseInt(localStorage.getItem("user-score"));
  if (localStorage.getItem("bot-score") != null)
    game.botScore = parseInt(localStorage.getItem("bot-score"));
}

board.onclick = function (event) {
  const cell = event.target;
  if (cell.classList.contains("circle") || cell.classList.contains("x")) return;
  let index = cell.dataset.cell;
  game.placeMark(index);
  updateBoard();
  if (game.winner()) {
    winningMessageTextElement.innerText = `You ${
      game.botTurn ? "lost!" : "won!"
    }`;
    winningMessageElement.classList.add("show");
  } else if (game.inProgress()) {
    game.swapTurns();
    game.bot();
    updateBoard();
    if (game.winner()) {
      winningMessageTextElement.innerText = `You ${
        game.botTurn ? "lost!" : "won!"
      }`;
      winningMessageElement.classList.add("show");
    } else {
      game.swapTurns();
    }
  } else {
    updateBoard();
    winningMessageTextElement.innerText = "it's a draw";
    winningMessageElement.classList.add("show");
  }
};
