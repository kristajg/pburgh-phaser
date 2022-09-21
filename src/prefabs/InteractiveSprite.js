import Phaser from 'phaser';

// Animations
import { createInteractiveObjectAnims } from '../anims/interactiveObjectAnims';

export default class InteractiveSprite extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, textureKey, isInteracting){
    super(scene, x, y, textureKey);

    this.scene = scene;
    let { anims } = this.scene;

    this.textureKey = textureKey;
    this.scene.add.existing(this);
    this.scene.physics.world.enableBody(this, 0); // what is this? do i need it?

    // Initialize animations
    createInteractiveObjectAnims(anims, textureKey, 'sample-computer-anim');
  }

  update() {
    const { anims, isInteracting } = this;
    console.log('is interacting? ', isInteracting);
    // if (isInteracting) {
      anims.play('sample-computer-anim', true);
    // }
  }
}