import Phaser from "phaser";
import leaderBoard from "../assets/screens/leaderBoard";

export default class GameOver extends Phaser.Scene {
  constructor() {
    super("gameover");
  }

  init(data) {
    this.score = data.score;
  }

  create() {
    this.add.dom(0, 0, leaderBoard).setOrigin(0, 0)
  }

  update() {

  }
}
