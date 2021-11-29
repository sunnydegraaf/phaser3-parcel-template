import Phaser from "phaser";

import HelloWorldScene from "./scenes/HelloWorldScene";
import Game from "./scenes/Game";
import Preloader from "./scenes/Preloader";

const config = {
  type: Phaser.AUTO,
  width: 1400,
  height: 790,
  physics: {
    default: "matter",
    matter: {
      debug: true,
      setBounds: {
        left: true,
        right: true,
        top: false,
        bottom: true,
      },
      gravity: { y: 0.4 },
    },
  },
  scale: {
    mode: Phaser.Scale.FIT,
    parent: "my-game",
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 1400,
    height: 790,
  },
  scene: [Preloader, Game],
};

export default new Phaser.Game(config);
