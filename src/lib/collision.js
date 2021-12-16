const obstacles = ["dumpster", "snowman", "popo", "kados"];

export const collision = function (context, bodyA, bodyB) {
  //collider player - slope
  if (
    (bodyA.label == "player" &&
      bodyB.label == "slope" &&
      context.playerTouchingGround == false) ||
    (bodyB.label == "player" &&
      bodyA.label == "slope" &&
      context.playerTouchingGround == false)
  ) {
    context.playerTouchingGround = true;
    context.jumps = 0;
    context.snow.play("snow-landing");
  }

  obstacles.forEach((obstacle) => {
    if (
      (bodyA.label == "player" &&
        bodyB.label == obstacle &&
        context.playerIsInvincible == false) ||
      (bodyB.label == "player" &&
        bodyA.label == obstacle &&
        context.playerIsInvincible == false)
    ) {
      context.player.body.collisionFilter = {
        group: 1,
        category: 2,
        mask: 0,
      };

      context.slope.body.collisionFilter = {
        group: 1,
        category: 2,
        mask: 0,
      };
      context.crashSound.play();
      // context.player.setPosition(400, 400);
      context.handleHealth();
      context.invincible();
    }
  });
};
