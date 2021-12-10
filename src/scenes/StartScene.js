import Phaser from "phaser";

export default class StartScene extends Phaser.Scene {
  constructor() {
    super("startscene");
  }

  create() {
    this.centerX = this.cameras.main.width / 2;
    this.centerY = this.cameras.main.height / 2;
    this.add.image(0, 0, "beginscreen").setOrigin(0, 0).setDepth(-1);

    let button = this.add
      .text(this.centerX, this.centerY + 275, "Start game")
      .setFontSize(24)
      .setOrigin(0.5)
      .setPadding(20)
      .setStyle({ backgroundColor: "#111" })
      .setInteractive({ useHandCursor: true });

    button.on("pointerup", () => {
      this.scene.start("game");
    });
  }
}
