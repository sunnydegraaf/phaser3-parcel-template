import Phaser from "phaser";
import leaderBoard from "../assets/screens/leaderBoard";
import retryButton from "../assets/screens/button";
import scoreInput from "../assets/screens/scoreInput";

export default class GameOver extends Phaser.Scene {
  constructor() {
    super("gameover");
  }

  init(data) {
    this.score = data.score;
  }

  async create() {
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
