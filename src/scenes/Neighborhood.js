import Phaser from 'phaser';

// Prefabs
import Player from '../prefabs/Player';

// Utils
import { createTextBox } from '../utils/textBox';

// Game variables
let player;
let carl;
let carlZone;
let speechBubble;
let textBoxIsOpen = false;
let isInZone = false;

// Dialoguebox text & styles
const sampleText = 'Carl: Hey man. How\'s it going?';
const COLOR_PRIMARY = 0x352b42;
const COLOR_LIGHT = 0xb8b5b9;
const COLOR_DARK = 0x260e04;


export default class Neighborhood extends Phaser.Scene {
  constructor() {
    super('Neighborhood')
  }

  preload() {
    this.keys;
    this.textBox;
  }

  create() {
    // Tilemaps
    const map = this.make.tilemap({ key: 'myDungeon' });
    const tileset = map.addTilesetImage('myDungeon', 'tiles');
    map.createLayer('below', tileset);
    const worldLayer = map.createLayer('worldLayer', tileset);
    worldLayer.setCollisionByProperty({ collides: true });

    // Initialize keys
    const { ENTER, ESC, P } = Phaser.Input.Keyboard.KeyCodes;
    this.keys = this.input.keyboard.addKeys({
      enter: ENTER,
      esc: ESC,
      p: P,
    });
  
    // Add test NPC && zone around it
    // TODO: separate NPC logic into it's own class
    carl = this.physics.add.staticSprite(232, 102, 'carl');
    carlZone = this.add.zone(232, 102, 20, 20);
    this.physics.world.enable(carlZone);
    carlZone.body.setAllowGravity(false);
    carlZone.body.moves = false;

    // Player
    player = new Player(this, 200, 120, 'pigeon');
    this.physics.add.collider(player, worldLayer);
    this.physics.add.collider(player, carl);
    this.physics.add.overlap(player, carlZone, this.showSpeechBubble, null, this);
    this.cameras.main.startFollow(player, true);

    // Game mechanics
    speechBubble = this.add.image(230, 84, 'speechBubble').setScale(.8);
    speechBubble.visible = false;
  }

  update() {
    player.update();
    const { keys } = this;

    // Press enter to open textbox
    if (speechBubble.visible && keys.enter.isDown && !textBoxIsOpen) {
      this.talkToNPC();
    }

    // Press escape to close textbox
    if (keys.esc.isDown && textBoxIsOpen) {
      textBoxIsOpen = false;
      this.textBox.destroy();
    }

    if (speechBubble.visible && !isInZone) {
      speechBubble.visible = false;
      if (this.textBox) {
        textBoxIsOpen = false;
        this.textBox.destroy();
      }
    }
    isInZone = false;

    // SCENE CHANGE SHORTCUT: press P to go to pip's house scene
    if (keys.p.isDown) {
      this.scene.start('PipsHouse');
    }
  }

  showSpeechBubble() {
    speechBubble.visible = true;
    isInZone = true;
  }

  talkToNPC() {
    // Add a textbox if one isnt open
    if (!textBoxIsOpen) {
      this.textBox = createTextBox(this, 50, 150, textBoxIsOpen, {
        wrapWidth: 200,
        fixedWidth: 200,
        fixedHeight: 35,
      })
      .start(sampleText, 20);
    }
  }
}
