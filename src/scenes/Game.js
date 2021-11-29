//@ts-nocheck
import Phaser from "phaser";

let gameOptions = {
  platformStartSpeed: 350,
  spawnRange: [400, 900],
};

export default class Game extends Phaser.Scene {
  constructor() {
    super("game");
  }

  create() {
    //init
    this.gameSpeed = 10;
    const { height, width } = this.game.config;
    this.playerTouchingGround = false;
    this.health = 4;
    this.lives = this.add.group();
    this.cursorKeys = this.input.keyboard.createCursorKeys();

    this.add.image(0, 0, "background").setOrigin(0, 0).setDepth(-1);
    this.slope = this.matter.add
      .image(width * 0.4, height + 50, "slope2", null, {
        isStatic: true,
        label: "slope",
      })
      .setAngle(12);

    //renders
    this.renderHealth();
    this.renderPlayer();

    this.platformGroup = this.add.group({
      // once a platform is removed, it's added to the pool
      removeCallback: function (platform) {
        platform.scene.platformPool.add(platform);
      },
    });

    // pool
    this.platformPool = this.add.group({
      // once a platform is removed from the pool, it's added to the active platforms group
      removeCallback: function (platform) {
        platform.scene.platformGroup.add(platform);
      },
    });

    this.addPlatform(this.game.config.width + 200);

    this.matter.world.on(
      "collisionactive",
      function (event, bodyA, bodyB) {
        //collider player - slope
        if (
          (bodyA.label == "player" && bodyB.label == "slope") ||
          (bodyB.label == "player" && bodyA.label == "slope")
        ) {
          this.playerTouchingGround = true;
        }

        // collider player - dumpster
        if (
          (bodyA.label == "player" && bodyB.label == "dumpster") ||
          (bodyB.label == "player" && bodyA.label == "dumpster")
        ) {
          this.live = this.lives.getFirstAlive();
          this.live.destroy();
          this.player.setPosition(400, 400);
        }
      },
      this
    );
  }

  update() {
    if (this.player) {
      this.jump();
      this.move();
    }

    let minDistance = this.game.config.width;
    this.platformGroup.getChildren().forEach(function (platform) {
      platform.x += -2;
      platform.y -= 2 / 4.695;
      let platformDistance =
        this.game.config.width - platform.x - platform.displayWidth / 2;
      minDistance = Math.min(minDistance, platformDistance);
      if (platform.x < 0) {
        this.platformGroup.killAndHide(platform);
        this.platformGroup.remove(platform);
      }
    }, this);

    // adding new platforms
    if (minDistance > this.nextPlatformDistance) {
      this.addPlatform(this.game.config.width + 200);
    }
  }

  addPlatform(posX) {
    let platform;
    const typeOfPlatform =
      Phaser.Math.Between(0, 1) === 0 ? "lava" : "dumpster";
    console.log(typeOfPlatform);

    if (this.platformPool.getLength()) {
      platform = this.platformPool.getFirst();
      platform.x = posX;
      platform.y = platform.body.label === "lava" ? 961 : 785;
      platform.active = true;
      platform.visible = true;
      this.platformPool.remove(platform);
    } else {
      platform = this.matter.add
        .image(
          posX,
          typeOfPlatform === "lava" ? 961 : 785,
          typeOfPlatform,
          null,
          {
            isStatic: true,
            label: typeOfPlatform,
          }
        )
        .setAngle(13)
        .setScale(0.7, 0.7);
      this.platformGroup.add(platform);
    }

    this.nextPlatformDistance = Phaser.Math.Between(
      gameOptions.spawnRange[0],
      gameOptions.spawnRange[1]
    );
  }

  renderHealth() {
    for (this.i = 1; this.i <= this.health; this.i++) {
      this.lives.create(60 * this.i, 60, "heart");
    }
  }

  renderPlayer() {
    this.player = this.matter.add
      .image(400, 0, "player", null, {
        label: "player",
      })
      .setScale(0.7, 0.7);
  }

  jump() {
    if (
      this.cursorKeys.space.isDown &&
      this.player &&
      this.playerTouchingGround
    ) {
      this.playerTouchingGround = false;
      this.player.setVelocityY(-11);
    }
  }

  move() {
    if (this.cursorKeys.left.isDown && this.player) {
      this.player.setVelocityX(-2.3);
    } else if (this.cursorKeys.right.isDown) {
      this.player.setVelocityX(2.3);
    } else {
      this.player.setVelocityX(-0.03);
    }
  }
}
