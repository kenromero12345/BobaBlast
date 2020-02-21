function biscuit(game, spawnX, spawnY, scale) {
    this.lifeDeduction = 5;
    this.name = "biscuit";
    this.speed = 100;
    this.hp = 30;//
    this.money = 50;
    this.animationWalkLeft = new Animation(AM.getAsset("./img/biscuitWarrior.png")
    , 7, 111, 98, 94, 6, .135, 6, true, scale, false);
    this.animationDisappearLeft = new Animation(AM.getAsset("./img/biscuitWarrior.png")
    , 16, 221, 91, 94, 7, .25, 7, false, scale, false);
    this.animationWalkRight = new Animation(AM.getAsset("./img/biscuitWarriorFlip.png")
    , 803-6, 111, -98, 94, 6, .135, 6, true, scale, false);
    this.animationDisappearRight = new Animation(AM.getAsset("./img/biscuitWarriorFlip.png")
    , 803-15, 221, -91, 94, 7, .25, 7, false, scale, false);
    this.boxes = true;
    enemyConstructor(this, scale, spawnX, spawnY, this.animationWalkLeft.frameWidth
        , this.animationWalkLeft.frameHeight, game, this.speed, this.animationWalkLeft.frameDuration);
}

biscuit.prototype.setBoundingBox = function() {
    if(this.lookDirectionRight || this.moveDirection == 1 ) {
        this.boundingbox = new BoundingBox(this.x + 14 * this.scale, this.y + 7 * this.scale
            , this.width - 40 * this.scale , this.height - 7 * this.scale);
    } else {
        this.boundingbox = new BoundingBox(this.x + 26 * this.scale, this.y + 7 * this.scale
            , this.width - 40 * this.scale , this.height - 7 * this.scale);
    }
}

biscuit.prototype.draw = function () {
    if(this.game.running) {
        if (this.hp <= 0) {
            if (this.lookDirectionRight) {
                if (this.animationDisappearRight.currentFrame() == 6) {
                    this.animationDisappearRight.startX = 803+100;
                    this.animationDisappearRight.offsetX = -5;
                    this.animationDisappearRight.frameWidth = -110;
                } else {
                    this.animationDisappearRight.offsetX = 0;
                    this.animationDisappearRight.startX = 803-16;
                    this.animationDisappearRight.frameWidth = -91;
                }
                this.animationDisappearRight.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
                if (this.animationDisappearRight.isDone()) {
                    this.removeFromWorld = true;
                }
            } else {
                if (this.animationDisappearLeft.currentFrame() == 6) {
                    this.animationDisappearLeft.startX = -100;
                    this.animationDisappearLeft.offsetX = -13;
                    this.animationDisappearLeft.frameWidth = 110;
                } else {
                    this.animationDisappearLeft.offsetX = 0;
                    this.animationDisappearLeft.startX = 16;
                    this.animationDisappearLeft.frameWidth = 91;
                }
                this.animationDisappearLeft.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
                if (this.animationDisappearLeft.isDone()) {
                    this.removeFromWorld = true;
                }
            }
        } else {
            if (this.moveDirection == 1) {
                biscuitRight(this);
            } else if (this.moveDirection == 2) {
                if (this.lookDirectionRight) {
                    biscuitRight(this);
                } else {
                    biscuitLeft(this);
                }
            } else if (this.moveDirection == 3) {
                biscuitLeft(this);
            } else {
                if (this.lookDirectionRight) {
                    biscuitRight(this);
                } else {
                    biscuitLeft(this);
                }
            }
        }
        drawBoundingBox(this);
    }
}

var biscuitLeft = function(bisc) {
    if (bisc.animationWalkLeft.currentFrame() == 5) {
        bisc.animationWalkLeft.startX = 11;
        bisc.animationWalkLeft.width = 100;
        bisc.animationWalkLeft.offsetX = 0;
    } else {
        bisc.animationWalkLeft.startX = 7;
        bisc.animationWalkLeft.width = 98;
        bisc.animationWalkLeft.offsetX = 0;
    }
    bisc.animationWalkLeft.drawFrame(bisc.game.clockTick, bisc.ctx, bisc.x, bisc.y);
}

var biscuitRight = function(bisc) {
    if (bisc.animationWalkRight.currentFrame() == 5) {
        bisc.animationWalkRight.startX = 803-11;
        bisc.animationWalkRight.width = -100;
        bisc.animationWalkRight.offsetX = 0;
    } else if (bisc.animationWalkRight.currentFrame() == 2) {
        bisc.animationWalkRight.startX = 803-6;
    } else {
        bisc.animationWalkRight.startX = 803-7;
        bisc.animationWalkRight.width = -98;
        bisc.animationWalkRight.offsetX = 0;
    }
    bisc.animationWalkRight.drawFrame(bisc.game.clockTick, bisc.ctx, bisc.x, bisc.y);
}

biscuit.prototype.update = function () {
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
        
        // for (var i = 0; i < this.game.entities.length; i++) {
        //     var ent = this.game.entities[i];
        //     if (ent !== this && ent.isBoba && this.boundingbox.collide(ent.boundingbox)) {
        //         ent.removeFromWorld = true;
        //         this.hp--;
        //     }
        //     // console.log(this.hp);
        //     // if (ent.isBoba) {
        //     // // console.log(this.boundingbox.collide(ent.boundingbox));
        //     // }
        // }
        collideUpdate(this);

        moneyUpdate(this);

        enemyStatusEffectUpdate(this);
    }
}