import Phaser from 'phaser';

// Prefabs
import Player from '../prefabs/Player';
import InteractiveScene from '../prefabs/InteractiveScene';

// Utils
import { placeZonesFromObjectLayer } from '../utils/zones';

let player;

export default class NeighborhoodTwo extends InteractiveScene {
  constructor(){
    super('NeighborhoodTwo')
    console.log('ok we are here ', this.testThing);
  }

  create(){
    // Tilemaps
    // const map = this.make.tilemap({ key: 'neighborhoodOneMap' });
    // const tileset = map.addTilesetImage('neighborhoodTileset', 'neighborhoodTiles');

    // // Below and world layers
    // map.createLayer('below', tileset);
    // const worldLayer = map.createLayer('worldLayer', tileset);
    // worldLayer.setCollisionByProperty({ collides: true });

    // // Player
    // player = new Player(this, 100, 120, 'pigeon');
    // this.physics.add.collider(player, worldLayer);
    // this.cameras.main.startFollow(player, true);

    // // Above tileset loaded after the player
    // const aboveLayer = map.createLayer('above', tileset);
    // aboveLayer.setCollisionByProperty({ collides: true });
    // this.physics.add.collider(player, aboveLayer);

    // // Tilemap object layer items
    // const objectLayerItems = map.objects[0].objects;
    // placeZonesFromObjectLayer(this, objectLayerItems, player);
  }

  update(){
    player.update();
  }
}
