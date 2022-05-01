import Phaser from 'phaser';

// Prefabs
import Player from '../prefabs/Player';
import eventsCenter from '../prefabs/EventsCenter';

// Utils
import { isKeyPressedOnce } from '../utils/input';
import { placeZonesFromObjectLayer } from '../utils/zones';

let player;
let keys;
let isInZone = false;
let speechBubble;
let textBoxIsOpen = false;
let currentInteractiveObject;

export default class PipsHouse extends Phaser.Scene {
  constructor() {
    super('PipsHouse')
  }

  preload() {
    this.textBox;
  }

  create() {
    // console.log('Phaser data ONE ', this.data.set({ name: 'Pip the Pigeon' }));

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
    placeZonesFromObjectLayer(this, objectLayerItems, player);

    // Speech Bubble: show / hide above interactive zones
    speechBubble = this.add.image(0, 0, 'speechBubble');
    speechBubble.visible = false;
  }

  update() {
    player.update();

    // Press enter to open textbox
    if (speechBubble.visible && isKeyPressedOnce(keys.enter)) {
      // open text box if one isnt open
      eventsCenter.emit('show-text-box', this);

      // Freeze pip during dialog
      player.body.moves = false;
    }

    // Press escape to close textbox whenever
    // probably need to make speech bubble visible again
    if (isKeyPressedOnce(keys.esc)) {
      eventsCenter.emit('hide-text-box', this);
      player.body.moves = true;
    }

    if (speechBubble.visible && !isInZone) {
      speechBubble.visible = false;
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
}
