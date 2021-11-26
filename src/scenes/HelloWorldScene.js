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
    }

    create() {
        this.gameSpeed = 10;
        const { height, width } = this.game.config

        //images
        this.add.image(0, 0, 'background').setOrigin(0, 0).setDepth(-1)

        this.player = this.physics.add.image(400, 400, 'player').setDepth(1)
        this.dumpster = this.physics.add.image(1000, 789, 'dumpster').setDepth(1)
        this.ground = this.add.tileSprite(0, height, width, 30, 'ground').setOrigin(0, 1).setDepth(0)

        this.player.setCollideWorldBounds(true)
        this.dumpster.setCollideWorldBounds(true)

        this.health = 4;
        this.cursorKeys = this.input.keyboard.createCursorKeys()
    }

    update() {
        this.jump();
        this.ground.tilePositionX += this.gameSpeed
    }

    jump() {
        if (this.cursorKeys.space.isDown) {
            if (!this.player.body.onFloor()) {
                return
            } else {
                this.player.setVelocityY(-500)
            }

        }
    }
}
