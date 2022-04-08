import Phaser from 'phaser';

// Image Assets
import pigeon from '../assets/sprites/pigeonSpritesheet.png';
import carl from '../assets/sprites/carl01.png';
import speechBubble from '../assets/sprites/speechBubble.png';
import toast from '../assets/sprites/toastSpriteSheet.png';
import tiles from '../assets/tilemaps/dungeonTileset.png';

// Tilemaps
import myDungeon from '../assets/tilemaps/myDungeon.json';

export default class Preloader extends Phaser.Scene {
  constructor() {
    super('preloader')
  }

  preload() {
    // Sprites
    this.load.spritesheet('pigeon', pigeon, { frameWidth: 16, frameHeight: 16 });
    this.load.spritesheet('toast', toast, { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('carl', carl, { frameWidth: 16, frameHeight: 16 });
    this.load.image('speechBubble', speechBubble, { frameWidth: 16, frameHeight: 16 });

    // Tilemaps
    this.load.image('tiles', tiles);
    this.load.tilemapTiledJSON('myDungeon', myDungeon);
  }

  create() {
    this.scene.start('GameScene');
  }
}
