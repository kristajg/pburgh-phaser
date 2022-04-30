import Phaser from 'phaser';
import eventsCenter from '../prefabs/EventsCenter';

// SO... the text box logic should go here
// that makes it reusable and separates it from the scene
// menus could go here...inventory...
// health bars etc
export default class UIScene extends Phaser.Scene {
  constructor() {
    super('UIScene')
  }

  create() {
    // this.label = this.add.text(10, 10, 'Count: 0', {
    //   fontSize: 28
    // });
  
    // listen to 'update-count' event & call `updateCount()`
    // when it fires
    eventsCenter.on('update-count', this.updateCount, this);
  
    // clean up when Scene is shutdown
    this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
      eventsCenter.off('update-count', this.updateCount, this);
    });
  }

  update() {}

  updateCount(count) {
    this.label.text = `Count: ${count}`;
  }
}
