/**
 * [1] 페이지 로드 시 상태 확인
 * 새로고침 시 localStorage에 저장된 값을 확인하여
 * 이미 메인 페이지에 진입했었다면 인트로를 건너뜁니다.
 */
window.onload = function () {
  const pageState = localStorage.getItem("currentPage");

  if (pageState === "main") {
    // 인트로 섹션 숨기기
    const introWrap = document.getElementById("intro-wrap");
    if (introWrap) introWrap.style.display = "none";

    // 메인 페이지 활성화
    const mainPage = document.getElementById("main-page");
    if (mainPage) {
      mainPage.classList.add("active");
      mainPage.style.display = "block";
    }

    // 메인 상호작용(호버 등) 초기화
    initMain();
  }
};

/**
 * [2] 인트로 엘리베이터 시퀀스 실행
 */
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

  // 초기 상태 설정: 버튼 비활성화 및 화살표 강조
  mainBtn.classList.add("active-arrow");
  mainBtn.disabled = true;
  const clickTxt = document.getElementById("click-txt");
  if (clickTxt) clickTxt.style.display = "none";

  // Step 1: 1층 문 열림 (아무도 없음)
  dL.style.transform = "translateX(-100%)";
  dR.style.transform = "translateX(100%)";

  setTimeout(() => {
    // Step 2: 문 닫힘
    dL.style.transform = "translateX(0)";
    dR.style.transform = "translateX(0)";

    setTimeout(() => {
      // Step 3: 층수 상승 애니메이션 (1F -> 4F)
      let currentFloor = 1;
      const upInterval = setInterval(() => {
        currentFloor++;
        floorNum.innerText = currentFloor + "F";

        if (currentFloor === 4) {
          clearInterval(upInterval);

          // Step 4: 4층 도착 - 녹야와 말풍선 등장
          setTimeout(() => {
            if (nokya) nokya.style.display = "block";
            if (bubble) bubble.style.display = "block";

            setTimeout(() => {
              // Step 5: 문 열리고 메인 페이지로 줌인 전환
              dL.style.transform = "translateX(-100%)";
              dR.style.transform = "translateX(100%)";

              setTimeout(() => {
                // UI 요소 숨기기 및 줌 효과
                if (guideBox) guideBox.style.opacity = "0";
                if (uiPanel) uiPanel.style.opacity = "0";
                elevatorAll.classList.add("zoom-transition");

                setTimeout(() => {
                  // 메인 페이지 전환 완료
                  introWrap.style.display = "none";
                  mainPage.classList.add("active");
                  mainPage.style.display = "block";

                  // ★ 핵심: 새로고침을 위해 상태 저장
                  localStorage.setItem("currentPage", "main");

                  initMain();
                }, 1200);
              }, 1000);
            }, 600);
          }, 500);
        }
      }, 800);
    }, 1200);
  }, 1500);
}

/**
 * [3] 메인 페이지 상호작용 초기화 (호버 효과 등)
 */
function initMain() {
  const group = document.getElementById("nockyaGroup");
  const char = document.getElementById("nockyaMain");
  const board = document.getElementById("board");

  if (!group || !char || !board) return;

  // 마우스 올렸을 때 효과
  const onHover = () => {
    group.classList.add("is-active");
    board.classList.add("is-shaking");
    char.style.backgroundImage = "url('img/녹야_호버.png')";
  };

  // 마우스 뗐을 때 효과
  const offHover = () => {
    group.classList.remove("is-active");
    board.classList.remove("is-shaking");
    char.style.backgroundImage = "url('img/녹야.png')";
  };

  // 이벤트 리스너 등록
  [group, board].forEach((el) => {
    el.addEventListener("mouseenter", onHover);
    el.addEventListener("mouseleave", offHover);
  });
}

/**
 * [추가] 다시 인트로를 보고 싶을 때 호출하는 리셋 함수
 * 콘솔창에 resetToIntro()를 입력하거나 버튼을 만들어 연결하세요.
 */
function resetToIntro() {
  localStorage.removeItem("currentPage");
  location.reload();
}
