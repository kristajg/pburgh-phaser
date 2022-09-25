import Phaser from 'phaser';

// Prefabs
import eventsCenter from '../prefabs/EventsCenter';

// Utils
import { createTextBox, createTextContentList, createSelectionOptions } from '../utils/textBox';
import { isKeyPressedOnce } from '../utils/input';

let keys;
let textBox;
let textBoxOpen = false;
let selectionIndex = 0;
let textIndex = 0;
let textContentList = [];
let textSelectionOptions = [];
let isUpPressedOnce = false;
let isDownPressedOnce = false;

export default class UIScene extends Phaser.Scene {
  constructor() {
    super('UIScene')
  }

  create() {
    // initialize keys
    const { UP, DOWN } = Phaser.Input.Keyboard.KeyCodes;
    keys = this.input.keyboard.addKeys({
      up: UP,
      down: DOWN,
    });

    // event listeners
    eventsCenter.on('enter-key-pressed', this.enterKeyPressed, this);
  
    // clean up listeners on scene shutdown
    this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
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
    const previousSelectionIndex = selectionIndex;
    const cursorText = '> ';

    switch(selectionDirection) {
      case 'up':
        selectionIndex--;
        if (selectionIndex === -1) {
          selectionIndex = totalOptions;
        }
        break;
      case 'down':
        if (selectionIndex === totalOptions) {
          selectionIndex = 0;
        } else {
          selectionIndex++;
        }
        break;
      default:
        break;
    }

    const previousSelectionText = textSelectionOptions[previousSelectionIndex].text;
    const currentSelectionText = textSelectionOptions[selectionIndex].text
    textSelectionOptions[previousSelectionIndex].setText(previousSelectionText.slice(2));
    textSelectionOptions[selectionIndex].setText(cursorText.concat(currentSelectionText));
    textSelectionOptions[previousSelectionIndex].setTint(0xffffff);
    textSelectionOptions[selectionIndex].setTint(0xfacb3e);
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
      textIndex = 0;
      textBoxBackGround.destroy();
      textBoxContent.destroy();
      textBox = null;
      player.body.moves = true;
    }
  }

  advanceTextBox(scene, player) {
    textIndex++;

    if (textIndex >= textContentList.length) {
      // close textbox if the end of content is reached
      this.hideTextBox(player);
    } else {
      // proceed to next content element
      const { textBoxContent } = textBox;
      const isSelectionObject = typeof textContentList[textIndex] === 'object';
      if (isSelectionObject) {
        // Set main text as the selection prompt
        textBoxContent.setText(textContentList[textIndex].mainText);
  
        // add selections to the textbox
        textSelectionOptions = createSelectionOptions(scene, textContentList[textIndex].options);
      } else {
        // advance textContent to the next item in the array
        textBoxContent.setText(textContentList[textIndex]);
      }
    }
  }

  playerSelectedOption(scene, player) {
    const selectedItem = textContentList[textIndex].options[selectionIndex];
    // update textContentList with follow up text for the selected item
    textContentList = textContentList.concat(selectedItem.followUpText);

    // store choice in sessionStorage (for now)
    window.sessionStorage.setItem('choiceId', selectedItem.id);

    // destroy choices bitmap objects && reset selection variables
    textSelectionOptions.forEach(option => option.destroy());
    textSelectionOptions = [];
    selectionIndex = 0;

    // advance textbox to the follow up text
    this.advanceTextBox(scene, player);
  }

  enterKeyPressed(data) {
    const { scene, player, currentInteractiveName } = data;
    if (!textBoxOpen) {
      this.showTextBox(scene, currentInteractiveName);
    } else if(textSelectionOptions.length) {
      this.playerSelectedOption(scene, player);
    } else {
      this.advanceTextBox(scene, player);
    }
  }
}
