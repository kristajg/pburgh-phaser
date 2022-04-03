import Phaser from 'phaser';

// Animations
import { createPlayerAnims } from '../anims/playerAnims';
import { createToastAnims } from '../anims/itemAnims';

let player;
let carl;
// let toasts;
let isTouching = false;

// Dialoguebox 
const sampleText = 'hey there my guy';
const COLOR_PRIMARY = 0x352b42;
const COLOR_LIGHT = 0xb8b5b9;
const COLOR_DARK = 0x260e04;

class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene')
  }

  preload() {
    // Custom variables
    this.cursors;
    this.keys;

    this.load.scenePlugin({
      key: 'rexuiplugin',
      url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
      sceneKey: 'rexUI',
    });
  }

  create() {
    // Tilemaps
    const map = this.make.tilemap({ key: 'myDungeon' });
    const tileset = map.addTilesetImage('myDungeon', 'tiles');

    map.createLayer('below', tileset);
    const worldLayer = map.createLayer('worldLayer', tileset);

    worldLayer.setCollisionByProperty({ collides: true });

    // Initialize keys
    const { LEFT, RIGHT, UP, DOWN, W, A, S, D } = Phaser.Input.Keyboard.KeyCodes;
    this.keys = this.input.keyboard.addKeys({
      left: LEFT,
      right: RIGHT,
      up: UP,
      down: DOWN,
      w: W,
      a: A,
      s: S,
      d: D,
    });

    // Initialize animations
    createPlayerAnims(this.anims);
    createToastAnims(this.anims);
  
    // Add test NPC
    carl = this.physics.add.staticSprite(230, 100, 'carl');

    // Player
    player = this.physics.add.sprite(200, 120, 'pigeon');
    this.physics.add.collider(player, worldLayer);
    this.physics.add.collider(player, carl, this.talkToNPC, null, this);
    this.cameras.main.startFollow(player, true);

    // Cursors
    this.cursors = this.input.keyboard.createCursorKeys();

    // Bonus items
    // toasts = this.physics.add.staticGroup();
    // toasts.create(280, 200, 'toast');
    // Play toast animation by default
    // toasts.playAnimation({ key: 'toastSpin' });
  }

  update() {
    const { keys } = this;
    const speed = 120;
    player.body.setVelocity(0);

    // Player movement
    if (keys.left.isDown || keys.a.isDown) {
      player.body.setVelocityX(-speed);
    } else if (keys.right.isDown || keys.d.isDown) {
      player.body.setVelocityX(speed);
    }

    if (keys.up.isDown || keys.w.isDown) {
      player.body.setVelocityY(-speed);
    } else if (keys.down.isDown || keys.s.isDown) {
      player.body.setVelocityY(speed);
    }

    player.body.velocity.normalize().scale(speed);

    // Player animations
    if (keys.up.isDown || keys.w.isDown) {
      player.anims.play('player-up', true);
    } else if (keys.down.isDown || keys.s.isDown) {
      player.anims.play('player-down', true);
    } else if (keys.left.isDown || keys.a.isDown) {
      player.anims.play('player-left', true);
    } else if (keys.right.isDown || keys.d.isDown) {
      player.anims.play('player-right', true);
    } else {
      player.anims.stop();
    }

    // TODO: close dialoguebox when player is not colliding with NPC
    if(isTouching) {
      console.log('Player is colliding with NPC')
    }
    isTouching = false;
    this.closeDialogueBox();
  }

  talkToNPC(player, item) {
    isTouching = true;
    this.openDialogueBox();
  }

  openDialogueBox() {
    // Add a textbox
    createTextBox(this, 50, 150, {
      wrapWidth: 200,
      fixedWidth: 200,
      fixedHeight: 35,
    })
    .start(sampleText, 20);
  }

  closeDialogueBox() {
    // TODO: remove rexui textbox here
  }

  // collectItem (player, item) {
  //   console.log('item is ', item);
  //   item.disableBody(true, true);
  //   score += 10;
  //   scoreText.setText(`Score is: ${score}`);
  // }
}

// ATTN: The following is code copied from rexui's demo example
const GetValue = Phaser.Utils.Objects.GetValue;
const createTextBox = (scene, x, y, config) => {
  var wrapWidth = GetValue(config, 'wrapWidth', 0);
  var fixedWidth = GetValue(config, 'fixedWidth', 0);
  var fixedHeight = GetValue(config, 'fixedHeight', 0);

  var textBox = scene.rexUI.add.textBox({
    x: x,
    y: y,

    background: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 20, COLOR_PRIMARY)
      .setStrokeStyle(2, COLOR_LIGHT),

    // icon: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 20, COLOR_DARK),

    // text: getBuiltInText(scene, wrapWidth, fixedWidth, fixedHeight),
    text: getBBcodeText(scene, wrapWidth, fixedWidth, fixedHeight),

    action: scene.add.image(0, 0, 'nextPage').setTint(COLOR_LIGHT).setVisible(false),

    space: {
      left: 20,
      right: 20,
      top: 20,
      bottom: 20,
      icon: 10,
      text: 10,
    }
  })
  .setOrigin(0)
  .layout();

  textBox
    .setInteractive()
    .on('pointerdown', function () {
      var icon = this.getElement('action').setVisible(false);
      this.resetChildVisibleState(icon);
      if (this.isTyping) {
        this.stop(true);
      } else {
        this.typeNextPage();
      }
    }, textBox)
    .on('pageend', function () {
      if (this.isLastPage) {
        return;
      }

      var icon = this.getElement('action').setVisible(true);
      this.resetChildVisibleState(icon);
      icon.y -= 30;
      var tween = scene.tweens.add({
        targets: icon,
        y: '+=30', // '+=100'
        ease: 'Bounce', // 'Cubic', 'Elastic', 'Bounce', 'Back'
        duration: 500,
        repeat: 0, // -1: infinity
        yoyo: false
      });
    }, textBox)
  //.on('type', function () {
  //})

  return textBox;
}

// const getBuiltInText = function (scene, wrapWidth, fixedWidth, fixedHeight) {
//   return scene.add.text(0, 0, '', {
//     fontSize: '20px',
//     wordWrap: {
//       width: wrapWidth
//     },
//     maxLines: 3
//   })
//   .setFixedSize(fixedWidth, fixedHeight);
// }

const getBBcodeText = (scene, wrapWidth, fixedWidth, fixedHeight) => {
  return scene.rexUI.add.BBCodeText(0, 0, '', {
    fixedWidth: fixedWidth,
    fixedHeight: fixedHeight,
    fontSize: '14px',
    wrap: {
      mode: 'word',
      width: wrapWidth
    },
    maxLines: 3,
  })
}

export default GameScene;
