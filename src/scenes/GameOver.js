import Phaser from "phaser";
import leaderBoard from "../assets/screens/leaderBoard";
<<<<<<< Updated upstream
import retryButton from "../assets/screens/button";
=======
import scoreInput from "../assets/screens/scoreInput";
>>>>>>> Stashed changes

export default class GameOver extends Phaser.Scene {
  constructor() {
    super("gameover");
  }

  init(data) {
    this.score = data.score;
  }

  
  async create() {
    this.menuSound = this.sound.add("menu", { loop: true })
    this.menuSound.play();
    this.name = "";
    this.add.dom(0, 0, await leaderBoard(this.score, this)).setOrigin(0, 0);

    this.elementInput = this.add
      .dom(0, 0, await scoreInput(this, this.score))
      .setOrigin(0, 0);
  }

  update() {
    if (document.getElementById("username")) {
      document.getElementById("username").innerText = this.name;
    }
  }
}
