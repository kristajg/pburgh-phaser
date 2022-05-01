import Phaser from 'phaser';
import eventsCenter from '../prefabs/EventsCenter';
import { createTextBox } from '../utils/textBox';

// SO... the text box logic should go here
// that makes it reusable and separates it from the scene
// menus could go here...inventory...
// health bars etc

let textBoxIsOpen = false;
let textBox;
let sampleTexty = 'Hey, Its your computer. With the nets and everything.';

export default class UIScene extends Phaser.Scene {
  constructor() {
    super('UIScene')
  }

  create() {
    // listen to show-text-box to show text box
    eventsCenter.on('show-text-box', this.showTextBox, this);

    // listen to hide-text-box to destroy text box
    eventsCenter.on('hide-text-box', this.hideTextBox, this);

    // this.label = this.add.text(10, 10, 'UISCENE', {
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

  showTextBox(scene, interactiveObject) {
    console.log('showTextBox fired ', interactiveObject);

    // textBoxIsOpen = true;

    // Add a textbox if one isnt open
    // if (!textBoxIsOpen) {
      // Create new text box
      textBox = createTextBox(scene, 0 - 50, 0, textBoxIsOpen, {
        wrapWidth: 200,
        fixedWidth: 200,
        // fixedHeight: 35,
      })
      .start(sampleTexty, 20);
    // }
  }

  hideTextBox() {
    textBoxIsOpen = false;
  }

  updateCount(count) {
    this.label.text = `Count: ${count}`;
  }
}
