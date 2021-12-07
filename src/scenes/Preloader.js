import Phaser from "phaser";
import background from "../assets/images/background.png";
import dumpster from "../assets/images/dumpster.png";
import lava from "../assets/images/lava.png";
import slope2 from "../assets/images/slope2.png";
import heart from "../assets/images/heart.png";

import playerImg from "../assets/spritesheets/SLEE-basis.png";
import snowImg from "../assets/spritesheets/SNEEUW-basis.png";
import playerShapes from "../assets/spritesheets/SLEE-shapes.json";

import beginScreen from "../assets/images/beginscreen.png";

export default class Preloader extends Phaser.Scene {
  constructor() {
    super("preloader");
  }

  preload() {
    //player
    this.load.spritesheet("player", playerImg, {
      frameWidth: 300,
      frameHeight: 340,
    });
    this.load.spritesheet("snow", snowImg, {
      frameWidth: 166,
      frameHeight: 80,
    });
    this.load.json("shapes", playerShapes);

    this.load.image("background", background);
    this.load.image("dumpster", dumpster);
    this.load.image("lava", lava);
    this.load.image("heart", heart);
    this.load.image("slope2", slope2);
    this.load.image("slope2", slope2);
    this.load.image("beginscreen", beginScreen);
  }

  create() {
    this.scene.start("game");
  }
}
