function startSequence() {
  const dL = document.getElementById("dL");
  const dR = document.getElementById("dR");
  const floorNum = document.getElementById("floor-num");
  const elevatorAll = document.getElementById("elevator-all");
  const introWrap = document.getElementById("intro-wrap");
  const mainPage = document.getElementById("main-page");
  const uiPanel = document.getElementById("ui-panel");
  const clickTxt = document.getElementById("click-txt");
  const mainBtn = document.getElementById("main-btn");
  const guideBox = document.getElementById("guide-box");
  const nokya = document.getElementById("nokya");
  const bubble = document.getElementById("speech-bubble");

  // 1. 클릭 피드백: 화살표 빨간색 변경
  clickTxt.style.display = "none";
  mainBtn.classList.add("active-arrow");
  mainBtn.disabled = true;
  mainBtn.style.cursor = "default";

  // 2. 초기 문 열림 (아무도 없음)
  dL.style.transform = "translateX(-100%)";
  dR.style.transform = "translateX(100%)";

  // 3. 문 닫히고 층수 상승
  setTimeout(() => {
    dL.style.transform = "translateX(0)";
    dR.style.transform = "translateX(0)";

    setTimeout(() => {
      let currentFloor = 1;
      const interval = setInterval(() => {
        currentFloor++;
        floorNum.innerText = currentFloor + "F";

        if (currentFloor === 4) {
          clearInterval(interval);

          // 4. 4층 도착: 녹야 깜짝 등장 후 문 열림
          setTimeout(() => {
            nokya.style.display = "block"; // 녹야 뿅!
            bubble.style.display = "block"; // 인사말 뿅!

            setTimeout(() => {
              dL.style.transform = "translateX(-100%)";
              dR.style.transform = "translateX(100%)";

              // 5. 메인으로 줌인 진입
              setTimeout(() => {
                uiPanel.style.opacity = "0";
                guideBox.style.opacity = "0";
                elevatorAll.classList.add("zoom-transition");

                setTimeout(() => {
                  introWrap.style.display = "none";
                  guideBox.style.display = "none";
                  mainPage.classList.add("active");
                  document.body.style.backgroundColor = "#ffffff";
                }, 1200);
              }, 1200);
            }, 500); // 녹야 나오고 0.5초 뒤 문열림
          }, 500);
        }
      }, 800);
    }, 1300);
  }, 1500);
}
