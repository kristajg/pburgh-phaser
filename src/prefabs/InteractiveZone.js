import Phaser from 'phaser';

export default class InteractiveZone extends Phaser.GameObjects.Zone {
  constructor(scene, x, y, textureKey, properties){ // type could be with NPC or inanimate object, etc
    super(scene, x, y, textureKey);

    this.scene = scene;
    this.textureKey = textureKey;
    this.scene.add.existing(this);

    console.log('properties...', properties);
  }

}