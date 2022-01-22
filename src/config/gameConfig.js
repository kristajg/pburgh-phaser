import Phaser from 'phaser';
import playGame from '../scripts/GameScene';

export const config = {
  type: Phaser.AUTO,
  parent: 'thegame',
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
  scene: playGame,
};
