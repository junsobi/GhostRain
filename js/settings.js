const BG_WIDTH = 800;
const BG_HEIGHT = 500;

const GHOST_WIDTH = 45;
const GHOST_HEIGHT = 54;

const HERO_WIDTH = 35;
const HERO_HEIGHT = 54;

const heroCond = document.getElementById("hero");
const bgCond = document.getElementById("bg");

const audio = new Audio("audio/dying.wav");

let heartCount = 5; //하트 초기개수
let finalScore = 0;
const heartCond = document.querySelector(".remainingLife"); //하트 Dom

document.addEventListener("DOMContentLoaded", function () {
  // ...
  heroCond.classList.add("ready");
  finalScore = document.getElementById("finalScore");
  const gameClearPage = document.getElementById("gameClearPage");
});

let score = 0;
const gameOverPage = document.getElementById("gameOverPage");

// const restartButton = document.getElementById("restartButton");
// const cRestartButton = document.getElementById("cRestartButton");

function showGameOverPage() {
  // finalScore.textContent = score;
  gameOverPage.style.display = "flex";
}

// restartButton.addEventListener("click", function () {
//   location.reload(); // 페이지 새로고침으로 게임 리셋
// });

// cRestartButton.addEventListener("click", function () {
//   location.reload(); // 페이지 새로고침으로 게임 리셋
// });

function showGameClearPage() {
  finalScore.textContent = score;
  const gameClearPage = document.getElementById("gameClearPage");
  gameClearPage.style.display = "flex";
}
