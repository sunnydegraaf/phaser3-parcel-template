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
    this.playerIsInvincible = false;
    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.frameTime = 0;
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
      "collisionstart",
      function (event, bodyA, bodyB) {
        //collider player - slope
        if (
          (bodyA.label == "player" &&
            bodyB.label == "slope" &&
            this.playerTouchingGround == false) ||
          (bodyB.label == "player" &&
            bodyA.label == "slope" &&
            this.playerTouchingGround == false)
        ) {
          this.playerTouchingGround = true;
          this.snow.play("snow-landing");
        }

        // collider player - dumpster
        if (
          (bodyA.label == "player" &&
            bodyB.label == "dumpster" &&
            this.playerIsInvincible == false) ||
          (bodyB.label == "player" &&
            bodyA.label == "dumpster" &&
            this.playerIsInvincible == false)
        ) {
          this.live = this.lives.getFirstAlive();
          this.live.destroy();
          this.player.setPosition(400, 400);
          this.invincible();
        }

        if (
          (bodyA.label == "player" &&
            bodyB.label == "lava" &&
            this.playerIsInvincible == false) ||
          (bodyB.label == "player" &&
            bodyA.label == "lava" &&
            this.playerIsInvincible == false)
        ) {
          this.live = this.lives.getFirstAlive();
          this.live.destroy();
          this.invincible();
          this.player.setPosition(400, 400);
        }
      },
      this
    );
  }

  update(delta) {
    if (this.player) {
      this.player.setAngularVelocity(0);
      this.jump();
      this.move();

      this.snow.setPosition(
        this.player.body.position.x - 95,
        this.player.body.position.y + 48
      );
    }

    let minDistance = this.game.config.width;
    this.platformGroup.getChildren().forEach(function (platform) {
      platform.x += -3 * (delta / 15000);
      platform.y -= (3 * (delta / 15000)) / 4.695;
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
    const shapes = this.cache.json.get("shapes");

    this.player = this.matter.add
      .sprite(400, -200, "player", null, {
        shape: shapes["SLEE_Basis_00000"],
      })
      .setScale(0.7, 0.7);

    this.player.body.position.y += 2;

    this.snow = this.add.sprite(0, 0, "snow").setScale(0.7, 0.7);

    this.anims.create({
      key: "sled",
      frameRate: 30,
      repeat: -1,
      frames: this.anims.generateFrameNumbers("player", {
        start: 0,
        end: 29,
      }),
    });

    this.anims.create({
      key: "sled-jump",
      frameRate: 30,
      frames: this.anims.generateFrameNumbers("player", {
        start: 30,
        end: 81,
      }),
    });

    this.anims.create({
      key: "snow-idle",
      frameRate: 30,
      repeat: -1,
      frames: this.anims.generateFrameNumbers("snow", {
        start: 0,
        end: 53,
      }),
    });

    this.anims.create({
      key: "snow-landing",
      frameRate: 30,
      frames: this.anims.generateFrameNumbers("snow", {
        start: 54,
        end: 73,
      }),
    });

    this.anims.create({
      key: "snow-jump",
      frameRate: 60,
      frames: this.anims.generateFrameNumbers("snow", {
        start: 74,
        end: 106,
      }),
    });

    this.player.play("sled-jump");
    this.snow.play("snow-jump");

    this.player.on(
      "animationcomplete",
      function (animation, frame) {
        if (animation.key === "sled-jump") {
          this.player.play("sled");
        }
      },
      this
    );

    this.snow.on(
      "animationcomplete",
      function (animation, frame) {
        if (animation.key === "snow-landing") {
          this.snow.play("snow-idle");
        }
      },
      this
    );
  }

  jump() {
    if (
      this.cursorKeys.space.isDown &&
      this.player &&
      this.playerTouchingGround
    ) {
      this.player.play("sled-jump");
      this.snow.play("snow-jump");

      this.playerTouchingGround = false;
      this.player.setVelocityY(-13);
    }
  }

  invincible() {
    this.playerIsInvincible = true;
    this.add.tween({
      targets: this.player,
      ease: "Sine.easeInOut",
      duration: 300,
      delay: 0,
      yoyo: true,
      repeat: 3,
      alpha: {
        getStart: () => 1,
        getEnd: () => 0.3,
      },
      onComplete: () => {
        this.playerIsInvincible = false;
      },
    });

    this.add.tween({
      targets: this.snow,
      ease: "Sine.easeInOut",
      duration: 300,
      delay: 0,
      yoyo: true,
      repeat: 3,
      alpha: {
        getStart: () => 1,
        getEnd: () => 0.3,
      },
    });
  }

  move() {
    if (this.cursorKeys.left.isDown && this.player) {
      this.player.setVelocityX(-4);
    } else if (this.cursorKeys.right.isDown) {
      this.player.setVelocityX(4);
    } else {
      this.player.setVelocityX(-0.07);
    }
  }
}
