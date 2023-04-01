let ghostCount = 0;
let moveGhostInterval;
let createGhostTimeout;
let MAX_GHOST = 30;
let timeLeft = 30;
let gameStarted = false;
let timerInterval; // 타이머 초기화 변수 추가

function collides(hero, ghost) {
  const heroRect = hero.getBoundingClientRect();
  const ghostRect = ghost.getBoundingClientRect();

  // hero와 ghost의 경계상자가 서로 겹치는지 확인
  return (
    heroRect.right > ghostRect.left &&
    heroRect.left < ghostRect.right &&
    heroRect.bottom > ghostRect.top &&
    heroRect.top < ghostRect.bottom
  );
}

function createGhost() {
  if (ghostCount >= MAX_GHOST) {
    return;
  }

  const ghostCond = document.createElement("div");
  ghostCond.classList.add("ghost");
  ghostCond.style.position = "absolute";
  ghostCond.style.top = "0";
  ghostCond.style.left =
    Math.floor(Math.random() * (bgCond.offsetWidth - GHOST_WIDTH)) + "px";
  ghostCond.style.width = GHOST_WIDTH + "px";
  ghostCond.style.height = GHOST_HEIGHT + "px";
  ghostCond.style.background = 'url("./images/ghost.png") no-repeat';
  bgCond.appendChild(ghostCond);

  ghostCount++;

  const min = 500;
  const max = 2000;
  const delay = Math.floor(Math.random() * (max - min) + min);
  createGhostTimeout = setTimeout(createGhost, delay);
}

function moveGhost() {
  const ghostList = document.querySelectorAll("#bg > div.ghost");
  ghostList.forEach(function (ghostCond) {
    const ghostTop = parseInt(ghostCond.style.top);
    const isOnGround = ghostTop >= bgCond.offsetHeight - GHOST_HEIGHT;

    if (isOnGround) {
      ghostCond.remove(); // 유령 제거
      ghostCount--;
      bgCond.classList.add("hit");
      setTimeout(() => {
        bgCond.classList.remove("hit");
      }, 300);
      setTimeout(() => {
        bgCond.classList.add("hit");
      }, 400);
      setTimeout(() => {
        bgCond.classList.remove("hit");
      }, 700);
      heartCount--;
      const heartList = heartCond.querySelectorAll("li");
      if (heartList[heartCount]) {
        heartList[heartCount].innerHTML = '<i class="fa-regular fa-heart"></i>';
      }

      // 게임 오버 처리
      if (heartCount === 0) {
        clearInterval(moveGhostInterval);
        clearTimeout(createGhostTimeout);
        showGameOverPage();
        return;
      }

      return;
    }

    if (collides(heroCond, ghostCond)) {
      if (!ghostCond.classList.contains("disabled")) {
        // 귀신 사체를 충돌할 수 없도록 처리
        ghostCond.classList.add("disabled");

        ghostCond.style.backgroundPosition = "-45px 0px";
        audio.play();
        setTimeout(() => {
          ghostCond.remove();
          ghostCount--;
          if (heartCount > 0) {
            score++; // 충돌 후 즉시 스코어 증가
            document.getElementById("scoreNumber").textContent = `${score}`;
          }

          if (heartCount === 0) {
            clearInterval(moveGhostInterval);
            clearTimeout(createGhostTimeout);
          }
        }, 500);

        // 일정 시간 동안 해당 귀신 사체가 충돌할 수 없도록 처리 후 제거
        setTimeout(() => {
          ghostCond.classList.remove("disabled");
        }, 2000);
      }
    } else {
      ghostCond.style.top = ghostTop + 5 + "px";
    }
  });
}

function updateTime() {
  const remainTime = document.querySelector(".remainTime");

  function decreaseTime() {
    remainTime.textContent = `00:${timeLeft.toString().padStart(2, "0")}`;
    timeLeft--;

    if (timeLeft >= 0) {
      setTimeout(decreaseTime, 1000);
    } else if (heartCount > 0) {
      clearInterval(moveGhostInterval);
      clearTimeout(createGhostTimeout);
      showGameClearPage();
    } else {
      clearInterval(moveGhostInterval);
      clearTimeout(createGhostTimeout);
    }
  }

  decreaseTime();
}

function startGame() {
  const firstPage = document.getElementById("firstPage");
  if (
    !gameStarted && // 게임이 시작되지 않은 경우에만 실행
    (firstPage.style.opacity === "" || parseFloat(firstPage.style.opacity) > 0)
  ) {
    gameStarted = true;
    firstPage.classList.add("fade-out");
    updateTime();
    if (!moveGhostInterval) {
      moveGhostInterval = setInterval(moveGhost, 100);
      createGhostTimeout = setTimeout(createGhost, 1300);
      heroCond.classList.remove("ready");
    }
  }
}

document.addEventListener("keydown", function (event) {
  startGame();
});

document.addEventListener("touchstart", function (event) {
  event.preventDefault();
  startGame();
});

function resetGame() {
  // 게임 초기화 코드 작성
  heartCount = 5;
  score = 0;
  timeLeft = 30;
  ghostCount = 0;
  gameStarted = false;
  clearInterval(timerInterval);
  clearInterval(moveGhostInterval);
  clearTimeout(createGhostTimeout);
  const ghostList = document.querySelectorAll("#bg > div.ghost");
  ghostList.forEach(function (ghost) {
    ghost.remove();
  });
  const heartList = heartCond.querySelectorAll("li");
  heartList.forEach(function (heart) {
    heart.innerHTML = '<i class="fa-solid fa-heart"></i>';
  });
  document.getElementById("scoreNumber").textContent = "0";
  const remainTime = document.querySelector(".remainTime");
  remainTime.textContent = "00:30";
  gameOverPage.style.display = "none";
  gameClearPage.style.display = "none";
  heroCond.style.left = "50%";
  heroCond.style.bottom = HERO_HEIGHT + "px";

  // timerInterval 변수 초기화
  timerInterval = null;

  gameStarted = true;
  createGhost(); // 새로운 귀신 내려보내기
  moveGhost();
  moveGhostInterval = setInterval(moveGhost, 100);
}
const restartButton = document.getElementById("restartButton");
restartButton.addEventListener("click", resetGame);
restartButton.addEventListener("touchstart", resetGame);

const cRestartButton = document.getElementById("cRestartButton");
cRestartButton.addEventListener("click", resetGame);
cRestartButton.addEventListener("touchstart", resetGame);
