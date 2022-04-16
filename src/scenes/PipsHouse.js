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
    const map = this.make.tilemap({ key: 'pipsHouseMap' });
    const tileset = map.addTilesetImage('pigeonburghTileset', 'pigeonburghTiles');
    map.createLayer('below', tileset);
    const worldLayer = map.createLayer('worldLayer', tileset);
    worldLayer.setCollisionByProperty({ collides: true });
    map.createLayer('above', tileset);


    // Player
    player = this.physics.add.sprite(100, 120, 'pigeon');
    this.physics.add.collider(player, worldLayer);
    this.cameras.main.startFollow(player, true);
  }

  update() {
    // if (keys.p.isDown) {
    //   this.scene.start('GameScene');
    // }
  }
}
