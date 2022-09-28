export default class Game {
  constructor() {
    this.turn = "x";
    this.botTurn = false;
    this.board = new Array(9).fill(null);
    this.userScore = 0;
    this.botScore = 0;
  }
  swapTurns() {
    this.botTurn = !this.botTurn;
    this.turn = this.botTurn ? "circle" : "x";
  }
  placeMark(cell) {
    if (!this.inProgress()) return;
    if (this.board[cell]) return;
    this.board[cell] = this.turn;
  }
  /**
   * Går igenom alla vinnande kombinationer för att se om någon har vunnit.
   * Ökar score med +1 för den som vunnit.
   * @returns true om någon har vunnit annars false.
   */
  winner() {
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let combo of winningCombos) {
      const [a, b, c] = combo;
      if (
        this.board[a] &&
        this.board[a] == this.board[b] &&
        this.board[a] == this.board[c]
      ) {
        if (this.turn == "x") {
          this.userScore += 1;
        } else {
          this.botScore += 1;
        }
        return true;
      }
    }
    return false;
  }
  inProgress() {
    return this.board.includes(null);
  }
  bot() {
    const getRandomNumber = (maxNum) => {
      return Math.floor(Math.random() * maxNum);
    };
    let botPicking = true;
    while (botPicking) {
      let botNr = getRandomNumber(8);
      if (this.board[botNr] == null) {
        botPicking = false;
        this.placeMark(botNr);
      }
    }
  }
  startGame() {
    this.board = new Array(9).fill(null);
    this.turn = "x";
    this.botTurn = false;
  }
}
