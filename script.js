const createPlayer = function (name, mark) {
  return { name, mark };
};
const Game = {
  players: [],
  currentPlayer: 0,
  gameBoard: ["", "", "", "", "", "", "", "", ""],

  winningPositions: [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ],

  start() {
    this.players = [
      createPlayer(document.querySelector("#player--1").value, "X"),
      createPlayer(document.querySelector("#player--2").value, "0"),
    ];
  },

  handleClick(e) {
    // console.log(e.target.dataset.num);
    const cellIndex = e.target.dataset.num;
    if (this.gameBoard[cellIndex] === "") {
      this.gameBoard[cellIndex] = this.players[this.currentPlayer].mark;
      e.target.textContent = this.players[this.currentPlayer].mark;
    }

    this.currentPlayer = this.currentPlayer === 0 ? 1 : 0;
    console.log(Game);
  },

  clicked() {
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {
      cell.addEventListener("click", this.handleClick.bind(this));
    });
  },
};

const startBtn = document.querySelector(".start-btn");
const gridConteiner = document.querySelector(".grid-container");

startBtn.addEventListener("click", function (e) {
  e.preventDefault();
  Game.start();
  Game.clicked();
  console.log(Game);
});
