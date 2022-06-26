import Phaser from 'phaser';
import newStory from '../assets/text/newStory.json';

export const getTextFromFile = interactiveObjectName => {
  const data = newStory.storyline;
  const storyData = data.find(obj => {
    return obj.interactiveName === interactiveObjectName;
  });
  return storyData.content;
}

export const createTextBox = (scene, interactiveObjectName, startingText) => {
  // Setup textbox placement & size
  const screenCenterX = scene.cameras.main.worldView.x + scene.cameras.main.width / 2;
  const screenCenterY = scene.cameras.main.worldView.y + scene.cameras.main.height / 2;
  const canvasWidth = scene.scale.width;
  const textBoxWidth = canvasWidth - 42; // Add 20 px of spacing on each side
  const textBoxHeight = 100;
  const textBoxX = screenCenterX - 170;
  const textBoxY = screenCenterY - (textBoxHeight / 2) + 10;

  // add background & text to scene
  const textBoxBackGround = scene.add.rectangle(screenCenterX, screenCenterY, textBoxWidth, textBoxHeight, 0x3f3f74).setStrokeStyle(1, 0xffffff);
  const textBoxContent = scene.add.bitmapText(textBoxX, textBoxY, 'arial', startingText, 16).setMaxWidth(340);
  const textBox = {
    textBoxBackGround,
    textBoxContent,
  };
  return textBox;
}
