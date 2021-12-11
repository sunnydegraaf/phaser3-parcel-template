let gameOptions = {
  spawnRange: [900, 2000],
};

const obstacles = [
  {
    id: "dumpster",
    posY: 776,
    shapeCache: "dumpster_shapes",
    shape: "Vuilcontainer_00000",
  },
  {
    id: "snowman",
    posY: 790,
    shapeCache: "snowman_shapes",
    shape: "SNEEUWPOP_00000",
  },
  {
    id: "popo",
    posY: 795,
    shapeCache: "popo_shapes",
    shape: "POPO_00000",
  },
];

export const addPlatform = function (context, posX) {
  let platform;

  const randomObstacle = obstacles[Phaser.Math.Between(0, 2)];

  const shape = context.cache.json.get(randomObstacle.shapeCache);

  if (false) {
    platform = context.platformPool.getFirst();

    platform.play(randomObstacle.id);

    platform.x = posX;
    platform.y = randomObstacle.posY;
    platform.setBody = shape[randomObstacle.shape];
    platform.label = randomObstacle.id;

    platform.active = true;
    platform.visible = true;
    context.platformPool.remove(platform);
  } else {
    platform = context.matter.add
      .sprite(posX, randomObstacle.posY, randomObstacle.id, null, {
        isStatic: true,
        label: randomObstacle.id,
        shape: shape[randomObstacle.shape],
        isSensor: true,
      })
      .setAngle(randomObstacle.id === "snowman" ? 13 : 12)
      .setScale(1, 1);
    platform.play(randomObstacle.id);

    platform.setSensor(true);
    context.platformGroup.add(platform);
  }

  context.nextPlatformDistance = Phaser.Math.Between(
    gameOptions.spawnRange[0],
    gameOptions.spawnRange[1]
  );
};
