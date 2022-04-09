import Phaser from 'phaser';

let player;

export default class PipsHouse extends Phaser.Scene {
  constructor() {
    super('PipsHouse')
  }

  preload() {
  }

  create() {
    // Tilemaps
    const map = this.make.tilemap({ key: 'pipsHouse' });
    const tileset = map.addTilesetImage('myDungeon', 'tiles');
    map.createLayer('below', tileset);
    const worldLayer = map.createLayer('worldLayer', tileset);
    worldLayer.setCollisionByProperty({ collides: true });

    // Player
    player = this.physics.add.sprite(200, 120, 'pigeon');
    this.physics.add.collider(player, worldLayer);
    this.cameras.main.startFollow(player, true);
  }
}
