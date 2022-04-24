import Phaser from 'phaser';
import GlobalSettings from '../prefabs/GlobalSettings';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene')
    const globalSettings = new GlobalSettings();
    this.globals = { globalSettings };
  }

  preload() {
  }

  create() {
    this.scene.start('PipsHouse');
    // this.scene.start('Title');
  }

  update() {}
}
