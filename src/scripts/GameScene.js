import Phaser from 'phaser';

// Image Assets
import bird from '../assets/sprites/birdSpriteSheet.png';

// Animations
import { createPlayerAnims } from '../anims/playerAnims';

class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene')
  }

  preload() {
    // Variables
    this.cursors;
    this.player;

    // Camera
    this.cameras.main.setBackgroundColor(0x9900e3);
    this.cameras.main.height = 256;
    this.cameras.main.width = 336;
    this.cameras.main.setPosition(32, 32);

    // Sprites
    this.load.spritesheet('bird', bird, { frameWidth: 64, frameHeight: 64 });
  }

  create() {
    // Initialize animations
    createPlayerAnims(this.anims);

    // Create & place player
    this.player = this.physics.add.sprite(100, 450, 'bird');
    this.cameras.main.startFollow(this.player, true, 0.8, 0.8);
    // this.cameras.main.startFollow(this.player, true, 0.8, 0.8);
    this.player.body.setCollideWorldBounds(true);
    this.player.x = 0;
    this.player.y = 300;

    // Cursors
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    // Player walk
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
      this.player.anims.play('left', true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);
      this.player.anims.play('right', true);
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play('turn');
    }

    // Player jump
    // TODO: add idle, jump, run animations to sprite sheet
    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-330);
    }
  }
}

export default GameScene;
