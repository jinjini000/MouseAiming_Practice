import * as game from "./game.js";

let timerText;
const GAME_TIME_SECONDS = 60;
let timeLeft = GAME_TIME_SECONDS;
let timerEvent;
let gameScene; // 씬 객체를 저장하여 endGame에서 사용

// 시간을 MM:SS 형식으로 포맷
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
}

export function createTimer(scene, config) {
  gameScene = scene;
  timeLeft = GAME_TIME_SECONDS;

  // 타이머 텍스트 생성 (화면 오른쪽에 고정)
  timerText = scene.add
    .text(config.width - 16, 16, "Time: " + formatTime(timeLeft), {
      fontSize: "32px",
      fill: "#0000ff",
      fontWeight: "bold",
      fontFamily: "Arial, sans-serif",
      backgroundColor: "#ffffff",
      padding: { x: 10, y: 5 },
    })
    .setOrigin(1, 0)
    .setScrollFactor(0);

  // 1초마다 타이머를 업데이트하는 이벤트
  timerEvent = scene.time.addEvent({
    delay: 1000,
    callback: updateTime,
    callbackScope: scene, // 콜백 스코프를 Scene으로 설정
    loop: true,
  });
}

// 1초마다 호출되어 시간을 업데이트
function updateTime() {
  timeLeft--;
  timerText.setText("Time: " + formatTime(timeLeft));

  if (timeLeft <= 0) {
    timerEvent.remove(false); // 타이머 중지
    endGame(gameScene); // 게임 종료 함수 호출
  }
}

// 게임 종료 시 호출되는 함수
function endGame(scene) {
  // 이미 게임 오버 상태인 경우 중복 호출 방지
  if (game.isGameOver) return;

  game.setGameOver(true);

  // 최종 UI 업데이트
  if (timerText) {
    timerText.setText("Time: 0:00");
  }

  // 게임 오버 메시지 표시
  scene.add
    .text(
      scene.sys.game.config.width / 2,
      scene.sys.game.config.height / 2 - 80,
      "Time Up! Final Score: " + game.score,
      {
        fontSize: "64px",
        fill: "#f00",
        fontWeight: "bold",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#0008",
        padding: { x: 20, y: 10 },
      }
    )
    .setOrigin(0.5)
    .setScrollFactor(0);

  // 다시 시작 버튼 생성
  const restartButton = scene.add
    .text(
      scene.sys.game.config.width / 2,
      scene.sys.game.config.height / 2 + 50,
      "다시 시작",
      {
        fontSize: "48px",
        fill: "#ffffff",
        backgroundColor: "#0008", // 파란색 배경
        padding: { x: 30, y: 15 },
        align: "center",
        fontWeight: "bold",
        fontFamily: "Arial, sans-serif",
      }
    )
    .setOrigin(0.5)
    .setScrollFactor(0)
    .setInteractive() // 상호작용 가능하게 설정
    .on("pointerdown", () => {
      // 클릭 이벤트 추가
      // 현재 Scene을 재시작합니다.
      scene.scene.restart();
    })
    .on("pointerover", () => {
      // 마우스 오버 시 스타일 변경
      restartButton.setBackgroundColor("rgba(0, 0, 0, 0.74)");
    })
    .on("pointerout", () => {
      // 마우스 아웃 시 스타일 원상 복구
      restartButton.setBackgroundColor("#0008");
    });
}
