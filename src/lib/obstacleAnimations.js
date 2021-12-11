export const createObstacleAnimations = function (context) {
  context.anims.create({
    key: "dumpster",
    frameRate: 30,
    repeat: -1,
    frames: context.anims.generateFrameNumbers("dumpster", {
      start: 0,
      end: 14,
    }),
  });

  context.anims.create({
    key: "snowman",
    frameRate: 30,
    repeat: -1,
    frames: context.anims.generateFrameNumbers("snowman", {
      start: 0,
      end: 15,
    }),
  });

  context.anims.create({
    key: "popo",
    frameRate: 30,
    repeat: -1,
    frames: context.anims.generateFrameNumbers("popo", {
      start: 0,
      end: 15,
    }),
  });
};
