document.addEventListener("keydown", function (event) {
  moveHero(event.key);
});
document.addEventListener("touchmove", function(event) {
  event.preventDefault();
});
document.addEventListener("touchstart", function (event) {
  const touchX = event.changedTouches[0].clientX;
  const touchY = event.changedTouches[0].clientY;
  const heroX = heroCond.getBoundingClientRect().left;
  const heroY = heroCond.getBoundingClientRect().top;

  if (touchX > heroX) {
    moveHero("ArrowRight");
  } else if (touchX < heroX) {
    moveHero("ArrowLeft");
  } else if (touchY < heroY) {
    moveHero("ArrowUp");
  } else if (touchY > heroY) {
    moveHero("ArrowDown");
  }
});

document.addEventListener("keyup", function () {
  heroCond.className = "stop";
});

function moveHero(key) {
  const currentLeft = getComputedStyle(heroCond).left;
  const currentBottom = getComputedStyle(heroCond).bottom;

  const numLeft = Number(currentLeft.split("px")[0]); //px를 뺀 나머지 숫자 레프트
  const numBottom = Number(currentBottom.split("px")[0]); //px를 뺀 나머지 숫자 바텀
  const bgWidth = bgCond.clientWidth;
  const heroWidth = heroCond.clientWidth;
  const bgHeight = bgCond.clientHeight;
  const heroHeight = heroCond.clientHeight;

  //  hero. stop right back이 있다
  //키코드 39:우측 37좌측 38위쪽 40 아래쪽
  if (key === "ArrowLeft") {
    heroCond.className = "left";
    if (numLeft > 10) {
      heroCond.style.left = numLeft - 55 + "px";
    }
  } //왼쪽키가 눌렸을때 해야할일 : 현재 위치 -1px
  else if (key === "ArrowRight") {
    heroCond.className = "right";
    if (numLeft < bgWidth - heroWidth - 25) {
      heroCond.style.left = numLeft + 55 + "px";
    }
  } //우측키가 눌렸을때 해야할일
  else if (key === "ArrowUp") {
    if (numBottom < bgHeight - heroHeight - 30) {
      heroCond.className = "back";
      heroCond.style.bottom = numBottom + 55 + "px";
    }
  } //위쪽키가 눌렸을때 해야할일
  else if (key === "ArrowDown") {
    heroCond.className = "stop";
    if (numBottom > 0) {
      heroCond.style.bottom = numBottom - 55 + "px";
    }
    //아래키가 눌렸을때 해야할일
  }
}
