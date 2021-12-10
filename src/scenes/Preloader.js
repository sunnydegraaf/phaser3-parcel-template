import Phaser from "phaser";
import background from "../assets/images/background.png";
import dumpster from "../assets/images/dumpster.png";
import lava from "../assets/images/lava.png";
import slope2 from "../assets/images/slope2.png";
import heart from "../assets/images/heart.png";

import playerImg1 from "../assets/spritesheets/SLEE_Basis_1.png";
import playerImg2 from "../assets/spritesheets/SLEE_Basis_2.png";
import playerImg3 from "../assets/spritesheets/SLEE_Basis_3.png";
import playerImg4 from "../assets/spritesheets/SLEE_Basis_4.png";

import boom from "../assets/spritesheets/BIEM.png";

import snowImg from "../assets/spritesheets/SNEEUW-basis.png";
import playerShapes from "../assets/spritesheets/SLEE-shapes.json";

import beginScreen from "../assets/images/beginscreen.png";

export default class Preloader extends Phaser.Scene {
  constructor() {
    super("preloader");
  }

  preload() {
    //player
    this.load.spritesheet("player", playerImg1, {
      frameWidth: 300,
      frameHeight: 340,
    });

    this.load.spritesheet("player2", playerImg2, {
      frameWidth: 300,
      frameHeight: 340,
    });

    this.load.spritesheet("player3", playerImg3, {
      frameWidth: 300,
      frameHeight: 340,
    });

    this.load.spritesheet("player4", playerImg4, {
      frameWidth: 300,
      frameHeight: 340,
    });

    this.load.spritesheet("biem", boom, {
      frameWidth: 300,
      frameHeight: 300,
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
    this.scene.start("startscene");
  }
}
