export const createPlayerAnimations = function (context) {
  context.anims.create({
    key: "sled_0",
    frameRate: 30,
    repeat: -1,
    frames: context.anims.generateFrameNumbers("player0", {
      start: 0,
      end: 30,
    }),
  });

  context.anims.create({
    key: "sled-jump_0",
    frameRate: 30,
    repeat: -1,
    frames: context.anims.generateFrameNumbers("player0", {
      start: 31,
      end: 83,
    }),
  });

  context.anims.create({
    key: "sled_1",
    frameRate: 30,
    repeat: -1,
    frames: context.anims.generateFrameNumbers("player", {
      start: 0,
      end: 30,
    }),
  });

  context.anims.create({
    key: "sled-jump_1",
    frameRate: 30,
    frames: context.anims.generateFrameNumbers("player", {
      start: 31,
      end: 83,
    }),
  });

  context.anims.create({
    key: "sled-jump_Double_1",
    frameRate: 25,
    frames: context.anims.generateFrameNumbers("player", {
      start: 51,
      end: 83,
    }),
  });

  context.anims.create({
    key: "sled_2",
    frameRate: 30,
    repeat: -1,
    frames: context.anims.generateFrameNumbers("player2", {
      start: 0,
      end: 30,
    }),
  });

  context.anims.create({
    key: "sled-jump_2",
    frameRate: 30,
    frames: context.anims.generateFrameNumbers("player2", {
      start: 30,
      end: 83,
    }),
  });

  context.anims.create({
    key: "sled-jump_Double_2",
    frameRate: 25,
    frames: context.anims.generateFrameNumbers("player2", {
      start: 51,
      end: 83,
    }),
  });

  context.anims.create({
    key: "sled_3",
    frameRate: 30,
    repeat: -1,
    frames: context.anims.generateFrameNumbers("player3", {
      start: 0,
      end: 30,
    }),
  });

  context.anims.create({
    key: "sled-jump_3",
    frameRate: 30,
    frames: context.anims.generateFrameNumbers("player3", {
      start: 30,
      end: 83,
    }),
  });

  context.anims.create({
    key: "sled-jump_Double_3",
    frameRate: 25,
    frames: context.anims.generateFrameNumbers("player3", {
      start: 51,
      end: 83,
    }),
  });

  context.anims.create({
    key: "sled_4",
    frameRate: 30,
    repeat: -1,
    frames: context.anims.generateFrameNumbers("player4", {
      start: 0,
      end: 30,
    }),
  });

  context.anims.create({
    key: "sled-jump_4",
    frameRate: 30,
    frames: context.anims.generateFrameNumbers("player4", {
      start: 30,
      end: 83,
    }),
  });

  context.anims.create({
    key: "sled-jump_Double_4",
    frameRate: 25,
    frames: context.anims.generateFrameNumbers("player4", {
      start: 51,
      end: 83,
    }),
  });
};
