import Phaser from 'phaser';

// Image Assets
import pigeon from '../assets/sprites/pigeonSpritesheet.png';
import toast from '../assets/sprites/toastSpriteSheet.png';
import tiles from '../assets/tilemaps/0x72_DungeonTilesetII_v1.3.png';

// Tilemaps
import firstDungeon from '../assets/tilemaps/firstDungeon.json';

// Animations
import { createPlayerAnims } from '../anims/playerAnims';
import { createToastAnims } from '../anims/itemAnims';

class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene')
  }

  preload() {
    // Provide access to canvas element
    // this.canvas = this.sys.game.canvas;

    // Custom variables
    this.cursors;
    this.player;
    this.keys;
    this.toasts;

    // Camera
    this.cameras.main.setBackgroundColor('#ffffff');
    this.cameras.main.height = 256;
    this.cameras.main.width = 336;
    this.cameras.main.setPosition(32, 32);

    // Sprites
    this.load.spritesheet('pigeon', pigeon, { frameWidth: 16, frameHeight: 16 });
    this.load.spritesheet('toast', toast, { frameWidth: 32, frameHeight: 32 });

    // Tilemaps
    this.add.image('tiles', tiles);
    this.load.tilemapTiledJSON('dungeon', firstDungeon);

    // Setup overlap events
    // this.physics.add.overlap(this.player, this.toasts, this.collectItem);
    // this.physics.add.overlap();
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
    createToastAnims(this.anims);
  
    // Player
    this.player = this.physics.add.sprite(200, 120, 'pigeon').setScale(2);

    // Bonus items
    this.toasts = this.physics.add.staticGroup();
    this.toasts.create(280, 200, 'toast');

    // Cursors
    this.cursors = this.input.keyboard.createCursorKeys();

    // Play toast animation by default
    this.toasts.playAnimation({ key: 'toastSpin' });

    // Tilemaps
    const map = this.make.tilemap({ key: 'dungeon' });
    map.addTilesetImage('0x72_DungeonTilesetII_v1.4', 'tiles');
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
  }

  collectItem (player, item) {
    // console.log('item is ', item);
    // item.disableBody(true, true);
    // score += 10;
    // scoreText.setText(`Score is: ${score}`);
  }
}

export default GameScene;
