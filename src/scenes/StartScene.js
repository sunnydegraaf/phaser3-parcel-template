import Phaser from "phaser";
import videoFile from "../assets/video/LANDING_BG.mp4";
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

    this.startSound = this.sound.add("menu", { volume: 0.3 });

    this.centerX = this.cameras.main.width / 2;
    this.centerY = this.cameras.main.height / 2;

    // const vid = this.add.video(this.centerX, this.centerY, "startVideo");
    // vid.play(true);
    // vid.setPaused(false);

    var video = document.createElement("video");

    video.playsinline = true;
    video.setAttribute('playsinline', 'playsinline');
    video.src = videoFile;
    video.width = this.cameras.main.width;
    video.height = this.cameras.main.height;
    video.autoplay = true;
    video.loop = true;
    video.className = "startVideo";

    var element = this.add.dom(this.centerX, this.centerY, video);

    this.input.keyboard.on(
      "keydown-SPACE",
      function () {
        // toggleFullScreen();
        this.startSound.play();
        this.scene.start("game");
      },
      this
    );

    element.addListener("click");
    element.on("click", () => {
      // toggleFullScreen();
      this.startSound.play();
      this.scene.start("game");
    });

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
