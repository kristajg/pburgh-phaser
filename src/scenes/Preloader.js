import Phaser from 'phaser';

// Sprites
import pigeon from '../assets/sprites/pigeonSpritesheet.png';
import carl from '../assets/sprites/carl01.png';
import speechBubble from '../assets/sprites/speechBubble.png';
import blueButton1 from '../assets/sprites/button1.png';
import blueButton2 from '../assets/sprites/button2.png';

// Tiles & Tilemaps
import tiles from '../assets/tilemaps/dungeonTileset.png';
import pigeonburghTiles from '../assets/tilemaps/pigeonburghTileset1.png';
import myDungeon from '../assets/tilemaps/myDungeon.json';
import pipsHouseMap from '../assets/tilemaps/pipsHouseMap.json';

// Textbot assets
import arialFontPng from '../assets/fonts/arial/Arial16.png';
import arialFontXml from '../assets/fonts/arial/Arial16.xml';
import nextPage from '../assets/sprites/nextPage.png';
import lastPage from '../assets/sprites/lastPage.png';

export default class Preloader extends Phaser.Scene {
  constructor() {
    super('preloader')
  }

  preload() {
    // Sprites
    this.load.spritesheet('pigeon', pigeon, { frameWidth: 16, frameHeight: 16 });
    this.load.spritesheet('carl', carl, { frameWidth: 16, frameHeight: 16 });
    this.load.image('speechBubble', speechBubble, { frameWidth: 16, frameHeight: 16 });
    this.load.image('blueButton1', blueButton1);
    this.load.image('blueButton2', blueButton2);

    // Tilemaps
    this.load.image('tiles', tiles);
    this.load.image('pigeonburghTiles', pigeonburghTiles);
    this.load.tilemapTiledJSON('myDungeon', myDungeon);
    this.load.tilemapTiledJSON('pipsHouseMap', pipsHouseMap);

    // Textbox
    this.load.bitmapFont('arial', arialFontPng, arialFontXml);
    // this.load.bitmapFont('arial', '../assets/fonts/arial/Arial20.png', '../assets/fonts/arial/Arial20.xml');
    this.load.image('nextPage', nextPage);
    this.load.image('lastPage', lastPage);
  }

  create() {
    this.scene.start('GameScene');
  }
}
