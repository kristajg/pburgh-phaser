import Phaser from 'phaser';
import newStory from '../assets/text/newStory.json';

// Utils
import { isKeyPressedOnce } from '../utils/input';

let keys;
let storyTextObject;
let textIndex = 0;
let textContentList = [];
let isEnterPressedOnce = false;

export default class IntroScene extends Phaser.Scene {
  constructor() {
    super('IntroScene')
  }

  preload() {}
  
  create() {
    const { ENTER } = Phaser.Input.Keyboard.KeyCodes;
    keys = this.input.keyboard.addKeys({ enter: ENTER });

    textContentList = newStory.introScene;

    const x = (this.cameras.main.worldView.x + this.cameras.main.width / 2) - 150;
    const y = (this.cameras.main.worldView.y + this.cameras.main.height / 2) - 30;
    storyTextObject = this.add.bitmapText(x, y, 'arial', textContentList[0], 16).setMaxWidth(320);
  }

  update() {
    isEnterPressedOnce = isKeyPressedOnce(keys.enter);
    if (isEnterPressedOnce) {
      this.advanceText();
    }
  }
  
  advanceText() {
    textIndex++;

    if (textIndex >= textContentList.length) {
      storyTextObject.destroy();
      window.sessionStorage.setItem('pigeonburghGameBool', true);
      this.scene.start('PipsHouse');
    } else {
      storyTextObject.setText(textContentList[textIndex]);
    }
  }
}
