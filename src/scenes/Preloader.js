import Phaser from "phaser";
import background from "../assets/images/tinified/background.png";
import slope2 from "../assets/images/tinified/slope2.png";
import bgBack from "../assets/images/tinified/BG_BACK_01.png";
import bgFront from "../assets/images/tinified/BG_FRONT_01.png";

import playerImg0 from "../assets/spritesheets/tinified/SLEE_Basis_0.png";
import playerImg1 from "../assets/spritesheets/tinified/SLEE_Basis_1.png";
import playerImg2 from "../assets/spritesheets/tinified/SLEE_Basis_2.png";
import playerImg3 from "../assets/spritesheets/tinified/SLEE_Basis_3.png";
import playerImg4 from "../assets/spritesheets/tinified/SLEE_Basis_4.png";

import boom from "../assets/spritesheets/tinified/BIEM.png";
import dumpsterImg from "../assets/spritesheets/tinified/DUMPSTER.png";
import snowmanImg from "../assets/spritesheets/tinified/SNOWMAN.png";
import popoImg from "../assets/spritesheets/tinified/POPO.png";
import lavaImg from "../assets/spritesheets/tinified/LAVA.png";
import kadosImg from "../assets/spritesheets/tinified/KADOS.png";
import snowImg from "../assets/spritesheets/tinified/SNEEUW-basis.png";

import playerShapes from "../assets/spritesheets/SLEE-shapes.json";
import dumpsterShapes from "../assets/spritesheets/DUMPSTER-shapes.json";
import snowmanShapes from "../assets/spritesheets/SNOWMAN-shapes.json";
import popoShapes from "../assets/spritesheets/POPO-shapes.json";
import lavaShapes from "../assets/spritesheets/LAVA-shapes.json";
import kadosShapes from "../assets/spritesheets/KADOS-shapes.json";

import beginScreen from "../assets/images/tinified/beginscreen.png";

import livesTotal from "../assets/images/LIVES/tinified/LIVES_TOTAL.png";
import lives01 from "../assets/images/LIVES/tinified/LIVES_01.png";
import lives02 from "../assets/images/LIVES/tinified/LIVES_02.png";
import lives03 from "../assets/images/LIVES/tinified/LIVES_03.png";
import lives04 from "../assets/images/LIVES/tinified/LIVES_04.png";

import score from "../assets/images/SCORE/SCORE.png";

import crash from "../assets/audio/Crash.mp3";
import jump from "../assets/audio/Jump.mp3";
import game from "../assets/audio/Game.mp3";
import menu from "../assets/audio/Menu.mp3";
// import start from "../assets/audio/Start.mp3";

import startVideo from "../assets/video/LANDING_BG.mp4";
import startVideoMobile from "../assets/video/LANDING_MOBILE.mp4";
import gameOverVideo from "../assets/video/HIGHSCORE_BG.mp4";
import preLoader from "../assets/screens/preLoader";

export default class Preloader extends Phaser.Scene {
  constructor() {
    super("preloader");
  }

  async preload() {
    this.done = false;
    //player
    this.load.spritesheet("player0", playerImg0, {
      frameWidth: 300,
      frameHeight: 340,
    });

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

    this.load.spritesheet("kados", kadosImg, {
      frameWidth: 300,
      frameHeight: 250,
    });

    this.load.spritesheet("lava", lavaImg, {
      frameWidth: 308,
      frameHeight: 385,
    });

    this.load.json("shapes", playerShapes);
    this.load.json("dumpster_shapes", dumpsterShapes);
    this.load.json("snowman_shapes", snowmanShapes);
    this.load.json("popo_shapes", popoShapes);
    this.load.json("kados_shapes", kadosShapes);
    this.load.json("lava_shapes", lavaShapes);

    this.load.image("background", background);
    this.load.image("slope2", slope2);
    this.load.image("beginscreen", beginScreen);
    this.load.image("bgBack", bgBack);
    this.load.image("bgFront", bgFront);

    this.load.video("startVideo", startVideo, "loadeddata", false, true);
    this.load.video("startVideoMobile", startVideoMobile, "loadeddata", false, true);
    this.load.video("gameOverVideo", gameOverVideo, "loadeddata", false, true);

    this.load.image("livesTotal", livesTotal);
    this.load.image("lives01", lives01);
    this.load.image("lives02", lives02);
    this.load.image("lives03", lives03);
    this.load.image("lives04", lives04);
    this.load.image("score", score);

    this.load.audio("crash", crash);
    this.load.audio("jump", jump);
    this.load.audio("game", game);
    this.load.audio("menu", menu);
    // this.load.audio("start", start);

    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    // loading bar
    var bg = this.add.graphics();

    bg.fillStyle(0x5b59ff);
    bg.fillRect(0, 0, width, height);

    var element = this.add
      .dom(0, 0, await preLoader(this))
      .setOrigin(0, 0)
      .setDepth(-1);

    this.load.on("progress", function (value) { });

    this.load.on(
      "complete",
      () => {
        this.done = true;
        element.getChildByID("text").innerText = "press any button";
      },
      this
    );

    this.input.keyboard.on(
      "keydown",
      function (event) {
        if (this.done) {
          this.scene.start("startscene");
        }
      },
      this
    );

    element.addListener("click");
    element.on("click", () => {
      if (this.done) {
        this.scene.start("startscene");
      }
    });

    this.input.on(
      "pointerdown",
      function (event) {
        if (this.done) {
          this.scene.start("startscene");
        }
      },
      this
    );
  }

  create() { }
}
