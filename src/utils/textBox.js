import Phaser from 'phaser';
import newStory from '../assets/text/newStory.json';
// import eventsCenter from '../prefabs/EventsCenter';

const MAX_CHARS_PER_PAGE = 175;


const getTextFromFile = interactiveObjectName => {
  const data = newStory.storyline;
  const storyData = data.find(obj => {
    return obj.interactiveName === interactiveObjectName;
  });
  return storyData.content;
}

// could have different "types" of text box
// description / interaction
// dialog with character
// TODO: 
// 1. show only certain amount of chars per "page"
// 2. update page advance with enter press
// 3. add next arrow and last X to indicate final screen
// 4. Add choice boxes: buttons
// 5. make it fancy: style input to appear "typing"
// 6. group objects? background & content? or put destroy textbox as it's own util
export const createCoolTextBox = (scene, interactiveObjectName) => {
  // Setup textbox placement & size
  const screenCenterX = scene.cameras.main.worldView.x + scene.cameras.main.width / 2;
  const screenCenterY = scene.cameras.main.worldView.y + scene.cameras.main.height / 2;
  const canvasWidth = scene.scale.width;
  const textBoxWidth = canvasWidth - 42; // Add 20 px of spacing on each side
  const textBoxHeight = 100;
  const textBoxX = screenCenterX - 170;
  const textBoxY = screenCenterY - (textBoxHeight / 2) + 10;

  // Get correct text
  // now, text will be an array of strings
  let text = getTextFromFile(interactiveObjectName);
  // temporarily taking first string from the array of content until i build pagination
  let tempText = text[0];

  let textBoxBackGround = scene.add.rectangle(screenCenterX, screenCenterY, textBoxWidth, textBoxHeight, 0x3f3f74).setStrokeStyle(1, 0xffffff);
  let textBoxContent = scene.add.bitmapText(textBoxX, textBoxY, 'arial', tempText, 16).setMaxWidth(340);
}

export const updateTextPage = (scene, textBox) => {
  // Next page
  // Is last page
  scene.textBox.text = '';
}

export const destroyTextBox = () => {}



const COLOR_PRIMARY = 0x3f3f74;
const COLOR_LIGHT = 0xffffff;
const COLOR_DARK = 0x260e04;

const GetValue = Phaser.Utils.Objects.GetValue;

export const createTextBox = (scene, x, y, config) => {
  const wrapWidth = GetValue(config, 'wrapWidth', 0);
  const fixedWidth = GetValue(config, 'fixedWidth', 0);
  const fixedHeight = GetValue(config, 'fixedHeight', 0);

  let textBox = scene.rexUI.add.textBox({
      x,
      y,

      background: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 20, COLOR_PRIMARY)
        .setStrokeStyle(2, COLOR_LIGHT),
      // icon: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 20, COLOR_DARK),
      text: getBuiltInText(scene, wrapWidth, fixedWidth, fixedHeight),
      // text: scene.add.bitmapText(0, 0, 'arial').setFontSize(16).setMaxWidth(wrapWidth),
      // text: getBBcodeText(scene, wrapWidth, fixedWidth, fixedHeight),

      action: scene.add.image(0, 0, 'nextPage').setTint(COLOR_LIGHT).setVisible(false),

      space: {
        left: 20,
        right: 20,
        top: 10,
        bottom: 10,
        icon: 0,
        text: 10,
      }
    })
    .setOrigin(0)
    .layout();

  textBox
    .setInteractive()
    .on('pointerdown', function () {
      // let icon = this.getElement('action').setVisible(false);
      // this.resetChildVisibleState(icon);
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
      let tween = scene.tweens.add({
        targets: icon,
        y: '+=30', // '+=100'
        ease: 'Bounce', // 'Cubic', 'Elastic', 'Bounce', 'Back'
        duration: 500,
        repeat: 0, // -1: infinity
        yoyo: false
      });
    }, textBox)
    .on('complete', function() {
      console.log('Done with text!!');
      // Show end of dialog icon
      // Emit event that end of dialog was reached
    }, textBox);

  return textBox;
}

var getBuiltInText = (scene, wrapWidth, fixedWidth, fixedHeight) => {
  return scene.add.text(0, 0, '', {
      fontSize: '16px',
      wordWrap: {
        width: wrapWidth
      },
      maxLines: 3
    })
    // .setFixedSize(fixedWidth, fixedHeight);
}

const getBBcodeText = (scene, wrapWidth, fixedWidth, fixedHeight) => {
  return scene.rexUI.add.BBCodeText(0, 0, '', {
    fixedWidth,
    fixedHeight,
    fontSize: '18px',
    wrap: {
      mode: 'word',
      width: wrapWidth,
    },
    maxLines: 3,
  });
}