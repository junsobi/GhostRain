let touchStartX;
let touchStartY;

document.addEventListener("keydown", function (event) {
  moveHero(event.key);
});

document.addEventListener("keyup", function () {
  heroCond.className = "stop";
});

document.addEventListener(
  "touchstart",
  function (event) {
    event.preventDefault();
    touchStartX = event.touches[0].clientX;
    touchStartY = event.touches[0].clientY;
    heroCond.className = "stop";
  },
  { passive: false }
);

document.addEventListener(
  "touchmove",
  function (event) {
    if (!event.cancelable) {
      return;
    }

    const touchEndX = event.changedTouches[0].clientX;
    const touchEndY = event.changedTouches[0].clientY;

    const touchDistanceX = touchEndX - touchStartX;
    const touchDistanceY = touchEndY - touchStartY;

    if (Math.abs(touchDistanceX) > Math.abs(touchDistanceY)) {
      if (touchDistanceX > 0) {
        moveHero("ArrowRight");
      } else {
        moveHero("ArrowLeft");
      }
    } else {
      if (touchDistanceY < 0) {
        moveHero("ArrowUp");
      } else {
        moveHero("ArrowDown");
      }
    }
  },
  { passive: false }
);

function moveHero(key) {
  const currentLeft = getComputedStyle(heroCond).left;
  const currentBottom = getComputedStyle(heroCond).bottom;

  const numLeft = Number(currentLeft.split("px")[0]);
  const numBottom = Number(currentBottom.split("px")[0]);
  const bgWidth = bgCond.clientWidth;
  const heroWidth = heroCond.clientWidth;
  const bgHeight = bgCond.clientHeight;
  const heroHeight = heroCond.clientHeight;

  if (key === "ArrowLeft") {
    heroCond.className = "left";
    if (numLeft > 10) {
      heroCond.style.left = numLeft - 55 + "px";
    }
  } else if (key === "ArrowRight") {
    heroCond.className = "right";
    if (numLeft < bgWidth - heroWidth - 25) {
      heroCond.style.left = numLeft + 55 + "px";
    }
  } else if (key === "ArrowUp") {
    if (numBottom < bgHeight - heroHeight - 30) {
      heroCond.className = "back";
      heroCond.style.bottom = numBottom + 55 + "px";
    }
  } else if (key === "ArrowDown") {
    heroCond.className = "stop";
    if (numBottom > 0) {
      heroCond.style.bottom = numBottom - 55 + "px";
    }
  }
}
