export const createSnowAnimations = function (context) {
  context.anims.create({
    key: "snow-idle",
    frameRate: 30,
    repeat: -1,
    frames: context.anims.generateFrameNumbers("snow", {
      start: 0,
      end: 53,
    }),
  });

  context.anims.create({
    key: "snow-landing",
    frameRate: 30,
    frames: context.anims.generateFrameNumbers("snow", {
      start: 54,
      end: 73,
    }),
  });

  context.anims.create({
    key: "snow-jump",
    frameRate: 60,
    frames: context.anims.generateFrameNumbers("snow", {
      start: 74,
      end: 106,
    }),
  });
};
