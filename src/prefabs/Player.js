import Phaser from 'phaser';

// Animations
import { createPlayerAnims } from '../anims/playerAnims';

// TODO:
// Handle NPC dialog, from any scene
// Add stats: Mood, Money, Relationship Status w/each char

export default class Player extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, textureKey, type){
    super(scene, x, y, textureKey);

    this.scene = scene;
    let { anims, input } = this.scene;

    this.textureKey = textureKey;
    this.scene.add.existing(this);
    this.scene.physics.world.enableBody(this, 0);

    // Initialize keys
    const { LEFT, RIGHT, UP, DOWN, ENTER, ESC, W, A, S, D, P } = Phaser.Input.Keyboard.KeyCodes;
    this.keys = input.keyboard.addKeys({
      left: LEFT,
      right: RIGHT,
      up: UP,
      down: DOWN,
      enter: ENTER,
      esc: ESC,
      w: W,
      a: A,
      s: S,
      d: D,
      p: P,
    });

    // Initialize animations
    createPlayerAnims(anims);
  }

  update() {
    const { anims, keys } = this;
    const speed = 120;
    this.body.setVelocity(0);

    // Player movement
    if (keys.left.isDown || keys.a.isDown) {
      this.body.setVelocityX(-speed);
    } else if (keys.right.isDown || keys.d.isDown) {
      this.body.setVelocityX(speed);
    }

    if (keys.up.isDown || keys.w.isDown) {
      this.body.setVelocityY(-speed);
    } else if (keys.down.isDown || keys.s.isDown) {
      this.body.setVelocityY(speed);
    }

    this.body.velocity.normalize().scale(speed);

    // Player animations
    if (keys.up.isDown || keys.w.isDown) {
      anims.play('player-up', true);
    } else if (keys.down.isDown || keys.s.isDown) {
      anims.play('player-down', true);
    } else if (keys.left.isDown || keys.a.isDown) {
      anims.play('player-left', true);
    } else if (keys.right.isDown || keys.d.isDown) {
      anims.play('player-right', true);
    } else {
      anims.stop();
    }
  }
}