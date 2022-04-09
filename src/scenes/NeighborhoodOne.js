import Phaser from 'phaser';

// Tilemaps
// import neighborhoodOne from '../assets/tilemaps/neighborhoodOne.json';

export default class NeighborhoodOne extends Phaser.Scene {
  constructor() {
    super('NeighborhoodOne')
  }

  preload() {
    // Tilemaps
    // this.load.image('tiles', tiles);
    // this.load.tilemapTiledJSON('neighborhoodOne', neighborhoodOne);
  }

  create() {
    // this.scene.start('GameScene');
  }

  switchScene(scene) {
    if(scene === 'pipshouse') {
      this.scene.start('PipsHouse');
    }
  }
}
