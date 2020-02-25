function pumpkinGood(game, spawnX, spawnY, scale) {
    this.lifeDeduction = 7;
    this.name = "good pumpkin";
    this.speed = 100;
    this.hp = 40;//
    this.money = 25;
    this.animationWalkLeft = new Animation(AM.getAsset("./img/pumpkinGood.png")
    , 5, 87, 81, 84, 4, .135, 4, true, scale, false);
    this.animationDisappearLeft = new Animation(AM.getAsset("./img/pumpkinGood.png")
    , 8, 260, 84, 76, 7, .2, 7, false, scale, false);
    this.animationWalkRight = new Animation(AM.getAsset("./img/pumpkinGoodFlip.png")
    , 712-5, 87, -81, 84, 4, .135, 4, true, scale, false);
    this.animationDisappearRight = new Animation(AM.getAsset("./img/pumpkinGoodFlip.png")
    , 720, 260, -84, 76, 7, .2, 7, false, scale, false);
    enemyConstructor(this, scale, spawnX, spawnY, this.animationWalkLeft.frameWidth
        , this.animationWalkLeft.frameHeight, game, this.speed, this.animationWalkLeft.frameDuration, 2);
        //                                           this.moveDirection = 3;
        // this.lookDirectionRight = false;
}

pumpkinGood.prototype.setBoundingBox = function() {
    if(this.lookDirectionRight || this.moveDirection == 1 ) {
        this.boundingbox = new BoundingBox(this.x + 15 * this.scale, this.y + 25 * this.scale
            , this.width - 45 * this.scale , this.height -50 * this.scale);
    } else {
        this.boundingbox = new BoundingBox(this.x + 30 * this.scale, this.y + 25 * this.scale
            , this.width - 45 * this.scale , this.height -50 * this.scale);
    }
}

pumpkinGood.prototype.draw = function () {
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
                pumpkinGoodRight(this);
            } else if (this.moveDirection == 2) {
                if (this.lookDirectionRight) {
                    pumpkinGoodRight(this);
                } else {
                    pumpkinGoodLeft(this);
                }
            } else if (this.moveDirection == 3) {
                pumpkinGoodLeft(this);
            } else {
                if (this.lookDirectionRight) {
                    pumpkinGoodRight(this);
                } else {
                    pumpkinGoodLeft(this);
                }
            }
        }
        drawBoundingBox(this);
    }
}

var pumpkinGoodLeft = function(enemy) {
    enemy.animationWalkLeft.drawFrame(enemy.game.clockTick, enemy.ctx, enemy.x, enemy.y);
}

var pumpkinGoodRight = function(enemy) {
    enemy.animationWalkRight.drawFrame(enemy.game.clockTick, enemy.ctx, enemy.x, enemy.y);
}

pumpkinGood.prototype.update = function () {
    if(this.game.running) {
        enemyChooseDir(this);
        
        //enemyUpdateHelper(this);
        pumpkinGoodUpdate(this);

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

var pumpkinGoodUpdate = function (enemy) {
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