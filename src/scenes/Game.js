//@ts-nocheck
import Phaser from "phaser";
import { createBiemAnimations } from "../lib/biemAnimations";
import { createPlayerAnimations } from "../lib/playerAnimations";
import { createSnowAnimations } from "../lib/snowAnimations";

let gameOptions = {
  platformStartSpeed: 350,
  spawnRange: [300, 1100],
};

export default class Game extends Phaser.Scene {
  constructor() {
    super("game");
  }

  create() {
    //init
    this.score = 0;
    this.scoreText = this.add
      .text(1340, 60, "score: 0", { fontSize: "32px", fill: "#000" })
      .setOrigin(1, 1);
    this.gameSpeed = 20;
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
          this.player.body.collisionFilter = {
            group: 1,
            category: 2,
            mask: 0,
          };

          this.slope.body.collisionFilter = {
            group: 1,
            category: 2,
            mask: 0,
          };
          // this.player.setPosition(400, 400);
          this.handleHealth();
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
          this.player.body.collisionFilter.group = 1;
          this.slope.body.collisionFilter = {
            group: 1,
            category: 2,
            mask: 0,
          };
          this.handleHealth();
          this.invincible();
          // this.player.setPosition(400, 400);
        }
      },
      this
    );
  }

  update(delta) {
    // console.log(this.player.body.collisionFilter);
    if (this.player) {
      this.player.setAngularVelocity(0);
      this.jump();
      this.move();

      this.snow.setPosition(
        this.player.body.position.x - 137,
        this.player.body.position.y + 68
      );

      this.biem.setPosition(
        this.player.body.position.x - 0,
        this.player.body.position.y + 0
      );
    }

    let minDistance = this.game.config.width;
    this.platformGroup.getChildren().forEach(function (platform) {
      platform.x += -6 * (delta / 40000) - 5;
      platform.y -= (6 * (delta / 40000) + 5) / 4.695;
      let platformDistance =
        this.game.config.width - platform.x - platform.displayWidth / 2;
      minDistance = Math.min(minDistance, platformDistance);
      if (platform.x < -200) {
        this.platformGroup.killAndHide(platform);
        this.platformGroup.remove(platform);
      }
    }, this);

    // adding new platforms
    if (minDistance > this.nextPlatformDistance) {
      this.addPlatform(this.game.config.width + 200);
    }

    this.score += 1;
    this.scoreText.setText("score: " + this.score);
  }

  addPlatform(posX) {
    let platform;
    const typeOfPlatform =
      Phaser.Math.Between(0, 1) === 0 ? "lava" : "dumpster";

    if (this.platformPool.getLength()) {
      platform = this.platformPool.getFirst();
      platform.x = posX;
      platform.y = platform.body.label === "lava" ? 1005 : 758;
      platform.active = true;
      platform.visible = true;
      this.platformPool.remove(platform);
    } else {
      platform = this.matter.add
        .image(
          posX,
          typeOfPlatform === "lava" ? 1005 : 758,
          typeOfPlatform,
          null,
          {
            isStatic: true,
            label: typeOfPlatform,
          }
        )
        .setAngle(13)
        .setScale(1, 1);
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
        shape: shapes["SLEE_Basis_ALL_00000"],
      })
      .setScale(1, 1)
      .setDepth(2);

    this.whiteFlash = this.add
      .rectangle(
        this.game.config.width / 2,
        this.game.config.height / 2,
        this.game.config.width,
        this.game.config.height,
        0xffffff
      )
      .setDepth(4);

    this.whiteFlash.visible = false;
    this.whiteFlash.alpha = 0;

    this.player.body.position.y += 2;
    this.snow = this.add.sprite(0, 0, "snow").setScale(1, 1).setDepth("-1");
    this.biem = this.add.sprite(0, 0, "biem").setScale(1, 1);

    createPlayerAnimations(this);
    createSnowAnimations(this);
    createBiemAnimations(this);

    this.player.play(`sled-jump_${this.health}`);
    this.snow.play("snow-jump");

    this.player.on(
      "animationcomplete",
      function (animation, frame) {
        if (animation.key === `sled-jump_${this.health}`) {
          this.player.play(`sled_${this.health}`);
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

    this.biem.on(
      "animationcomplete",
      function (animation, frame) {
        if (animation.key === "biem!") {
          this.biem.visible = false;
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
      this.player.play(`sled-jump_${this.health}`);
      this.snow.play("snow-jump");

      this.playerTouchingGround = false;
      this.player.setVelocityY(-13);
    }
  }

  handleHealth() {
    this.live = this.lives.getFirstAlive();
    this.live.destroy();
    this.health = this.health - 1;

    if (this.health === 0) {
      this.scene.start("gameover");
    }
  }

  invincible() {
    this.biem.visible = true;
    this.biem.play("biem!");

    setTimeout(() => {
      this.player.play(`sled_${this.health}`);
    }, 100);

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
        this.player.body.collisionFilter = {
          group: 0,
          category: 1,
          mask: 255,
        };

        this.slope.body.collisionFilter = {
          group: 0,
          category: 1,
          mask: 255,
        };

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

    this.whiteFlash.visible = true;
    this.add.tween({
      targets: this.whiteFlash,
      ease: "Sine.easeInOut",
      duration: 75,
      delay: 0,
      yoyo: true,
      repeat: 0,
      alpha: {
        getStart: () => 0,
        getEnd: () => 0.6,
      },
    });
  }

  move() {
    // if (this.cursorKeys.left.isDown && this.player) {
    //   this.player.setVelocityX(-4);
    // } else if (this.cursorKeys.right.isDown) {
    //   this.player.setVelocityX(4);
    // } else {
    //   this.player.setVelocityX(-0.07);
    // }
  }
}
