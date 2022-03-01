import Phaser from 'phaser';

// Image Assets
import pigeon from '../assets/sprites/pigeonSpritesheet.png';

// Animations
import { createPlayerAnims } from '../anims/playerAnims';

class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene')
  }

  preload() {
    // Provide access to canvas element
    this.canvas = this.sys.game.canvas;

    // Custom variables
    this.cursors;
    this.player;
    this.keys;

    // Camera
    this.cameras.main.setBackgroundColor('#ffffff');
    this.cameras.main.height = 256;
    this.cameras.main.width = 336;
    this.cameras.main.setPosition(32, 32);

    // Sprites
    this.load.spritesheet('pigeon', pigeon, { frameWidth: 16, frameHeight: 16 });

    // Tilemaps
    // GO HERE
  }

  create() {
    // Initialize keys
    const { LEFT, RIGHT, UP, DOWN, W, A, S, D } = Phaser.Input.Keyboard.KeyCodes;
    this.keys = this.input.keyboard.addKeys({
      left: LEFT,
      right: RIGHT,
      up: UP,
      down: DOWN,
      w: W,
      a: A,
      s: S,
      d: D,
    });

    // Initialize animations
    createPlayerAnims(this.anims);

    // Player
    this.player = this.physics.add.sprite(200, 120, 'pigeon').setScale(2);
    this.cameras.main.startFollow(this.player, true, 0.8, 0.8);
    this.player.body.setCollideWorldBounds(true);

    // Cursors
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    const { keys } = this;
    const speed = 50;
    // const previousVelocity = this.player.body.velocity.clone();

    this.player.body.setVelocity(0);

    // Player movement
    if (keys.left.isDown || keys.a.isDown) {
      this.player.body.setVelocityX(-speed);
    } else if (keys.right.isDown || keys.d.isDown) {
      this.player.body.setVelocityX(speed);
    }

    if (keys.up.isDown || keys.w.isDown) {
      this.player.body.setVelocityY(-speed);
    } else if (keys.down.isDown || keys.s.isDown) {
      this.player.body.setVelocityY(speed);
    }

    this.player.body.velocity.normalize().scale(speed); // idk wtf this is!!

    // Player animations
    if (keys.up.isDown || keys.w.isDown) {
      this.player.anims.play('player-up', true);
    } else if (keys.down.isDown || keys.s.isDown) {
      this.player.anims.play('player-down', true);
    } else if (keys.left.isDown || keys.a.isDown) {
      this.player.anims.play('player-left', true);
    } else if (keys.right.isDown || keys.d.isDown) {
      this.player.anims.play('player-right', true);
    } else {
      this.player.anims.stop();
    }

    // idle animations
    // if (this.player.body.velocity.x === 0 && this.player.body.velocity.y === 0) {
    //   if (previousVelocity.x < 0) {
    //       this.player.setFrame(this.idleFrame.left)
    //   } else if (previousVelocity.x > 0) {
    //       this.player.setFrame(this.idleFrame.right)
    //   } else if (previousVelocity.y < 0) {
    //       this.player.setFrame(this.idleFrame.up)
    //   } else if (previousVelocity.y > 0) {
    //       this.player.setFrame(this.idleFrame.down)
    //   }
    // }
  }
}

export default GameScene;
