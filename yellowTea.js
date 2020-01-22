function yellowTea(game) {
    this.animationWalkLeft = new Animation(AM.getAsset("./img/yellowTea.png")
    , 0, 0, 65, 95, 4, 0.20, 4, true, 1, false);
    this.animationRunLeft = new Animation(AM.getAsset("./img/yellowTea.png")
    , 0, 100, 71, 83, 5, 0.18, 5, true, 1, false);
    this.animationWalkRight = new Animation(AM.getAsset("./img/yellowTeaFlip.png")
    , 830, 0, 65, 95, 4, 0.20, 4, true, 1, true);
    this.animationRunRight = new Animation(AM.getAsset("./img/yellowTeaFlip.png")
    , 730, 100, 71, 83, 5, 0.18, 5, true, 1, true);
    this.animationWalkUpLookRight = new Animation(AM.getAsset("./img/yellowTeaFlip.png")
    , 830, 0, 65, 95, 4, 0.20, 4, true, 1, true);
    this.animationRunUpLookRight = new Animation(AM.getAsset("./img/yellowTeaFlip.png")
    , 730, 100, 71, 83, 5, 0.18, 5, true, 1, true);
    this.animationWalkUpLookLeft = new Animation(AM.getAsset("./img/yellowTea.png")
    , 0, 0, 65, 95, 4, 0.20, 4, true, 1, false);
    this.animationRunUpLookLeft= new Animation(AM.getAsset("./img/yellowTea.png")
    , 0, 100, 71, 83, 5, 0.18, 5, true, 1, false);
    this.animationWalkDownLookRight = new Animation(AM.getAsset("./img/yellowTeaFlip.png")
    , 830, 0, 65, 95, 4, 0.20, 4, true, 1, true);
    this.animationRunDownLookRight = new Animation(AM.getAsset("./img/yellowTeaFlip.png")
    , 730, 100, 71, 83, 5, 0.18, 5, true, 1, true);
    this.animationWalkDownLookLeft = new Animation(AM.getAsset("./img/yellowTea.png")
    , 0, 0, 65, 95, 4, 0.20, 4, true, 1, false);
    this.animationRunDownLookLeft = new Animation(AM.getAsset("./img/yellowTea.png")
    , 0, 100, 71, 83, 5, 0.18, 5, true, 1, false);
    this.animationDisappearRight = new Animation(AM.getAsset("./img/yellowTeaFlip.png")
    , 635, 530, 75, 85, 6, 0.18, 6, true, 1, true);
    this.animationDisappearLeft = new Animation(AM.getAsset("./img/yellowTea.png")
    , -3, 534, 75, 85, 6, 0.18, 6, true, 1, false);
    this.x = 200;
    this.y = 200;
    this.walkSpeed = 100;
    this.runSpeed = 200;
    this.game = game;
    this.ctx = game.ctx;
    this.moveDirection = 1; //1 is right, down, left, up
    this.lookDirectionRight = false;
    this.paceWalk = true;
    this.hp = 10;
}

yellowTea.prototype.draw = function () {
    if (this.hp <= 0) {
        if (this.lookDirectionRight) {
            this.animationDisappearRight.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
        } else {
            this.animationDisappearLeft.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
        }
    } else if (this.paceWalk) {
        if (this.moveDirection == 1) {
            this.animationWalkRight.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
        } else if (this.moveDirection == 2) {
            if (this.lookDirectionRight) {
                // console.log("a");
                this.animationWalkDownLookRight.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
            } else {
                this.animationWalkDownLookLeft.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
            }
        } else if (this.moveDirection == 3) {
            this.animationWalkLeft.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
        } else {
            if (this.lookDirectionRight) {
                this.animationWalkUpLookRight.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
            } else {
                this.animationWalkUpLookLeft.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
            }
        }
    } else {
        if (this.moveDirection == 1) {
            this.animationRunRight.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
        } else if (this.moveDirection == 2) {
            if (this.lookDirectionRight) {
                this.animationRunDownLookRight.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
            } else {
                this.animationRunDownLookLeft.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
            }
        } else if (this.moveDirection == 3) {
            this.animationRunLeft.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
        } else {
            if (this.lookDirectionRight) {
                this.animationRunUpLookRight.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
            } else {
                this.animationRunUpLookLeft.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
            }
        }
    }
}

yellowTea.prototype.update = function () {
    //update moveDirection, lookDirection, pace
    if (this.game.space) this.moveDirection++;
    if (this.moveDirection == 5) this.moveDirection = 1;
    if (this.game.right) {
        this.moveDirection = 1;
        this.lookDirectionRight = true;
    }
    if (this.game.down) this.moveDirection = 2;
    if (this.game.left) {
        this.moveDirection = 3;
        this.lookDirectionRight = false;
    }
    if (this.game.up) this.moveDirection = 4;
    if (this.game.run) this.paceWalk = !this.paceWalk;
    if (this.hp > 0) {
        if (this.paceWalk) {
            if (this.moveDirection == 1) {
                if (this.animationWalkRight.elapsedTime < this.animationWalkRight.totalTime * 8 / 14)
                    this.x += this.game.clockTick * this.walkSpeed;
            } else if (this.moveDirection == 2) {
                if (this.lookDirectionRight) {
                    if (this.animationWalkDownLookRight.elapsedTime < this.animationWalkDownLookRight.totalTime * 8 / 14)
                        this.y += this.game.clockTick * this.walkSpeed;
                } else {
                    if (this.animationWalkDownLookLeft.elapsedTime < this.animationWalkDownLookLeft.totalTime * 8 / 14)
                        this.y += this.game.clockTick * this.walkSpeed;
                }
            } else if (this.moveDirection == 3) {
                if (this.animationWalkLeft.elapsedTime < this.animationWalkLeft.totalTime * 8 / 14)
                    this.x -= this.game.clockTick * this.walkSpeed;
            } else {
                if (this.lookDirectionRight) {
                    if (this.animationWalkUpLookRight.elapsedTime < this.animationWalkUpLookRight.totalTime * 8 / 14)
                        this.y -= this.game.clockTick * this.walkSpeed;
                } else {
                    if (this.animationWalkUpLookLeft.elapsedTime < this.animationWalkUpLookLeft.totalTime * 8 / 14)
                        this.y -= this.game.clockTick * this.walkSpeed;
                }
            }
        } else {
            if (this.moveDirection == 1) {
                if (this.animationRunRight.elapsedTime < this.animationRunRight.totalTime * 8 / 14)
                    this.x += this.game.clockTick * this.runSpeed;
            } else if (this.moveDirection == 2) {
                if (this.lookDirectionRight) {
                    if (this.animationRunDownLookRight.elapsedTime < this.animationRunDownLookRight.totalTime * 8 / 14)
                        this.y += this.game.clockTick * this.runSpeed;
                } else {
                    if (this.animationRunDownLookLeft.elapsedTime < this.animationRunDownLookLeft.totalTime * 8 / 14)
                        this.y += this.game.clockTick * this.runSpeed;
                }
            } else if (this.moveDirection == 3) {
                if (this.animationRunLeft.elapsedTime < this.animationRunLeft.totalTime * 8 / 14)
                    this.x -= this.game.clockTick * this.runSpeed;
            } else {
                if (this.lookDirectionRight) {
                    if (this.animationRunUpLookRight.elapsedTime < this.animationRunUpLookRight.totalTime * 8 / 14)
                        this.y -= this.game.clockTick * this.runSpeed;
                } else {
                    if (this.animationRunUpLookLeft.elapsedTime < this.animationRunUpLookLeft.totalTime * 8 / 14)
                        this.y -= this.game.clockTick * this.runSpeed;
                }
            }
        }
    }
}