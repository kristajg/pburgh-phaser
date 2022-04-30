import Phaser from 'phaser';

// Prefabs
import Player from '../prefabs/Player';
import InteractiveZone from '../prefabs/InteractiveZone';

// Utils
import { createTextBox } from '../utils/textBox';
import { isKeyPressedOnce } from '../utils/input';

let player;
let isInZone = false;
let speechBubble;
let textBoxIsOpen = false;
let keys;

const sampleTexty = 'Its your computer. With the nets and everything.';

export default class PipsHouse extends Phaser.Scene {
  constructor() {
    super('PipsHouse')
  }

  preload() {
    this.textBox;
  }

  create() {
    // Initialize keys
    const { ENTER, ESC } = Phaser.Input.Keyboard.KeyCodes;
    keys = this.input.keyboard.addKeys({
      enter: ENTER,
      esc: ESC,
    });

    // Tilemaps
    const map = this.make.tilemap({ key: 'pipsHouseMap' });
    const tileset = map.addTilesetImage('pigeonburghTileset', 'pigeonburghTiles');
    map.createLayer('below', tileset);
    const worldLayer = map.createLayer('worldLayer', tileset);
    worldLayer.setCollisionByProperty({ collides: true });

    // Player
    player = new Player(this, 100, 120, 'pigeon');
    this.physics.add.collider(player, worldLayer);
    this.cameras.main.startFollow(player, true);

    // Above tileset loaded after the player
    const aboveLayer = map.createLayer('above', tileset);
    aboveLayer.setCollisionByProperty({ collides: true });
    this.physics.add.collider(player, aboveLayer);

    // Tilemap object layer items
    const objectLayerItems = map.objects[0].objects;

    // TODO: separate this out into util function
    objectLayerItems.forEach(obj => {
      const { x, y, height, width, properties } = obj;

      // Create zone
      let zone = new InteractiveZone(this, x, y, width, height, properties);
      this.physics.world.enable(zone);

      // Add overlap function based on zone type
      let overlapFunction = zone.isInteractiveZone ? this.overlapWithInteractive : this.overlapWithSceneChange;
      this.physics.add.overlap(player, zone, overlapFunction, null, this);
    });

    // Speech Bubble: show / hide above interactive zones
    speechBubble = this.add.image(0, 0, 'speechBubble');
    speechBubble.visible = false;
  }

  update() {
    player.update();

    // Press enter to open textbox
    if (speechBubble.visible && isKeyPressedOnce(keys.enter) && !textBoxIsOpen) {
      this.interactWithObject();
    }

    // NEEDS FIXED: Press escape to close textbox
    // console.log('textBoxIsOpen?? ', textBoxIsOpen);
    // if (isKeyPressedOnce(keys.esc) && textBoxIsOpen) {
    //   console.log('escape key pressed to close text box');
    //   textBoxIsOpen = false;
    //   this.textBox.destroy();
    // }

    if (speechBubble.visible && !isInZone) {
      speechBubble.visible = false;
      // TODO: below should also depend on textBoxIsOpen
      if (this.textBox) {
        textBoxIsOpen = false;
        this.textBox.destroy();
      }
    }
    isInZone = false;
  }

  overlapWithInteractive(player, zone) {
    speechBubble.setPosition(zone.x, zone.y - 22);
    speechBubble.visible = true;
    isInZone = true;
  }

  overlapWithSceneChange(player, zone) {
    this.scene.start(zone.sceneChangeName);
  }

  interactWithObject() {
    // Add a textbox if one isnt open
    if (!textBoxIsOpen) {
      // Create new text box
      this.textBox = createTextBox(this, 50, 150, textBoxIsOpen, {
        wrapWidth: 200,
        fixedWidth: 200,
        fixedHeight: 35,
      })
      .start(sampleTexty, 20);
    }
  }
}
