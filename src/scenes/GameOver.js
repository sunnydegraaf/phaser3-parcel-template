import Phaser from "phaser";
import leaderBoard from "../assets/screens/leaderBoard";
import videoFile from "../assets/video/HIGHSCORE_BG.mp4";

import scoreInput from "../assets/screens/scoreInput";

export default class GameOver extends Phaser.Scene {
  constructor() {
    super("gameover");
  }

  init(data) {
    this.score = data.score;
  }

  async create() {
    this.centerX = this.cameras.main.width / 2;
    this.centerY = this.cameras.main.height / 2;

    var video = document.createElement("video");

    video.playsInline = true;
    video.src = videoFile;
    video.width = this.cameras.main.width;
    video.height = this.cameras.main.height;
    video.autoplay = true;
    video.loop = true;
    video.className = "startVideo";

    var element = this.add.dom(this.centerX, this.centerY, video);

    this.menuSound = this.sound.add("menu", { loop: true, volume: 0.3 });
    this.menuSound.play();
    this.name = "";
    this.uid = "";
    this.elementInput = this.add
      .dom(0, 0, await scoreInput(this, this.score))
      .setOrigin(0, 0);
  }

  update() {
    if (document.getElementById("username")) {
      document.getElementById("username").innerText = this.name;
    }
  }

  async addEnd() {
    this.add.dom(0, 0, await leaderBoard(this.score, this)).setOrigin(0, 0);
  }
}
