export const createInteractiveObjectAnims = (anims, textureKey, objectAnimKey) => {
  anims.create({
    key: objectAnimKey,
    frames: anims.generateFrameNumbers(textureKey, { start: 0, end: 1 }),
    frameRate: 10,
    repeat: 1,
  });
};
