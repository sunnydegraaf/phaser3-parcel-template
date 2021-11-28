import Phaser from 'phaser'
import images from '../assets/images/*.png';

export default class HelloWorldScene extends Phaser.Scene {
    constructor() {
        super('hello-world')
    }

    preload() {
        this.load.image('background', images.background)
        this.load.image('player', images.player)
        this.load.image('dumpster', images.dumpster)
        this.load.image('lava', images.lava)
        this.load.image('ground', images.ground)
        this.load.image('heart', images.heart)
    }

    create() {
        //init
        this.gameSpeed = 10;
        const { height, width } = this.game.config
        this.health = 4;
        this.lives = this.add.group();
        this.cursorKeys = this.input.keyboard.createCursorKeys()

        //images
        this.add.image(0, 0, 'background').setOrigin(0, 0).setDepth(-1);
        this.ground = this.add.tileSprite(0, height, width, 30, 'ground').setOrigin(0, 1).setDepth(0)

        //renders
        this.renderHealth();
        this.renderPlayer();
        this.renderDumpster();

        //physics
        this.physics.add.collider(this.player, this.dumpster, this.onCollision, null, this);
    }

    update() {
        if (this.player) {
            this.jump();
            this.move();
        }

        this.ground.tilePositionX += this.gameSpeed
    }

    renderHealth() {
        for (this.i = 1; this.i <= this.health; this.i++) {
            this.lives.create(60 * this.i, 60, 'heart')
        }
    }

    renderPlayer() {
        this.player = this.physics.add.image(400, 400, 'player').setDepth(1)
        this.player.setCollideWorldBounds(true)
    }

    renderDumpster() {
        this.dumpster = this.physics.add.image(1000, 789, 'dumpster').setImmovable().setDepth(1)
        this.dumpster.setCollideWorldBounds(true)
    }

    onCollision() {
        this.live = this.lives.getFirstAlive();
        this.live.destroy();
        this.player.setPosition(400, 400);
    }

    jump() {
        if (this.cursorKeys.space.isDown && this.player) {
            if (!this.player.body.onFloor()) {
                return
            } else {
                this.player.setVelocityY(-600)
            }

        }
    }

    move() {
        if (this.cursorKeys.left.isDown && this.player) {
            this.player.body.setVelocityX(-200)
        } else if (this.cursorKeys.right.isDown) {
            this.player.setVelocityX(200)
        } else {
            this.player.setVelocityX(0)
        }
    }
}
