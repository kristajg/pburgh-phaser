import Phaser from 'phaser';

// Prefabs
import Player from '../prefabs/Player';
import InteractiveZone from '../prefabs/InteractiveZone';

let player;

export default class PipsHouse extends Phaser.Scene {
  constructor() {
    super('PipsHouse')
  }

  preload() {
  }

  create() {
    // Tilemaps
    const map = this.make.tilemap({ key: 'pipsHouseMap' });
    const tileset = map.addTilesetImage('pigeonburghTileset', 'pigeonburghTiles');
    map.createLayer('below', tileset);
    const worldLayer = map.createLayer('worldLayer', tileset);
    worldLayer.setCollisionByProperty({ collides: true });
    
    // TODO: Object Layer
    // console.log('Looking for game objects array ', map.objects[0].objects);
    // let objectLayerItems = map.objects[0].objects; // This is an array of game objects

    // loop through objects... check for interactive zones && create zones for them
    // and add properties to that zone
    // objectLayerItems.forEach(obj => {
    //   console.log('Obj ', obj);
    //   new InteractiveZone(this, obj.x, obj.y, obj.properties);
    //   // obj.properties.find(isZone => {});
    // });
    // let objectLayerObjects = map.objects[0].objects[0];
    // console.log('Looking for game objects ONE ', objectLayerObjects);



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
  }

  update() {
    player.update();
  }

  overlapWithInteractive() {
    console.log('Overlap with interactive');
    // TODO: add textbox for interactive zones
  }

  overlapWithSceneChange(player, zone) {
    this.scene.start(zone.sceneChangeName);
  }
}
