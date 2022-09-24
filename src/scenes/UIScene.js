import Phaser from 'phaser';
import eventsCenter from '../prefabs/EventsCenter';
import { createTextBox, createTextContentList, createSelectionOptions } from '../utils/textBox';

let textBox;
let textBoxOpen = false;
let currentTextIndex = 0;
let textContentList = [];
let textSelectionOptions = [];

export default class UIScene extends Phaser.Scene {
  constructor() {
    super('UIScene')
  }

  create() {
    // event listeners
    eventsCenter.on('enter-key-pressed', this.enterKeyPressed, this);

    // this.label = this.add.text(10, 10, 'UISCENE', { fontSize: 28 });
    // listen to 'update-count' event & call `updateCount()` when it fires
    // eventsCenter.on('update-count', this.updateCount, this);
  
    // clean up when Scene is shutdown
    this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
      // eventsCenter.off('update-count', this.updateCount, this);
      eventsCenter.off('enter-key-pressed', this.enterKeyPressed, this);
    });
  }

  showTextBox(scene, currentInteractiveName) {
    if(!textBox){
      textBoxOpen = true;
      textContentList = createTextContentList(currentInteractiveName);
      textBox = createTextBox(scene, textContentList[0]);
    }
  }

  hideTextBox(player) {
    if(textBox) {
      const { textBoxBackGround, textBoxContent } = textBox;
      textBoxOpen = false;
      currentTextIndex = 0;
      textBoxBackGround.destroy();
      textBoxContent.destroy();
      textBox = null;
      console.log('...player? ', player);
      player.body.moves = true;
    }
  }

  advanceTextBox(scene, player) {
    currentTextIndex++;
  
    if (currentTextIndex >= textContentList.length) {
      // close textbox if the end of content is reached
      this.hideTextBox(player);
    } else {
      // proceed to next contect
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
  }

  // closeTextBox(data) {
  //   const { player } = data;
  //   eventsCenter.emit('hide-text-box', player);
  //   eventsCenter.emit('toggle-text-box-visibility', false);
  //   currentTextIndex = 0;
  // }

  // selectDialogOption(options) {
  //   // Handles up, down, enter
  //   console.log('select dialog option fired ', options);
  //   // update localStorage with selection
  // }

  enterKeyPressed(data) {
    const { scene, player, currentInteractiveName } = data;
    if (!textBoxOpen) {
      this.showTextBox(scene, currentInteractiveName);
    } else {
      this.advanceTextBox(scene, player);
    }
    // TODO: handle other enter key presses here (select option)
  }

  // updateCount(count) {
  //   this.label.text = `Count: ${count}`;
  // }
}
