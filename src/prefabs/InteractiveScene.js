import Phaser from 'phaser';

// Prefabs
import eventsCenter from '../prefabs/EventsCenter';

// Utils
import { isKeyPressedOnce } from '../utils/input';
import { createTextBox } from '../utils/textBox';

// let keys;
// let speechBubble;
// let textBoxOpen = false;

export default class InteractiveScene extends Phaser.Scene {
  constructor () {
    super('InteractiveScene')

    this.keys;
    this.speechBubble;
    this.textBoxOpen = false;
    this.isEnterPressedOnce = false;
    this.isEscPressedOnce = false;
    this.testThing = 'woowee';
  }

  preload () {}

  create () {
    // text box visibility listener
    eventsCenter.on('toggle-text-box-visibility', this.toggleTextBoxOpen, this);

    // clean up listeners on scene shut down
    this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
      eventsCenter.off('toggle-text-box-visibility', this.toggleTextBoxOpen, this);
    })

    // Initialize keys for textbox & menu
    const { ENTER, ESC } = Phaser.Input.Keyboard.KeyCodes;
    this.keys = this.input.keyboard.addKeys({
      enter: ENTER,
      esc: ESC,
    });

    // Speech Bubble: show / hide above interactive zones
    this.speechBubble = this.add.image(0, 0, 'speechBubble');
    this.speechBubble.visible = false;
  }

  update(){
    const { isEnterPressedOnce, isEscPressedOnce, keys } = this;
    isEnterPressedOnce = isKeyPressedOnce(keys.enter);
    isEscPressedOnce = isKeyPressedOnce(keys.esc);

  }

  toggleTextBoxOpen(status){
    this.textBoxOpen = status;
  }
}
