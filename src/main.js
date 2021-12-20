import Phaser from "phaser";

import Game from "./scenes/Game";
import GameOver from "./scenes/GameOver";
import StartScene from "./scenes/StartScene";
import Preloader from "./scenes/Preloader";

const config = {
  fps: {
    target: 60,
    min: 30,
    forceSetTimeOut: true,
  },
  parent: "phaser",
  type: Phaser.AUTO,
  width: 1400,
  height: 790,
  physics: {
    default: "matter",
    matter: {
      debug: false,
      setBounds: {
        left: true,
        right: true,
        top: false,
        bottom: true,
      },
      gravity: { y: 1.3 },
    },
  },
  scale: {
    mode: Phaser.Scale.FIT,
    parent: "my-game",
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  dom: {
    createContainer: true,
  },
  scene: [Preloader, StartScene, Game, GameOver],
};

export default new Phaser.Game(config);
