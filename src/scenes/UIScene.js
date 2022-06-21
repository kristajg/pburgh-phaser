import Phaser from 'phaser';
import eventsCenter from '../prefabs/EventsCenter';
import { createTextBox, createCoolTextBox } from '../utils/textBox';

// TODO: stats bar: mood/health, cash
// TODO: ESC menu

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

  showTextBox(data) {
    console.log('data!! ', data);
    const { scene, currentInteractiveName, currentInteractiveType } = data;
    console.log('showTextBox fired ', scene);
    console.log('showTextBox fired ', currentInteractiveName);

    if(!textBox){
      createCoolTextBox(scene, currentInteractiveName);

      // OLD REXUI TEXTBOX
      // textBox = createTextBox(scene, 0 - 90, 80,  {
      //   wrapWidth: 250,
      //   fixedWidth: 250,
      //   fixedHeight: 50,
      // })
      // .start(sampleTexty, 20); 
    }
  }

  hideTextBox() {
    if(textBox) {
      textBox.destroy();
      textBox = null;
    }
  }

  // updateCount(count) {
  //   this.label.text = `Count: ${count}`;
  // }
}
