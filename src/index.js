import Phaser from 'phaser';
import {config} from './config/gameConfig';

window.addEventListener('load', () => {
  console.log('game loaded');
  const game = new Phaser.Game(config);
});

console.log('its up!!');
