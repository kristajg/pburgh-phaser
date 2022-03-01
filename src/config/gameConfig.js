import Phaser from 'phaser';
import playGame from '../scripts/GameScene';

export const config = {
  type: Phaser.AUTO,
  parent: 'thegame',
  width: 400,
  height: 320,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 }, // Top down doesn't need gravity
      // debug: false,
    },
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    parent: 'thegame',
  },
  pixelArt: true,
  scene: playGame,
};
