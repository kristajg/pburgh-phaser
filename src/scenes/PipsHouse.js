import Phaser from 'phaser';

// Prefabs
import Player from '../prefabs/Player';
import InteractiveSprite from '../prefabs/InteractiveSprite';
import eventsCenter from '../prefabs/EventsCenter';

// Utils
import { isKeyPressedOnce } from '../utils/input';
import { placeZonesFromObjectLayer } from '../utils/zones';

let player;
let keys;
let isInZone = false;
let speechBubble;
let textBoxOpen = false;
let currentInteractiveName;
let currentInteractiveType;
let isEnterPressedOnce = false;
let isEscPressedOnce = false;
let computer;

export default class PipsHouse extends Phaser.Scene {
  constructor() {
    super('PipsHouse')
  }

  preload() {}

  create() {
    // text box visibility listener
    eventsCenter.on('toggle-text-box-visibility', this.toggleTextBoxOpen, this);

    // clean up listeners on scene shut down
    this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
      eventsCenter.off('toggle-text-box-visibility', this.toggleTextBoxOpen, this);
    })

    // Initialize keys
    const { ENTER, ESC } = Phaser.Input.Keyboard.KeyCodes;
    keys = this.input.keyboard.addKeys({
      enter: ENTER,
      esc: ESC,
    });

    // Tilemaps
    const map = this.make.tilemap({ key: 'pipsHouseMap' });
    const tileset = map.addTilesetImage('pigeonburghTileset', 'pigeonburghTiles');

    // Below and world layers
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

    // interactive sprites in scene
    // computer = new InteractiveSprite(this, 64, 41, 'computer', false);
  }

  update() {
    player.update();
    // computer.update();
    isEnterPressedOnce = isKeyPressedOnce(keys.enter);
    isEscPressedOnce = isKeyPressedOnce(keys.esc);

    // Press enter to open textbox
    if (speechBubble.visible && isEnterPressedOnce) {
      eventsCenter.emit('show-text-box', { scene: this, currentInteractiveName, currentInteractiveType });
      eventsCenter.emit('toggle-text-box-visibility', true);

      // Freeze pip during dialog
      player.body.moves = false;
    }

    // Press enter while text box is open to advance text
    if (textBoxOpen && isEnterPressedOnce) {
      eventsCenter.emit('advance-text-box', { player });
    }

    // Press escape to close textbox
    // if (isEscPressedOnce) {
    //   eventsCenter.emit('hide-text-box', player);
    //   textBoxOpen = false;
    //   player.body.moves = true;
    // }

    if (speechBubble.visible && !isInZone) {
      speechBubble.visible = false;
    }
    isInZone = false;
  }

  toggleTextBoxOpen(status){
    textBoxOpen = status;
  }

  overlapWithInteractive(player, zone) {
    speechBubble.setPosition(zone.x, zone.y - 22);
    speechBubble.visible = true;
    isInZone = true;
    currentInteractiveName = zone.name;
    currentInteractiveType = zone.type;
  }

  overlapWithSceneChange(player, zone) {
    this.scene.start(zone.sceneChangeName);
  }
}
