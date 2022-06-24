import Phaser from 'phaser';

export const isKeyPressedOnce = key => {
  return Phaser.Input.Keyboard.JustDown(key);
}