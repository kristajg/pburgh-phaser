import Phaser from 'phaser';
import Preloader from '../scripts/Preloader';
import Game from '../scripts/GameScene';

export const config = {
  type: Phaser.AUTO,
  parent: 'thegame', // ID of dom element to add canvas to
  width: 400,
  height: 250,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 }, // Top down doesn't need gravity
      // debug: false,
    },
  },
  scale: {
    zoom: 3,
  },
  scene:  [ Preloader, Game ],
};
