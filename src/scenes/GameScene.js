import Phaser from 'phaser';

// import eventsCenter from '../prefabs/EventsCenter';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene')
  }

  preload() {}

  create() {
    this.scene.run('UIScene');

    // If game is a new game (no save file) show the IntroScene
    const saveFileExists = sessionStorage.getItem('pigeonburghGameBool');
    if (saveFileExists && saveFileExists) {
      this.scene.start('PipsHouse');
    } else {
      this.scene.start('IntroScene');
    }
  }

  update() {}
}
