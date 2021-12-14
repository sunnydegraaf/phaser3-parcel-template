import Phaser from "phaser";
import background from "../assets/images/tinified/background.png";
import lava from "../assets/images/tinified/lava.png";
import slope2 from "../assets/images/tinified/slope2.png";
import heart from "../assets/images/tinified/heart.png";
import bgBack from "../assets/images/tinified/BG_BACK_01.png";
import bgFront from "../assets/images/tinified/BG_FRONT_01.png";
// import scoreboard from "../assets/images/tinified/SCOREBOARD.png";

import playerImg1 from "../assets/spritesheets/tinified/SLEE_Basis_1.png";
import playerImg2 from "../assets/spritesheets/tinified/SLEE_Basis_2.png";
import playerImg3 from "../assets/spritesheets/tinified/SLEE_Basis_3.png";
import playerImg4 from "../assets/spritesheets/tinified/SLEE_Basis_4.png";

import boom from "../assets/spritesheets/tinified/BIEM.png";
import dumpsterImg from "../assets/spritesheets/tinified/DUMPSTER.png";
import snowmanImg from "../assets/spritesheets/tinified/SNOWMAN.png";
import popoImg from "../assets/spritesheets/tinified/POPO.png";
import snowImg from "../assets/spritesheets/tinified/SNEEUW-basis.png";

import playerShapes from "../assets/spritesheets/SLEE-shapes.json";
import dumpsterShapes from "../assets/spritesheets/DUMPSTER-shapes.json";
import snowmanShapes from "../assets/spritesheets/SNOWMAN-shapes.json";
import popoShapes from "../assets/spritesheets/POPO-shapes.json";

import beginScreen from "../assets/images/tinified/beginscreen.png";

import livesTotal from "../assets/images/LIVES/LIVES_TOTAL.png";
import lives01 from "../assets/images/LIVES/LIVES_01.png";
import lives02 from "../assets/images/LIVES/LIVES_02.png";
import lives03 from "../assets/images/LIVES/LIVES_03.png";
import lives04 from "../assets/images/LIVES/LIVES_04.png";

import score from "../assets/images/SCORE/SCORE.png";

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
    this.load.image("bgBack", bgBack);
    this.load.image("bgFront", bgFront);

    this.load.image("livesTotal", livesTotal);
    this.load.image("lives01", lives01);
    this.load.image("lives02", lives02);
    this.load.image("lives03", lives03);
    this.load.image("lives04", lives04);

    this.load.image("score", score);
  }

  create() {
    this.scene.start("startscene");
  }
}
