import Phaser from "phaser";
import background from "../assets/images/background.png";
import lava from "../assets/images/lava.png";
import slope2 from "../assets/images/slope2.png";
import heart from "../assets/images/heart.png";
import bgBack from "../assets/images/BG_BACK_01.png";
import bgFront from "../assets/images/BG_FRONT_01.png";
// import scoreboard from "../assets/images/SCOREBOARD.png";

import playerImg1 from "../assets/spritesheets/SLEE_Basis_1.png";
import playerImg2 from "../assets/spritesheets/SLEE_Basis_2.png";
import playerImg3 from "../assets/spritesheets/SLEE_Basis_3.png";
import playerImg4 from "../assets/spritesheets/SLEE_Basis_4.png";

import boom from "../assets/spritesheets/BIEM.png";

import dumpsterImg from "../assets/spritesheets/DUMPSTER.png";

import snowmanImg from "../assets/spritesheets/SNOWMAN.png";

import popoImg from "../assets/spritesheets/POPO.png";

import snowImg from "../assets/spritesheets/SNEEUW-basis.png";

import playerShapes from "../assets/spritesheets/SLEE-shapes.json";
import dumpsterShapes from "../assets/spritesheets/DUMPSTER-shapes.json";
import snowmanShapes from "../assets/spritesheets/SNOWMAN-shapes.json";
import popoShapes from "../assets/spritesheets/POPO-shapes.json";

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

    this.load.spritesheet("dumpster", dumpsterImg, {
      frameWidth: 250,
      frameHeight: 250,
    });

    this.load.spritesheet("snowman", snowmanImg, {
      frameWidth: 350,
      frameHeight: 350,
    });

    this.load.spritesheet("popo", popoImg, {
      frameWidth: 350,
      frameHeight: 350,
    });

    this.load.json("shapes", playerShapes);
    this.load.json("dumpster_shapes", dumpsterShapes);
    this.load.json("snowman_shapes", snowmanShapes);
    this.load.json("popo_shapes", popoShapes);

    this.load.image("background", background);
    // this.load.image("scoreboard", scoreboard);
    this.load.image("lava", lava);
    this.load.image("heart", heart);
    this.load.image("slope2", slope2);
    this.load.image("slope2", slope2);
    this.load.image("beginscreen", beginScreen);
    this.load.image("bgBack", bgBack)
    this.load.image("bgFront", bgFront)
  }

  create() {
    this.scene.start("game");
  }
}
