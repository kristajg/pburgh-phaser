import Phaser from 'phaser';
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';

import Preloader from '../scenes/Preloader';
import Game from '../scenes/GameScene';
import PipsHouse from '../scenes/PipsHouse';
// import NeighborhoodOne from '../scenes/NeighborhoodOne';

export const config = {
  type: Phaser.AUTO,
  parent: 'thegame',
  width: 400,
  height: 250,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 }, // Top down doesn't need gravity
      // debug: true,
    },
  },
  // scale: {
  //   zoom: 3,
  // },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  pixelArt: true,
  plugins: {
    scene: [{
      key: 'rexUI',
      plugin: RexUIPlugin,
      mapping: 'rexUI'
    }],
  },
  scene:  [ Preloader, Game, PipsHouse ],
};
