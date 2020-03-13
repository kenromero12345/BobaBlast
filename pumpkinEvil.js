function pumpkinEvil(game, spawnX, spawnY, scale) {
    this.lifeDeduction = 10;
    this.name = "evil pumpkin";
    this.speed = 100;
    this.hp = 40* (1 + round * 0.05);
    this.money = 25;
    this.animationWalkLeft = new Animation(AM.getAsset("./img/pumpkinEvil.png")
    , 0, 115, 125, 112, 6, .135, 6, true, scale, false);
    this.animationDisappearLeft = new Animation(AM.getAsset("./img/pumpkinEvil.png")
    , 15, 286, 115, 172, 10, .2, 10, false, scale, false);
    this.animationWalkRight = new Animation(AM.getAsset("./img/pumpkinEvilFlip.png")
    , 1335, 115, -125, 112, 6, .135, 6, true, scale, false);
    this.animationDisappearRight = new Animation(AM.getAsset("./img/pumpkinEvilFlip.png")
    , 1320, 286, -110, 172, 10, .2, 10, false, scale, false);
    enemyConstructor(this, scale, spawnX, spawnY, this.animationWalkLeft.frameWidth
        , this.animationWalkLeft.frameHeight, game, this.speed, this.animationWalkLeft.frameDuration, 2);
    this.animationDisappearLeft.offsetY -= 50;
    this.animationDisappearRight.offsetY -= 50;
        //                                   this.moveDirection = 3;
        // this.lookDirectionRight = false;
    this.burnResistance = .75;
}

pumpkinEvil.prototype.setBoundingBox = function() {
    if(this.lookDirectionRight || this.moveDirection == 1 ) {
        this.boundingbox = new BoundingBox(this.x + 35 * this.scale, this.y + 35 * this.scale
            , this.width - 65 * this.scale , this.height -55 * this.scale);
    } else {
        this.boundingbox = new BoundingBox(this.x + 32 * this.scale, this.y + 35 * this.scale
            , this.width - 65 * this.scale , this.height -55 * this.scale);
    }
}

pumpkinEvil.prototype.draw = function () {
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
                pumpkinEvilRight(this);
            } else if (this.moveDirection == 2) {
                if (this.lookDirectionRight) {
                    pumpkinEvilRight(this);
                } else {
                    pumpkinEvilLeft(this);
                }
            } else if (this.moveDirection == 3) {
                pumpkinEvilLeft(this);
            } else {
                if (this.lookDirectionRight) {
                    pumpkinEvilRight(this);
                } else {
                    pumpkinEvilLeft(this);
                }
            }
        }
        drawBoundingBox(this);
        drawHP(this, 0, 0);
    }
}

var pumpkinEvilLeft = function(enemy) {
    enemy.animationWalkLeft.drawFrame(enemy.game.clockTick, enemy.ctx, enemy.x, enemy.y);
}

var pumpkinEvilRight = function(enemy) {
    enemy.animationWalkRight.drawFrame(enemy.game.clockTick, enemy.ctx, enemy.x, enemy.y);
}

pumpkinEvil.prototype.update = function () {
    // console.log(this.centerX + " " + this.centerY)
    if(this.game.running) {
        enemyChooseDir(this);
        
        //enemyUpdateHelper(this);
        pumpkinEvilUpdate(this);
        
        this.setBoundingBox();
        
        enemyEscape(this);

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

var pumpkinEvilUpdate = function (enemy) {
    if (enemy.hp > 0) {
        if (enemy.moveDirection == 1) {
            if (enemy.animationWalkRight.currentFrame() >= 1 && enemy.animationWalkRight.currentFrame() <= 5) {
                enemy.x += enemy.game.clockTick * enemy.speed;
                enemy.centerX += enemy.game.clockTick * enemy.speed;
            }
        } else if (enemy.moveDirection == 2) {
            if (enemy.lookDirectionRight) {
                if (enemy.animationWalkRight.currentFrame() >= 1 && enemy.animationWalkRight.currentFrame() <= 5) {
                    enemy.y += enemy.game.clockTick * enemy.speed;
                    enemy.centerY +=enemy.game.clockTick * enemy.speed;
                }
            } else {
                if (enemy.animationWalkLeft.currentFrame() >= 1 && enemy.animationWalkLeft.currentFrame() <= 5) {
                    enemy.y += enemy.game.clockTick * enemy.speed;
                    enemy.centerY += enemy.game.clockTick * enemy.speed;
                }
            }
        } else if (enemy.moveDirection == 3) {
            if (enemy.animationWalkLeft.currentFrame() >= 1 && enemy.animationWalkLeft.currentFrame() <= 5) {
                enemy.x -= enemy.game.clockTick * enemy.speed;
                enemy.centerX -= enemy.game.clockTick * enemy.speed;
            }
        } else {
            if (enemy.lookDirectionRight) {
                if (enemy.animationWalkRight.currentFrame() >= 1 && enemy.animationWalkRight.currentFrame() <= 5) {
                    enemy.y -= enemy.game.clockTick * enemy.speed;
                    enemy.centerY -= enemy.game.clockTick * enemy.speed;
                }                    
            } else {
                if (enemy.animationWalkLeft.currentFrame() >= 1 && enemy.animationWalkLeft.currentFrame() <= 5) {
                    enemy.y -= enemy.game.clockTick * enemy.speed;
                    enemy.centerY -= enemy.game.clockTick * enemy.speed;
                }
            }
        }
    }
}