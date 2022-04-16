import Phaser from 'phaser';

// Sprites
import pigeon from '../assets/sprites/pigeonSpritesheet.png';
import carl from '../assets/sprites/carl01.png';
import speechBubble from '../assets/sprites/speechBubble.png';

// Tiles & Tilemaps
import tiles from '../assets/tilemaps/dungeonTileset.png';
import pigeonburghTiles from '../assets/tilemaps/pigeonburghTileset1.png';
import myDungeon from '../assets/tilemaps/myDungeon.json';
import pipsHouseMap from '../assets/tilemaps/pipsHouseMap.json';

export default class Preloader extends Phaser.Scene {
  constructor() {
    super('preloader')
  }

  preload() {
    // Sprites
    this.load.spritesheet('pigeon', pigeon, { frameWidth: 16, frameHeight: 16 });
    this.load.spritesheet('carl', carl, { frameWidth: 16, frameHeight: 16 });
    this.load.image('speechBubble', speechBubble, { frameWidth: 16, frameHeight: 16 });

    // Tilemaps
    this.load.image('tiles', tiles);
    this.load.image('pigeonburghTiles', pigeonburghTiles);
    this.load.tilemapTiledJSON('myDungeon', myDungeon);
    this.load.tilemapTiledJSON('pipsHouseMap', pipsHouseMap);
  }

  create() {
    this.scene.start('GameScene');
  }
}
