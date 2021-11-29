import Phaser from "phaser";
import background from "../assets/images/background.png";
import player from "../assets/images/player.png";
import dumpster from "../assets/images/dumpster.png";
import lava from "../assets/images/lava.png";
import slope from "../assets/images/slope.png";
import slope2 from "../assets/images/slope2.png";
import heart from "../assets/images/heart.png";

export default class Preloader extends Phaser.Scene {
  constructor() {
    super("preloader");
  }

  preload() {
    this.load.image("background", background);
    this.load.image("player", player);
    this.load.image("dumpster", dumpster);
    this.load.image("lava", lava);
    this.load.image("slope", slope);
    this.load.image("heart", heart);
    this.load.image("slope2", slope2);
  }

  create() {
    this.scene.start("game");
  }
}
