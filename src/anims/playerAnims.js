const frameRate = 8;

export const createPlayerAnims = anims => {
  anims.create({
    key: 'player-left',
    frames: anims.generateFrameNumbers('pigeon', { start: 8, end: 11 }),
    frameRate,
    repeat: -1,
  });
  anims.create({
    key: 'player-right',
    frames: anims.generateFrameNumbers('pigeon', { start: 4, end: 7 }),
    frameRate,
    repeat: -1,
  });
  anims.create({
    key: 'player-up',
    frames: anims.generateFrameNumbers('pigeon', { start: 16, end: 19 }),
    frameRate,
    repeat: -1,
  });
  anims.create({
    key: 'player-down',
    frames: anims.generateFrameNumbers('pigeon', { start: 12, end: 15 }),
    frameRate,
    repeat: -1,
  });
};
