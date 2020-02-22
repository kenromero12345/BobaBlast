function watermelon(game, spawnX, spawnY, scale) {
    this.lifeDeduction = 10;
    this.name = "watermelon";
    this.speed = 100;
    this.hp = 50;//
    this.money = 50;
    this.animationWalkLeft = new Animation(AM.getAsset("./img/watermelon.png")
    , 0, 82, 62, 68, 4, .135, 4, true, scale, false);
    this.animationDisappearLeft = new Animation(AM.getAsset("./img/watermelon.png")
    , 0, 245, 62, 74, 14, .25, 14, false, scale, false);
    this.animationWalkRight = new Animation(AM.getAsset("./img/watermelonFlip.png")
    , 1394, 82, -62, 68, 4, .135, 4, true, scale, false);
    this.animationDisappearRight = new Animation(AM.getAsset("./img/watermelonFlip.png")
    , 1394, 245, -62, 74, 14, .25, 14, false, scale, false);
    enemyConstructor(this, scale, spawnX, spawnY, this.animationWalkLeft.frameWidth
        , this.animationWalkLeft.frameHeight, game, this.speed);
        //                                           this.moveDirection = 3;
        // this.lookDirectionRight = false;
}

watermelon.prototype.setBoundingBox = function() {
    if (this.lookDirectionRight || this.moveDirection == 1 ) {
        this.boundingbox = new BoundingBox(this.x + 8 * this.scale, this.y + 16 * this.scale
            , this.width - 22 * this.scale , this.height -28 * this.scale);
    } else {
        this.boundingbox = new BoundingBox(this.x + 13 * this.scale, this.y + 16 * this.scale
            , this.width - 22 * this.scale , this.height -28 * this.scale);
    }
}

watermelon.prototype.draw = function () {
    if(this.game.running) {
        if (this.hp <= 0) {
            if (this.lookDirectionRight) {
                if (this.animationDisappearRight.currentFrame() == 1) {
                    this.animationDisappearRight.startX = 1394-2;
                    this.animationDisappearRight.frameWidth = -70;
                } else if (this.animationDisappearRight.currentFrame() == 2) {
                    this.animationDisappearRight.startX = 1394-6;
                    this.animationDisappearRight.frameWidth = -72;
                } else if (this.animationDisappearRight.currentFrame() == 3) {
                    this.animationDisappearRight.startX = 1394-12;
                    this.animationDisappearRight.frameWidth = -72;
                } else if (this.animationDisappearRight.currentFrame() == 4) {
                    this.animationDisappearRight.offsetX = -5;
                    this.animationDisappearRight.startX = 1394+12;
                    this.animationDisappearRight.frameWidth = -82;
                } else if (this.animationDisappearRight.currentFrame() == 5) {
                    this.animationDisappearRight.offsetX = -5;
                    this.animationDisappearRight.startX = 1394-18;
                    this.animationDisappearRight.frameWidth = -78;
                } else if (this.animationDisappearRight.currentFrame() == 6) {
                    this.animationDisappearRight.offsetX = -6;
                    this.animationDisappearRight.startX = 1394-20;
                    this.animationDisappearRight.frameWidth = -77;
                } else if (this.animationDisappearRight.currentFrame() == 7) {
                    this.animationDisappearRight.startX = 1394-6-1;
                    this.animationDisappearRight.frameWidth = -78;
                } else if (this.animationDisappearRight.currentFrame() == 8) {
                    this.animationDisappearRight.offsetX = -17;
                    this.animationDisappearRight.startX = 1394+120;
                    this.animationDisappearRight.frameWidth = -95;
                } else if (this.animationDisappearRight.currentFrame() == 9) {
                    this.animationDisappearRight.offsetX = -42;
                    this.animationDisappearRight.startX = 1394+522;
                    this.animationDisappearRight.frameWidth = -140;
                } else if (this.animationDisappearRight.currentFrame() == 10) {//todo: 
                    this.animationDisappearRight.offsetX = -58;
                    this.animationDisappearRight.startX = 1394+602;
                    this.animationDisappearRight.frameWidth = -150;
                } else if (this.animationDisappearRight.currentFrame() == 11) {
                    this.animationDisappearRight.offsetX = -30;
                    this.animationDisappearRight.startX = 1394+398;
                    this.animationDisappearRight.frameWidth = -130;
                } else if (this.animationDisappearRight.currentFrame() == 12) {
                    this.animationDisappearRight.offsetX = -35;
                    this.animationDisappearRight.startX = 1394+408-3;
                    this.animationDisappearRight.frameWidth = -130;
                } else if (this.animationDisappearRight.currentFrame() == 13) {
                    this.animationDisappearRight.offsetX = -41;
                    this.animationDisappearRight.startX = 1394+408;
                    this.animationDisappearRight.frameWidth = -130;
                } else {
                    this.animationDisappearRight.offsetX = 0;
                    this.animationDisappearRight.startX = 1394;
                    this.animationDisappearRight.frameWidth = -68;
                }
                this.animationDisappearRight.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
                if (this.animationDisappearRight.isDone()) {
                    this.removeFromWorld = true;
                }
            } else {
                if (this.animationDisappearLeft.currentFrame() == 1) {
                    this.animationDisappearLeft.startX = 2;
                    this.animationDisappearLeft.frameWidth = 70;
                } else if (this.animationDisappearLeft.currentFrame() == 2) {
                    this.animationDisappearLeft.startX = 6;
                    this.animationDisappearLeft.frameWidth = 72;
                } else if (this.animationDisappearLeft.currentFrame() == 3) {
                    this.animationDisappearLeft.startX = 12;
                    this.animationDisappearLeft.frameWidth = 72;
                } else if (this.animationDisappearLeft.currentFrame() == 4) {
                    this.animationDisappearLeft.offsetX = 5;
                    this.animationDisappearLeft.startX = -12;
                    this.animationDisappearLeft.frameWidth = 82;
                } else if (this.animationDisappearLeft.currentFrame() == 5) {
                    this.animationDisappearLeft.offsetX = 5;
                    this.animationDisappearLeft.startX = 18;
                    this.animationDisappearLeft.frameWidth = 78;
                } else if (this.animationDisappearLeft.currentFrame() == 6) {
                    this.animationDisappearLeft.offsetX = 6;
                    this.animationDisappearLeft.startX = 20;
                    this.animationDisappearLeft.frameWidth = 77;
                } else if (this.animationDisappearLeft.currentFrame() == 7) {
                    this.animationDisappearLeft.startX = 6;
                    this.animationDisappearLeft.frameWidth = 78;
                } else if (this.animationDisappearLeft.currentFrame() == 8) {
                    this.animationDisappearLeft.startX = -120;
                    this.animationDisappearLeft.frameWidth = 95;
                } else if (this.animationDisappearLeft.currentFrame() == 9) {
                    this.animationDisappearLeft.offsetX = -16;
                    this.animationDisappearLeft.startX = -522;
                    this.animationDisappearLeft.frameWidth = 140;
                } else if (this.animationDisappearLeft.currentFrame() == 10) {//todo: 
                    this.animationDisappearLeft.offsetX = -10;
                    this.animationDisappearLeft.startX = -602;
                    this.animationDisappearLeft.frameWidth = 150;
                } else if (this.animationDisappearLeft.currentFrame() == 11) {
                    this.animationDisappearLeft.offsetX = -14;
                    this.animationDisappearLeft.startX = -398;
                    this.animationDisappearLeft.frameWidth = 130;
                } else if (this.animationDisappearLeft.currentFrame() == 12) {
                    this.animationDisappearLeft.offsetX = -10;
                    this.animationDisappearLeft.startX = -408;
                    this.animationDisappearLeft.frameWidth = 130;
                } else if (this.animationDisappearLeft.currentFrame() == 13) {
                    this.animationDisappearLeft.offsetX = 2;
                    this.animationDisappearLeft.startX = -408;
                    this.animationDisappearLeft.frameWidth = 130;
                } else {
                    this.animationDisappearLeft.offsetX = 0;
                    this.animationDisappearLeft.startX = 0;
                    this.animationDisappearLeft.frameWidth = 68;
                }
                this.animationDisappearLeft.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
                if (this.animationDisappearLeft.isDone()) {
                    this.removeFromWorld = true;
                }
            }
        } else {
            if (this.moveDirection == 1) {
                this.animationWalkRight.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
            } else if (this.moveDirection == 2) {
                if (this.lookDirectionRight) {
                    this.animationWalkRight.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
                } else {
                    this.animationWalkLeft.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
                }
            } else if (this.moveDirection == 3) {
                this.animationWalkLeft.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
            } else {
                if (this.lookDirectionRight) {
                    this.animationWalkRight.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
                } else {
                    this.animationWalkLeft.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
                }
            }
        }
        drawBoundingBox(this);
    }
}

watermelon.prototype.update = function () {
    // console.log(this.centerX + " " + this.centerY)
    if(this.game.running) {
        var xy = getXY(this.centerX, this.centerY);
        if (((this.centerX +  100) % 100 > 48 && (this.centerX + 100) % 100 < 52
            && this.centerY % 100 > 48 && this.centerY % 100 < 52)) {
            this.moveDirection = getShortestPath(this.centerX, this.centerY);
            enemyUpdateLookHelper(this);
        }

        enemyUpdateHelper(this);

        this.setBoundingBox();

        enemyEscape(this);
        
        // // else i
        // for (var i = 0; i < this.game.entities.length; i++) {
        //     var ent = this.game.entities[i];
        //     if (ent !== this && ent.isBoba && this.boundingbox.collide(ent.boundingbox)) {
        //         ent.removeFromWorld = true;
        //         this.hp--;
        //     }
        // }
        collideUpdate(this);

        moneyUpdate(this);

        enemyStatusEffectUpdate(this);
    }
}