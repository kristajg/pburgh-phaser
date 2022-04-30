import Phaser from 'phaser';

const COLOR_PRIMARY = 0x352b42;
const COLOR_LIGHT = 0xb8b5b9;
const COLOR_DARK = 0x260e04;

const GetValue = Phaser.Utils.Objects.GetValue;

export const createTextBox = (scene, x, y, textBoxIsOpen, config) => {
  textBoxIsOpen = true;
  const wrapWidth = GetValue(config, 'wrapWidth', 0);
  const fixedWidth = GetValue(config, 'fixedWidth', 0);
  const fixedHeight = GetValue(config, 'fixedHeight', 0);
  var textBox = scene.rexUI.add.textBox({
      x,
      y,

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
        // icon: 10,
        text: 10,
      }
    })
    .setOrigin(0)
    .layout();

  textBox
    .setInteractive()
    .on('pointerdown', function () {
      let icon = this.getElement('action').setVisible(false);
      this.resetChildVisibleState(icon);
      if (this.isTyping) {
        this.stop(true);
      } else {
        this.typeNextPage();
      }
    }, textBox)
    .on('pageend', function () {
      if (this.isLastPage) return;

      let icon = this.getElement('action').setVisible(true);
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

const getBBcodeText = (scene, wrapWidth, fixedWidth, fixedHeight) => {
  return scene.rexUI.add.BBCodeText(0, 0, '', {
    fixedWidth,
    fixedHeight,
    fontSize: '14px',
    wrap: {
      mode: 'word',
      width: wrapWidth
    },
    maxLines: 3,
  });
}