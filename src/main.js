import Phaser from 'phaser'

import HelloWorldScene from './scenes/HelloWorldScene'

const config = {
	type: Phaser.AUTO,
	width: 1400,
	height: 790,
	physics: {
		default: 'arcade',
		arcade: {
			debug: true,
			gravity: { y: 800 }
		}
	},
	scene: [HelloWorldScene]
}

export default new Phaser.Game(config)
