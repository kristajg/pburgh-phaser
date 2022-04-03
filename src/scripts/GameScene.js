import Phaser from 'phaser';

// Animations
import { createPlayerAnims } from '../anims/playerAnims';
import { createToastAnims } from '../anims/itemAnims';

let player;

class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene')
  }

  preload() {
    // Custom variables
    this.cursors;
    this.keys;
    this.toasts;
  }

  create() {
    // Tilemaps
    const map = this.make.tilemap({ key: 'myDungeon' });
    const tileset = map.addTilesetImage('myDungeon', 'tiles');

    map.createLayer('floor', tileset);
    const wallsLayer = map.createLayer('walls', tileset);

    wallsLayer.setCollisionByProperty({ collides: true });

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
    createToastAnims(this.anims);
  
    // Player
    player = this.physics.add.sprite(200, 120, 'pigeon');
    this.physics.add.collider(player, wallsLayer);

    // Bonus items
    this.toasts = this.physics.add.staticGroup();
    this.toasts.create(280, 200, 'toast');

    // Cursors
    this.cursors = this.input.keyboard.createCursorKeys();

    // Play toast animation by default
    this.toasts.playAnimation({ key: 'toastSpin' });
  }

  update() {
    const { keys } = this;
    const speed = 100;
    player.body.setVelocity(0);

    // Player movement
    if (keys.left.isDown || keys.a.isDown) {
      player.body.setVelocityX(-speed);
    } else if (keys.right.isDown || keys.d.isDown) {
      player.body.setVelocityX(speed);
    }

    if (keys.up.isDown || keys.w.isDown) {
      player.body.setVelocityY(-speed);
    } else if (keys.down.isDown || keys.s.isDown) {
      player.body.setVelocityY(speed);
    }

    player.body.velocity.normalize().scale(speed); // idk wtf this is!!

    // Player animations
    if (keys.up.isDown || keys.w.isDown) {
      player.anims.play('player-up', true);
    } else if (keys.down.isDown || keys.s.isDown) {
      player.anims.play('player-down', true);
    } else if (keys.left.isDown || keys.a.isDown) {
      player.anims.play('player-left', true);
    } else if (keys.right.isDown || keys.d.isDown) {
      player.anims.play('player-right', true);
    } else {
      player.anims.stop();
    }
  }

  // collectItem (player, item) {
  //   console.log('item is ', item);
  //   item.disableBody(true, true);
  //   score += 10;
  //   scoreText.setText(`Score is: ${score}`);
  // }
}

export default GameScene;
