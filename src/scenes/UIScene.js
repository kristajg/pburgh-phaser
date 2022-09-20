import Phaser from 'phaser';
import eventsCenter from '../prefabs/EventsCenter';
import { createTextBox, createTextContentList, createSelectionOptions } from '../utils/textBox';

let textBox;
let currentTextIndex = 0;
let textContentList = [];
let textSelectionOptions = [];

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
      eventsCenter.off('advance-text-box', this.advanceTextBox, this);
    });
  }

  showTextBox(data) {
    const { scene, currentInteractiveName } = data;
    if(!textBox){
      textContentList = createTextContentList(currentInteractiveName);
      textBox = createTextBox(scene, textContentList[0]);
    }
  }

  hideTextBox(player) {
    if(textBox) {
      const { textBoxBackGround, textBoxContent } = textBox;
      textBoxBackGround.destroy();
      textBoxContent.destroy();
      textBox = null;
      player.body.moves = true;
    }
  }

  advanceTextBox(data) {
    const { scene, player } = data;

    if(currentTextIndex !== 0){
      const { textBoxContent } = textBox;
      const isSelectionObject = typeof textContentList[currentTextIndex] === 'object';
      if (isSelectionObject) {
        // Set main text as the selection prompt
        textBoxContent.setText(textContentList[currentTextIndex].mainText);

        // add selections to the textbox
        textSelectionOptions = createSelectionOptions(scene, textContentList[currentTextIndex].options);
      } else {
        // advance textContent to the next item in the array
        textBoxContent.setText(textContentList[currentTextIndex]);
      }
    }
    currentTextIndex++;

    // close textbox if the end of content is reached
    if(currentTextIndex > textContentList.length) {
      eventsCenter.emit('hide-text-box', player);
      eventsCenter.emit('toggle-text-box-visibility', false);
      currentTextIndex = 0;
    }
  }

  // closeTextBox(data) {
  //   const { player } = data;
  //   eventsCenter.emit('hide-text-box', player);
  //   eventsCenter.emit('toggle-text-box-visibility', false);
  //   currentTextIndex = 0;
  // }

  selectDialogOption(options) {
    // Handles up, down, enter
    console.log('select dialog option fired ', options);
    // update localStorage with selection
  }

  // updateCount(count) {
  //   this.label.text = `Count: ${count}`;
  // }
}
