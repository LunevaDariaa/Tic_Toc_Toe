"use strict";
const cells = document.querySelectorAll(".cell");
const startBtn = document.querySelector(".start-btn");
const gridConteiner = document.querySelector(".grid-container");
const restartBtn = document.querySelector(".restart-btn");
const createPlayer = function (name, mark) {
  return { name, mark };
};

const Game = {
  players: [],
  currentPlayer: 0,
  gameOver: false,
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

  defineWinner() {
    for (const position of this.winningPositions) {
      const [a, b, c] = position;

      if (
        this.gameBoard[a] === "X" &&
        this.gameBoard[b] === "X" &&
        this.gameBoard[c] === "X"
      ) {
        this.gameOver = true;
        alert(`Winner is ${this.players[0].name}`);
      }
      if (
        this.gameBoard[a] === "0" &&
        this.gameBoard[b] === "0" &&
        this.gameBoard[c] === "0"
      ) {
        this.gameOver = true;
        console.log(`Winner is ${this.players[1].name}`);
      }
    }
  },

  restart() {
    this.gameBoard = ["", "", "", "", "", "", "", "", ""];
    cells.forEach(function (cell) {
      cell.textContent = "";
    });
    this.gameOver = false;
  },

  start() {
    this.players = [
      createPlayer(document.querySelector("#player--1").value, "X"),
      createPlayer(document.querySelector("#player--2").value, "0"),
    ];
  },

  handleClick(e) {
    if (this.gameOver) {
      return;
    }
    const cellIndex = e.target.dataset.num;
    if (this.gameBoard[cellIndex] === "") {
      this.gameBoard[cellIndex] = this.players[this.currentPlayer].mark;
      e.target.textContent = this.players[this.currentPlayer].mark;
    }

    this.currentPlayer = this.currentPlayer === 0 ? 1 : 0;
    this.defineWinner();
  },

  clicked() {
    cells.forEach((cell) => {
      // cell.removeEventListener("click", this.handleClick.bind(this));
      cell.addEventListener("click", this.handleClick.bind(this));
    });
  },
};

startBtn.addEventListener("click", function (e) {
  e.preventDefault();
  Game.start();
  Game.clicked();
});

restartBtn.addEventListener("click", function () {
  Game.restart();
  Game.clicked();
});
