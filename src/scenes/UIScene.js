import Phaser from 'phaser';

// Prefabs
import eventsCenter from '../prefabs/EventsCenter';

// Utils
import { createTextBox, createTextContentList, createSelectionOptions } from '../utils/textBox';
import { isKeyPressedOnce } from '../utils/input';

let keys;
let textBox;
let textBoxOpen = false;
let currentSelectionIndex = 0;
let currentTextIndex = 0;
let textContentList = [];
let textSelectionOptions = [];
let isUpPressedOnce = false;
let isDownPressedOnce = false;


export default class UIScene extends Phaser.Scene {
  constructor() {
    super('UIScene')
  }

  create() {
    // Initialize keys
    const { UP, DOWN } = Phaser.Input.Keyboard.KeyCodes;
    keys = this.input.keyboard.addKeys({
      up: UP,
      down: DOWN,
    });

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

  update() {
    if (textBoxOpen) {
      isUpPressedOnce = isKeyPressedOnce(keys.up);
      isDownPressedOnce = isKeyPressedOnce(keys.down);
  
      if (isUpPressedOnce) {
        this.changeSelection('up');
      }
      if (isDownPressedOnce) {
        this.changeSelection('down');
      }
    }
  }

  changeSelection(selectionDirection){
    const totalOptions = textSelectionOptions.length - 1;
    const previousSelectionIndex = currentSelectionIndex;
    const cursorText = '> ';

    switch(selectionDirection) {
      case 'up':
        currentSelectionIndex--;
        if (currentSelectionIndex === -1) {
          currentSelectionIndex = totalOptions;
        }
        break;
      case 'down':
        if (currentSelectionIndex === totalOptions) {
          currentSelectionIndex = 0;
        } else {
          currentSelectionIndex++;
        }
        break;
      default:
        break;
    }

    const previousSelectionText = textSelectionOptions[previousSelectionIndex].text;
    const currentSelectionText = textSelectionOptions[currentSelectionIndex].text
    textSelectionOptions[previousSelectionIndex].setText(previousSelectionText.slice(2));
    textSelectionOptions[currentSelectionIndex].setText(cursorText.concat(currentSelectionText));
    textSelectionOptions[previousSelectionIndex].setTint(0xffffff);
    textSelectionOptions[currentSelectionIndex].setTint(0xfacb3e);
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

  enterKeyPressed(data) {
    // TODO: handle enter press to select option & add to localStorage...then advance to final wrap up text!

    const { scene, player, currentInteractiveName } = data;
    if (!textBoxOpen) {
      this.showTextBox(scene, currentInteractiveName);
    } else {
      this.advanceTextBox(scene, player);
    }
  }

  // updateCount(count) {
  //   this.label.text = `Count: ${count}`;
  // }
}
