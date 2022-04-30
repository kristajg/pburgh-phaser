import Phaser from 'phaser';

import eventsCenter from '../prefabs/EventsCenter';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene')
  }

  preload() {}

  create() {
    // this.count = 0;
    this.scene.run('UIScene');

    // this.input.keyboard.on('keydown-SPACE', () => {
    //   ++this.count;
    //   eventsCenter.emit('update-count', this.count);
    // });
  
    // this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
    //   this.input.keyboard.off('keydown-SPACE');
    // });

    this.scene.start('PipsHouse');
  }

  update() {}
}
