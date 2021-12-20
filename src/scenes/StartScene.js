import Phaser from "phaser";
import videoFile from "../assets/video/LANDING_BG.mp4";
import videoFileMobile from "../assets/video/LANDING_MOBILE.mp4"

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

    this.startSound = this.sound.add("menu", { loop: true, volume: 0.3 });

    this.startSound.play();

    this.centerX = this.cameras.main.width / 2;
    this.centerY = this.cameras.main.height / 2;

    var videoMobile = document.createElement("video");
    var video = document.createElement("video");

    video.src = videoFile;
    video.width = this.cameras.main.width;
    video.height = this.cameras.main.height;
    video.autoplay = true;
    video.playsInline = true;
    video.loop = true;
    video.className = "startVideo";

    videoMobile.src = videoFileMobile;
    videoMobile.width = this.cameras.main.width;
    videoMobile.height = this.cameras.main.height;
    videoMobile.autoplay = true;
    videoMobile.playsInline = true;
    videoMobile.loop = true;
    videoMobile.className = "startVideoMobile";

    var element = this.add.dom(this.centerX, this.centerY, video);
    var elementMobile = this.add.dom(this.centerX, this.centerY, videoMobile);


    this.input.keyboard.on(
      "keydown-SPACE",
      function () {
        // toggleFullScreen();
        this.startSound.stop();
        this.scene.start("game");
      },
      this
    );

    element.addListener("click");
    element.on("click", () => {
      // toggleFullScreen();
      this.startSound.stop();
      this.scene.start("game");
    });

    elementMobile.addListener("click");
    elementMobile.on("click", () => {
      // toggleFullScreen();
      this.startSound.stop();
      this.scene.start("game");
    });
    this.input.on(
      "pointerdown",
      function (pointer) {
        toggleFullScreen();
        this.startSound.stop();
        this.scene.start("game");
      },
      this
    );
  }
}
