import Phaser from "phaser";
import leaderBoard from "../assets/screens/leaderBoard";
import retryButton from "../assets/screens/button";

export default class GameOver extends Phaser.Scene {
  constructor() {
    super("gameover");
  }

  init(data) {
    this.score = data.score;
  }

  create() {
    this.menuSound = this.sound.add("menu", { loop: true })
    this.menuSound.play();
    this.add.dom(0, 0, leaderBoard).setOrigin(0, 0)
  }

  update() {

  }
}
