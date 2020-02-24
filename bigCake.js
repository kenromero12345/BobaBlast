function bigCake(game, spawnX, spawnY, scale) {
    this.lifeDeduction = 10;
    this.name = "bigCake";
    this.speed = 50;
    this.hp = 400;//
    this.money = 100;
    this.animationWalkLeft = new Animation(AM.getAsset("./img/bigCake.png")
    , 0, 400, 298, 400, 8, .135, 8, true, scale, false);
    this.animationDisappearLeft = new Animation(AM.getAsset("./img/bigCake.png")
    , 15, 286, 115, 172, 10, .2, 10, false, scale, false);
    this.animationWalkRight = new Animation(AM.getAsset("./img/bigCakeFlip.png")
    , 4732, 400, -298, 400, 8, .135, 8, true, scale, false);
    this.animationDisappearRight = new Animation(AM.getAsset("./img/bigCakeFlip.png")
    , 4732, 1830, -334, 400, 10, .2, 10, false, scale, false);
    this.animationWalkRight.offsetX = -150;
    this.animationDisappearRight.offsetX = -150;
    enemyConstructor(this, scale, spawnX, spawnY, this.animationWalkLeft.frameWidth
        , this.animationWalkLeft.frameHeight, game, this.speed, this.animationWalkLeft.frameDuration, 2);
    // this.moveDirection = 3;
    // this.lookDirectionRight = false;
}

bigCake.prototype.setBoundingBox = function() {
    if(this.lookDirectionRight || this.moveDirection == 1 ) {
        this.boundingbox = new BoundingBox(this.x + 100 * this.scale, this.y + 60 * this.scale
            , this.width - 190 * this.scale , this.height -90 * this.scale);
    } else {
        this.boundingbox = new BoundingBox(this.x + 85 * this.scale, this.y + 60 * this.scale
            , this.width - 190 * this.scale , this.height -90 * this.scale);
    }
}

bigCake.prototype.draw = function () {
    if(this.game.running) {
        if (this.hp <= 0) {
            if (this.lookDirectionRight) {
                this.animationDisappearRight.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
                if (this.animationDisappearRight.isDone()) {
                    this.removeFromWorld = true;
                }
            } else {
                this.animationDisappearLeft.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
                if (this.animationDisappearLeft.isDone()) {
                    this.removeFromWorld = true;
                }
            }
        } else {
            if (this.moveDirection == 1) {
                bigCakeRight(this);
            } else if (this.moveDirection == 2) {
                if (this.lookDirectionRight) {
                    bigCakeRight(this);
                } else {
                    bigCakeLeft(this);
                }
            } else if (this.moveDirection == 3) {
                bigCakeLeft(this);
            } else {
                if (this.lookDirectionRight) {
                    bigCakeRight(this);
                } else {
                    bigCakeLeft(this);
                }
            }
            // this.drawBoundingBox();
            drawBoundingBox(this);
        }
    }
}

var bigCakeLeft = function(enemy) {
    enemy.animationWalkLeft.drawFrame(enemy.game.clockTick, enemy.ctx, enemy.x, enemy.y);
}

var bigCakeRight = function(enemy) {
    enemy.animationWalkRight.drawFrame(enemy.game.clockTick, enemy.ctx, enemy.x, enemy.y);
}

bigCake.prototype.update = function () {
    if(this.game.running) {
        enemyChooseDir(this);

        enemyUpdateHelper(this);
        // bigCakeUpdate(this);

        this.setBoundingBox();
        
        enemyEscape(this);

        // for (var i = 0; i < this.game.entities.length; i++) {
        //     var ent = this.game.entities[i];
        //     if (ent !== this && ent.isBoba &&  this.boundingbox.collide(ent.boundingbox)) {
        //         ent.removeFromWorld = true;
        //         this.hp--;
        //     }
        // }
        collideUpdate(this);

        moneyUpdate(this);

        enemyStatusEffectUpdate(this);
    }
}

var bigCakeUpdate = function (enemy) {
    // console.log(enemy.centerX + " " + enemy.centerY)
    if (enemy.hp > 0) {
        if (enemy.moveDirection == 1) {
            if (true ){//enemy.animationWalkRight.currentFrame() >= 1 && enemy.animationWalkRight.currentFrame() <= 5) {
                enemy.x += enemy.game.clockTick * enemy.speed;
                enemy.centerX += enemy.game.clockTick * enemy.speed;
            }
        } else if (enemy.moveDirection == 2) {
            if (enemy.lookDirectionRight) {
                if (true){//enemy.animationWalkRight.currentFrame() >= 1 && enemy.animationWalkRight.currentFrame() <= 5) {
                    enemy.y += enemy.game.clockTick * enemy.speed;
                    enemy.centerY +=enemy.game.clockTick * enemy.speed;
                }
            } else {
                if (true){//enemy.animationWalkLeft.currentFrame() >= 1 && enemy.animationWalkLeft.currentFrame() <= 5) {
                    enemy.y += enemy.game.clockTick * enemy.speed;
                    enemy.centerY += enemy.game.clockTick * enemy.speed;
                }
            }
        } else if (enemy.moveDirection == 3) {
            if (true){//enemy.animationWalkLeft.currentFrame() >= 1 && enemy.animationWalkLeft.currentFrame() <= 5) {
                enemy.x -= enemy.game.clockTick * enemy.speed;
                enemy.centerX -= enemy.game.clockTick * enemy.speed;
            }
        } else {
            if (enemy.lookDirectionRight) {
                if (true){//enemy.animationWalkRight.currentFrame() >= 1 && enemy.animationWalkRight.currentFrame() <= 5) {
                    enemy.y -= enemy.game.clockTick * enemy.speed;
                    enemy.centerY -= enemy.game.clockTick * enemy.speed;
                }                    
            } else {
                if (true){//enemy.animationWalkLeft.currentFrame() >= 1 && enemy.animationWalkLeft.currentFrame() <= 5) {
                    enemy.y -= enemy.game.clockTick * enemy.speed;
                    enemy.centerY -= enemy.game.clockTick * enemy.speed;
                }
            }
        }
    }
}