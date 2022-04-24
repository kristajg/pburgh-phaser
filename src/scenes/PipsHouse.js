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
    console.log('Looking for game objects array ', map.objects[0].objects);
    // let objectLayerItems = map.objects[0].objects; // This is an array of game objects

    // loop through objects... check for interactive zones && create zones for them
    // and add properties to that zone
    // objectLayerItems.forEach(obj => {
    //   console.log('Obj ', obj);
    //   new InteractiveZone(this, obj.x, obj.y, obj.properties);
    //   // obj.properties.find(isZone => {});
    // });
    let objectLayerObjects = map.objects[0].objects[0];
    // console.log('Looking for game objects ONE ', objectLayerObjects);



    // Player
    player = new Player(this, 100, 120, 'pigeon');
    this.physics.add.collider(player, worldLayer);
    this.cameras.main.startFollow(player, true);

    // Above tileset loaded after the player
    const aboveLayer = map.createLayer('above', tileset);
    aboveLayer.setCollisionByProperty({ collides: true });
    this.physics.add.collider(player, aboveLayer);

    // Tutorial: adding overlap with object
    // let coolZone = this.add.zone(objectLayerObjects.x, objectLayerObjects.y, objectLayerObjects.width, objectLayerObjects.height);
    // this.physics.world.enable(coolZone); // may not need this?
    // this.physics.add.overlap(player, coolZone, this.didOverlap, null, this);
    let objectLayerItems = map.objects[0].objects; // This is an array of game objects

    // loop through objects... check for interactive zones && create zones for them
    // and add properties to that zone
    objectLayerItems.forEach(obj => {
      console.log('Obj ', obj);
      const interactiveZoneIndex = obj.properties.findIndex(property => {
        return property.name === 'interactive' && property.value;
      });
      const isInteractiveZone = interactiveZoneIndex === 0;
      console.log('isInteractiveZone! ', isInteractiveZone);
      // new InteractiveZone(this, obj.x, obj.y, obj.properties);
      // obj.properties.find(isZone => {});
    });
  }

  update() {
    player.update();
    // if (keys.p.isDown) {
    //   this.scene.start('GameScene');
    // }
  }

  didOverlap() {
    console.log('Did overlap!');
  }
}
