import * as game from "./game.js";

var config = {
  type: Phaser.AUTO,
  width: 1000,
  height: 800,
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

let start_game = new Phaser.Game(config);

function preload() {
  this.load.image("background", "./assets/background.jpg");
  this.load.image("target", "./assets/target.png");
  this.load.image("start", "./assets/start.png");
}

function create() {
  const background = this.add.image(500, 400, "background");

  const menu = this.add.image(500, 200, "start").setScale(0.5);

  // 시작 버튼 생성
  const startButton = this.add
    .text(config.width / 2, 600, "게임 시작", {
      fontSize: "64px",
      fill: "#ffffff",
      backgroundColor: "#000a", // 투명한 검은색 배경
      padding: { x: 40, y: 20 },
      align: "center",
      fontWeight: "bold",
      fontFamily: "Arial, sans-serif",
    })
    .setOrigin(0.5)
    .setInteractive();

  // 버튼 클릭 이벤트 리스너 추가
  startButton.on("pointerdown", () =>
    game.gameStart(this, config, startButton, menu)
  );

  //마우스 오버 시 스타일 변경 효과
  startButton.on("pointerover", () => {
    startButton.setBackgroundColor("rgba(0, 0, 0, 0.87)"); // 마우스 오버 시 녹색 계열로 변경
  });

  startButton.on("pointerout", () => {
    startButton.setBackgroundColor("#000a"); // 마우스 아웃 시 원래 색상으로 복구
  });
}

function update() {}
