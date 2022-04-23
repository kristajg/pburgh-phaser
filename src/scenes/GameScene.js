import Phaser from 'phaser';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene')
  }

  preload() {
  }

  create() {
    // this.scene.start('PipsHouse');
    this.scene.start('Title');
  }

  update() {}
}
