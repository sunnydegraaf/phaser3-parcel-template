import Phaser from "phaser";

export default class GameOver extends Phaser.Scene {
  constructor() {
    super("gameover");
  }

  init(data) {
    this.score = data.score;
  }

  create() {
    this.centerX = this.cameras.main.width / 2;
    this.centerY = this.cameras.main.height / 2;
    this.add.image(0, 0, "beginscreen").setOrigin(0, 0).setDepth(-1);
  }

  update() {}
}
