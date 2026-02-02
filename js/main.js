// ✅ 버튼 onclick을 HTML에서 제거했으니 여기서 연결
document.addEventListener("DOMContentLoaded", () => {
  const mainBtn = document.getElementById("main-btn");
  if (mainBtn) mainBtn.addEventListener("click", startSequence);
});

function startSequence() {
  const dL = document.getElementById("dL");
  const dR = document.getElementById("dR");
  const floorNum = document.getElementById("floor-num");
  const elevatorAll = document.getElementById("elevator-all");
  const introWrap = document.getElementById("intro-wrap");
  const mainPage = document.getElementById("main-page");
  const guideBox = document.getElementById("guide-box");
  const uiPanel = document.getElementById("ui-panel");
  const nokya = document.getElementById("nokya-intro");
  const bubble = document.getElementById("speech-bubble");
  const mainBtn = document.getElementById("main-btn");

  // 안전 가드
  if (
    !dL ||
    !dR ||
    !floorNum ||
    !elevatorAll ||
    !introWrap ||
    !mainPage ||
    !guideBox ||
    !uiPanel ||
    !nokya ||
    !bubble ||
    !mainBtn
  ) {
    return;
  }

  // 초기 설정
  mainBtn.classList.add("active-arrow");
  mainBtn.disabled = true;

  const clickTxt = document.getElementById("click-txt");
  if (clickTxt) clickTxt.style.display = "none";

  // 1) 1층 문 열림
  dL.style.transform = "translateX(-100%)";
  dR.style.transform = "translateX(100%)";

  setTimeout(() => {
    // 2) 문 닫힘
    dL.style.transform = "translateX(0)";
    dR.style.transform = "translateX(0)";

    setTimeout(() => {
      // 3) 층수 올라감 (1F -> 4F)
      let current = 1;
      const up = setInterval(() => {
        current++;
        floorNum.innerText = current + "F";

        if (current === 4) {
          clearInterval(up);

          // 4) 녹야 등장
          setTimeout(() => {
            nokya.style.display = "block";
            bubble.style.display = "block";

            setTimeout(() => {
              // 5) 문 열리며 줌인 전환
              dL.style.transform = "translateX(-100%)";
              dR.style.transform = "translateX(100%)";

              setTimeout(() => {
                guideBox.style.opacity = "0";
                uiPanel.style.opacity = "0";
                elevatorAll.classList.add("zoom-transition");

                setTimeout(() => {
                  introWrap.style.display = "none";
                  mainPage.classList.add("active");
                  initMain(); // ✅ 메인 인터랙션 시작(모바일 탭 토글만)
                }, 1200);
              }, 1000);
            }, 600);
          }, 500);
        }
      }, 800);
    }, 1200);
  }, 1500);
}

function initMain() {
  const group = document.getElementById("nockyaGroup");
  const board = document.getElementById("board");
  const lala = document.querySelector(".lala");
  if (!group || !board || !lala) return;

  // ✅ 모바일에서만 "탭 토글" 필요 (데스크탑은 CSS :hover가 처리)
  const isTouch =
    window.matchMedia && window.matchMedia("(hover: none)").matches;

  if (!isTouch) return;

  let nokyaActive = false;
  let lalaActive = false;

  const nokyaOn = () => {
    group.classList.add("is-active");
    board.classList.add("is-shaking");
  };
  const nokyaOff = () => {
    group.classList.remove("is-active");
    board.classList.remove("is-shaking");
  };

  const lalaOn = () => {
    lala.classList.add("is-active");
  };
  const lalaOff = () => {
    lala.classList.remove("is-active");
  };

  const toggleNokya = (e) => {
    e.preventDefault?.();
    nokyaActive = !nokyaActive;
    nokyaActive ? nokyaOn() : nokyaOff();
  };

  const toggleLala = (e) => {
    e.preventDefault?.();
    lalaActive = !lalaActive;
    lalaActive ? lalaOn() : lalaOff();
  };

  // ✅ 녹야/게시판 탭 토글
  [group, board].forEach((el) => {
    el.addEventListener("click", toggleNokya, { passive: false });
    el.addEventListener("touchstart", toggleNokya, { passive: false });
  });

  // ✅ 라라 탭 토글
  lala.addEventListener("click", toggleLala, { passive: false });
  lala.addEventListener("touchstart", toggleLala, { passive: false });

  // ✅ 바깥 터치하면 해제
  document.addEventListener(
    "touchstart",
    (e) => {
      if (!group.contains(e.target) && !board.contains(e.target)) {
        nokyaActive = false;
        nokyaOff();
      }
      if (!lala.contains(e.target)) {
        lalaActive = false;
        lalaOff();
      }
    },
    { passive: true },
  );
}
