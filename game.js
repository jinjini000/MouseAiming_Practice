import * as target from "./target.js";
import * as timer from "./timer.js";

export let score = 0;
export let isGameOver = false;
let scoreText;

export function gameStart(scene, config, startButton, menu, background) {
  score = 0;
  menu.destroy();
  startButton.destroy();
  // 게임 시작 시 상태 초기화 및 타이머 생성
  setGameOver(false);
  timer.createTimer(scene, config);

  const penaltyArea = scene.add
    .rectangle(0, 0, config.width, config.height, 0x000000, 0.0)
    .setOrigin(0, 0)
    .setInteractive();
  penaltyArea.on("pointerdown", () => {
    if (!isGameOver) {
      scoreMinus(50, scene);
    }
  });

  // 타겟
  target.createTarget(scene, config);

  // Score Text
  scoreText = scene.add
    .text(16, 16, "Score: 0", {
      fontSize: "32px",
      fill: "#ff0000",
      fontWeight: "bold",
      fontFamily: "Arial, sans-serif",
      backgroundColor: "#ffffff",
      padding: {
        x: 10,
        y: 5,
      },
    })
    .setScrollFactor(0);
}

export function scorePlus(point) {
  score += point;
  updateScoreText();
}

export function scoreMinus(point, scene) {
  score -= point;
  updateScoreText();
  scene.cameras.main.shake(300, 0.1);
}

function updateScoreText() {
  if (scoreText) {
    scoreText.setText("Score: " + score);
  }
}

export function setGameOver(state) {
  isGameOver = state;
}
