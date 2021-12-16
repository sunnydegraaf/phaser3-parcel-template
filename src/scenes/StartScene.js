import Phaser from "phaser";

export default class StartScene extends Phaser.Scene {
  constructor() {
    super("startscene");
  }

  create() {
    function toggleFullScreen() {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
    }

    this.startSound = this.sound.add("start", { volume: 0.3 });

    this.centerX = this.cameras.main.width / 2;
    this.centerY = this.cameras.main.height / 2;
    this.add.image(0, 0, "beginscreen").setOrigin(0, 0).setDepth(-1);

    this.input.keyboard.on(
      "keydown-SPACE",
      function () {
        toggleFullScreen();
        this.startSound.play();
        this.scene.start("game");
      },
      this
    );

    this.input.on(
      "pointerdown",
      function (pointer) {
        toggleFullScreen();
        this.startSound.play();
        this.scene.start("game");
      },
      this
    );
  }
}
