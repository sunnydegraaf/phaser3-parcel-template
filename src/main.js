import Phaser from "phaser";

import Game from "./scenes/Game";
import GameOver from "./scenes/GameOver";
import StartScene from "./scenes/StartScene";
import Preloader from "./scenes/Preloader";

const config = {
  fps: {
    target: 60,
    forceSetTimeOut: true,
  },
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
      gravity: { y: 1 },
    },
  },
  scale: {
    mode: Phaser.Scale.FIT,
    parent: "my-game",
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 1400,
    height: 790,
  },
  scene: [Preloader, Game, GameOver, StartScene],
};

export default new Phaser.Game(config);
