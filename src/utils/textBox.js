import newStory from '../assets/text/newStory.json';

const textBoxWidth = 360;
const textBoxHeight = 95;

export const getTextDataFromFile = interactiveObj => {
  return newStory.storyline.find(obj => obj.interactiveName === interactiveObj);
}

export const getTextBoxCoordinates = scene => {
  const screenCenterX = scene.cameras.main.worldView.x + scene.cameras.main.width / 2;
  const screenCenterY = scene.cameras.main.worldView.y + scene.cameras.main.height / 2;
  const textBoxX = screenCenterX - 175;
  const textBoxY = screenCenterY - (textBoxHeight / 2) + 80;

  return { textBoxX, textBoxY };
}

export const createTextBox = (scene, text) => {
  const { textBoxX, textBoxY } = getTextBoxCoordinates(scene);

  // add background & text to scene
  const textBoxBackGround = scene.add.graphics();
  textBoxBackGround.fillStyle(0x413d64, 1);
  textBoxBackGround.lineStyle(1, 0xffffff, 1);
  textBoxBackGround.fillRoundedRect(textBoxX - 5, textBoxY - 5, textBoxWidth, textBoxHeight, 10);
  textBoxBackGround.strokeRoundedRect(textBoxX - 5, textBoxY - 5, textBoxWidth, textBoxHeight, 10);

  const textBoxContent = scene.add.bitmapText(textBoxX, textBoxY, 'arial', text, 16).setMaxWidth(340);
  const textBox = {
    textBoxBackGround,
    textBoxContent,
  };
  return textBox;
}

export const createSelectionOptions = (scene, optionData) => {
  const { textBoxX, textBoxY } = getTextBoxCoordinates(scene);
  let optionXCoordinate = textBoxX + 10;
  let optionYCoordinate = textBoxY + 25;
  const bitmapTextOptionList = [];

  optionData.forEach((option, i) => {
    let text = option.optionText;
    if (i===0) {
      // By default add cursor to first option
      text = `>> ${text}`;
    }
    bitmapTextOptionList.push(scene.add.bitmapText(optionXCoordinate, optionYCoordinate, 'arial', text, 16).setMaxWidth(340));
    optionYCoordinate = optionYCoordinate + 25;
  });

  // By default highlight first option
  bitmapTextOptionList[0].setTint(0xcbdbfc);
  return bitmapTextOptionList;
}

export const createTextContentList = interactiveObj => {
  const data = getTextDataFromFile(interactiveObj);
  const textContentList = data.content[0].mainText;
  if (data.hasSelection) {
    textContentList.push(data.content[1].selection);
  }
  return textContentList;
}
