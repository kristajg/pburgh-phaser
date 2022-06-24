import Phaser from 'phaser';
import eventsCenter from '../prefabs/EventsCenter';
import { createTextBox, getTextFromFile } from '../utils/textBox';

// TODO: stats bar: mood/health, cash
// TODO: ESC menu

let textBox;
let currentTextPosition = 0;
let textContentList = [];

export default class UIScene extends Phaser.Scene {
  constructor() {
    super('UIScene')
  }

  create() {
    // text box listeners
    eventsCenter.on('show-text-box', this.showTextBox, this);
    eventsCenter.on('hide-text-box', this.hideTextBox, this);
    eventsCenter.on('advance-text-box', this.advanceTextBox, this);

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
    const { scene, currentInteractiveName, currentInteractiveType } = data;
    if(!textBox){
      // Pull current text content based on currentInteractiveName
      textContentList = getTextFromFile(currentInteractiveName);
      
      // Create text box
      textBox = createTextBox(scene, currentInteractiveName, textContentList[0]);
    }
  }

  hideTextBox(player) {
    if(textBox) {
      player.body.moves = true;
      const { textBoxBackGround, textBoxContent } = textBox;
      textBoxBackGround.destroy();
      textBoxContent.destroy();
      textBox = null;
    }
  }

  advanceTextBox(data) {
    if(currentTextPosition !== 0){
      const { textBoxContent } = textBox;
      // advance textContent to the next item in the array
      textBoxContent.setText(textContentList[currentTextPosition]);
    }
    currentTextPosition++;
    // close textbox if the end of content is reached
    if(currentTextPosition > textContentList.length) {
      const { player } = data;
      eventsCenter.emit('hide-text-box', player);
      eventsCenter.emit('toggle-text-box-visibility', false);
      currentTextPosition = 0;
    }
  }

  // updateCount(count) {
  //   this.label.text = `Count: ${count}`;
  // }
}
