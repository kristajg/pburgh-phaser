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
let currentInteractiveName;
let isEnterPressedOnce = false;

export default class PipsHouse extends Phaser.Scene {
  constructor() {
    super('PipsHouse')
  }

  preload() {}

  create() {
    // Initialize keys
    const { ENTER } = Phaser.Input.Keyboard.KeyCodes;
    keys = this.input.keyboard.addKeys({
      enter: ENTER,
    });

    // Tilemaps
    const map = this.make.tilemap({ key: 'pipsHouseTileset' });
    const tileset = map.addTilesetImage('pipsHouseTileset', 'pigeonburghTiles');

    // Below and world layers
    map.createLayer('below', tileset);
    const worldLayer = map.createLayer('worldLayer', tileset);
    worldLayer.setCollisionByProperty({ collides: true });

    // Player
    player = new Player(this, 75, 75, 'pigeon');
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
    isEnterPressedOnce = isKeyPressedOnce(keys.enter);

    // Press enter to open textbox
    if (speechBubble.visible && isEnterPressedOnce) {
      player.body.moves = false;
      eventsCenter.emit('enter-key-pressed', { scene: this, player, currentInteractiveName });
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
    currentInteractiveName = zone.name;
  }

  overlapWithSceneChange(player, zone) {
    this.scene.start(zone.sceneChangeName);
  }
}
