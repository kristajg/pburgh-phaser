import Phaser from 'phaser';
import eventsCenter from '../prefabs/EventsCenter';
import { createTextBox } from '../utils/textBox';

// SO... the text box logic should go here
// that makes it reusable and separates it from the scene
// menus could go here...inventory...
// health bars etc

let textBox;
let sampleTexty = `Hey, Its your computer. With the nets and everything. Its so cool how you have a computer and not a lot of other people do in this town. YOu think about your first computer. Disks and all. What a time to be sure.`;

export default class UIScene extends Phaser.Scene {
  constructor() {
    super('UIScene')
  }

  create() {
    // listen to show-text-box to show text box
    eventsCenter.on('show-text-box', this.showTextBox, this);

    // listen to hide-text-box to destroy text box
    eventsCenter.on('hide-text-box', this.hideTextBox, this);

    // this.label = this.add.text(10, 10, 'UISCENE', { fontSize: 28 });
    // listen to 'update-count' event & call `updateCount()` when it fires
    // eventsCenter.on('update-count', this.updateCount, this);
  
    // clean up when Scene is shutdown
    this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
      // eventsCenter.off('update-count', this.updateCount, this);
      eventsCenter.off('show-text-box', this.showTextBox, this);
      eventsCenter.off('hide-text-box', this.hideTextBox, this);
    });
  }

  showTextBox(scene, interactiveObject) {
    console.log('showTextBox fired ', interactiveObject);

    if(!textBox){
      textBox = createTextBox(scene, 0 - 50, 0,  {
        wrapWidth: 200,
        fixedWidth: 200,
        fixedHeight: 50,
      })
      .start(sampleTexty, 20); 
    }
  }

  hideTextBox() {
    if(textBox) {
      textBox.destroy();
      textBox = null;
    }
  }

  updateCount(count) {
    this.label.text = `Count: ${count}`;
  }
}
