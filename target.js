// target.js
import { scorePlus, isGameOver } from "./game.js";

export function createTarget(scene, config) {
  if (isGameOver) {
    return;
  }

  const x = Phaser.Math.Between(200, config.width);
  const y = Phaser.Math.Between(200, config.height);
  const random = Math.random();
  const scale = random * 20 * 0.01 + 0.05;
  const point = 100 - Math.floor(random * 100);

  // 타겟생성
  const target = scene.add
    .image(x, y, "target")
    .setScale(scale)
    .setInteractive({ pixelPerfect: true });

  target.on("pointerdown", () => {
    if (!isGameOver) {
      console.log(point);
      scorePlus(point);
      target.destroy();
      scene.cameras.main.shake(100, 0.01);
      createTarget(scene, config);
    }
  });
}
