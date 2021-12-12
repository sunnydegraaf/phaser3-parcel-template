//@ts-nocheck
import Phaser from "phaser";
import { addPlatform } from "../lib/addPlatform";
import { createBiemAnimations } from "../lib/biemAnimations";
import { collision } from "../lib/collision";
import { createObstacleAnimations } from "../lib/obstacleAnimations";
import { createPlayerAnimations } from "../lib/playerAnimations";
import { createSnowAnimations } from "../lib/snowAnimations";

export default class Game extends Phaser.Scene {
  constructor() {
    super("game");
  }

  create() {
    this.cameras.main.backgroundColor.setTo(103, 105, 251)
    //init
    this.score = 0;
    this.scoreText = this.add
      .text(1340, 60, "score: 0", { fontSize: "32px", fill: "#000" })
      .setOrigin(1, 1);
    this.gameSpeed = 20;
    this.jumps = 0;
    const { height, width } = this.game.config;
    this.playerTouchingGround = false;
    this.health = 4;
    this.lives = this.add.group();
    this.playerIsInvincible = false;
    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.frameTime = 0;
    this.slope = this.matter.add
      .image(width * 0.4, height + 50, "slope2", null, {
        isStatic: true,
        label: "slope",
      })
      .setAngle(12);

    this.backgroundBack = this.add.image(-800, -400, "bgBack").setDepth(-2).setOrigin(0, 0)
    this.backgroundBack.alpha = 0.75
    this.backgroundFront = this.add.image(700, 270, "bgFront").setDepth(-1).setOrigin(0, 0)

    //renders
    this.renderHealth();
    this.renderPlayer();

    this.input.keyboard.on("keydown-SPACE", this.jump, this);
    this.input.on("pointerdown", () => this.jump(true), this);

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

    addPlatform(this, this.game.config.width + 200);

    this.matter.world.on(
      "collisionstart",
      function (event, bodyA, bodyB) {
        collision(this, bodyA, bodyB);
      },
      this
    );
  }

  update(delta) {

    this.backgroundBack.x += -6 * (delta / 150000) - 6;
    this.backgroundBack.y -= (6 * (delta / 150000) + 6) / 4.695;

    this.backgroundFront.x += -6 * (delta / 40000) - 6;
    this.backgroundFront.y -= (6 * (delta / 40000) + 6) / 4.695;

    if (this.backgroundBack.x < -2934) {
      this.backgroundBack.x = 1400
      this.backgroundBack.y = 0
    }

    if (this.backgroundFront.x < -5156) {
      this.backgroundFront.x = 1400
      this.backgroundFront.y = 410
    }

    if (this.player) {
      this.player.setAngularVelocity(0);
      this.player.setVelocityX(-0.07);

      this.snow.setPosition(
        this.player.body.position.x - 137,
        this.player.body.position.y + 68
      );

      this.biem.setPosition(
        this.player.body.position.x - 0,
        this.player.body.position.y + 0
      );
    }

    let minDistance = this.game.config.width + 600;
    this.platformGroup.getChildren().forEach(function (platform) {
      platform.x += -6 * (delta / 40000) - 6;
      platform.y -= (6 * (delta / 40000) + 6) / 4.695;
      let platformDistance =
        this.game.config.width - platform.x - platform.displayWidth / 2;
      minDistance = Math.min(minDistance, platformDistance);
      if (platform.x < -900) {
        this.platformGroup.killAndHide(platform);
        this.platformGroup.remove(platform);
      }
    }, this);

    // adding new platforms
    if (minDistance > this.nextPlatformDistance) {
      addPlatform(this, this.game.config.width + 200);
    }

    this.score += 1;
    this.scoreText.setText("score: " + this.score);
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
        isSensor: true,
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
    createObstacleAnimations(this);

    this.player.play(`sled-jump_${this.health}`);
    this.snow.play("snow-jump");

    this.player.on(
      "animationcomplete",
      function (animation, frame) {
        if (
          animation.key === `sled-jump_${this.health}` ||
          animation.key === `sled-jump_Double_${this.health}`
        ) {
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

  jump(pointer) {
    if ((this.cursorKeys.space.isDown && this.player && !pointer) || pointer) {
      if (this.jumps < 2) {
        this.jumps === 0 && this.player.play(`sled-jump_${this.health}`);
        this.jumps === 0 && this.snow.play("snow-jump");

        this.playerTouchingGround = false;
        this.player.setVelocityY(this.jumps === 1 ? -10 : -12);
        this.jumps++;
      }
    }
  }

  handleHealth() {
    this.live = this.lives.getFirstAlive();
    this.live.destroy();
    this.health = this.health - 1;

    console.log(this.health);

    if (this.health === 0) {
      this.scene.start("gameover", { score: this.score });
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
