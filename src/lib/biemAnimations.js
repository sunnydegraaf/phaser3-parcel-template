export const createBiemAnimations = function (context) {
  context.anims.create({
    key: "biem!",
    frameRate: 30,
    repeat: 0,
    frames: context.anims.generateFrameNumbers("biem", {
      start: 0,
      end: 22,
    }),
  });
};
