import Phaser from 'phaser';
import gameConfig from './config/gameConfig';

window.addEventListener('load', () => {
  const game = new Phaser.Game(gameConfig);
});

console.log('its up~~');
