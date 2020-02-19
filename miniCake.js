function miniCake(game, spawnX, spawnY, scale) {
    this.spawnX = spawnX;
    this.spawnY = spawnY;
    this.lifeDeduction = 3;
    this.scale = scale;
    this.isEnemy = true;
    // console.log(slimeOffsetY)
    this.width = 67 * scale;
    this.height = 48 * scale;
    this.name = "minicake";
    this.speed = 50;
    this.x = spawnX - 50;
    this.y = spawnY - 50;
    this.game = game;
    this.ctx = game.ctx;
    this.moveDirection = 3; //1 is right, down, left, up
    this.lookDirectionRight = true;
    this.hp = 20;//
    this.money = 10;
    this.animationWalkLeft = new Animation(AM.getAsset("./img/miniCake.png")
    , 0, 66, 67, 48, 6, .135, 6, true, scale, false);
    this.animationDisappearLeft = new Animation(AM.getAsset("./img/miniCake.png")
    , 0, 189, 67, 74, 9, .25, 9, false, scale, false);
    this.animationWalkRight = new Animation(AM.getAsset("./img/miniCakeFlip.png")
    , 714, 66, -67, 48, 6, .135, 6, true, scale, false);
    this.animationDisappearRight = new Animation(AM.getAsset("./img/miniCakeFlip.png")
    , 714, 189, -67, 74, 9, .25, 9, false, scale, false);
    this.boxes = true;
    this.setBoundingBox();
    enemyCenterUpdate(this);
}

miniCake.prototype.setBoundingBox = function() {
    if(this.lookDirectionRight || this.moveDirection == 1 ) {
        this.boundingbox = new BoundingBox(this.x + 12 * this.scale, this.y + 10 * this.scale
            , this.width - 20 * this.scale , this.height -10 * this.scale);
    } else {
        this.boundingbox = new BoundingBox(this.x + 8 * this.scale, this.y + 10 * this.scale
            , this.width - 20 * this.scale , this.height -10 * this.scale);
    }
}

miniCake.prototype.draw = function () {
    if(this.game.running) {
        if (this.hp <= 0) {
            if (this.lookDirectionRight) {
                if (this.animationDisappearRight.currentFrame() == 1 
                || this.animationDisappearRight.currentFrame() == 2) {
                    this.animationDisappearRight.frameWidth = -72;
                } else if (this.animationDisappearRight.currentFrame() == 3) {
                    this.animationDisappearRight.frameWidth = -73;
                } else if (this.animationDisappearRight.currentFrame() == 4) {
                    this.animationDisappearRight.frameWidth = -75;
                } else if (this.animationDisappearRight.currentFrame() == 5 
                || this.animationDisappearRight.currentFrame() == 6) {
                    this.animationDisappearRight.frameWidth = -77;
                } else if (this.animationDisappearRight.currentFrame() == 7
                || this.animationDisappearRight.currentFrame() == 8) {
                    this.animationDisappearRight.offsetX = -4;
                    this.animationDisappearRight.frameWidth = -79;
                } else {
                    this.animationDisappearRight.offsetX = 0;
                    this.animationDisappearRight.startX = 714;
                    this.animationDisappearRight.frameWidth = -67;
                }
                this.animationDisappearRight.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
                if (this.animationDisappearRight.isDone()) {
                    this.removeFromWorld = true;
                }
            } else {
                if (this.animationDisappearLeft.currentFrame() == 1 
                || this.animationDisappearLeft.currentFrame() == 2) {
                    this.animationDisappearLeft.frameWidth = 72;
                } else if (this.animationDisappearLeft.currentFrame() == 3) {
                    this.animationDisappearLeft.frameWidth = 73;
                } else if (this.animationDisappearLeft.currentFrame() == 4) {
                    this.animationDisappearLeft.frameWidth = 75;
                } else if (this.animationDisappearLeft.currentFrame() == 5 
                || this.animationDisappearLeft.currentFrame() == 6) {
                    this.animationDisappearLeft.frameWidth = 77;
                } else if (this.animationDisappearLeft.currentFrame() == 7
                || this.animationDisappearLeft.currentFrame() == 8) {
                    this.animationDisappearLeft.offsetX = 4;
                    this.animationDisappearLeft.frameWidth = 79;
                } else {
                    this.animationDisappearLeft.offsetX = 0;
                    this.animationDisappearLeft.startX = 0;
                    this.animationDisappearLeft.frameWidth = 67;
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

miniCake.prototype.update = function () {
    // console.log(this.centerX + " " + this.centerY)
    if(this.game.running) {
        var xy = getXY(this.centerX, this.centerY);
        if (((this.centerX +  100) % 100 > 48 && (this.centerX + 100) % 100 < 52
            && this.centerY % 100 > 48 && this.centerY % 100 < 52)) {
            this.moveDirection = getShortestPath(this.centerX, this.centerY);
            enemyUpdateLookHelper(this);
        }
        
        //enemyUpdateHelper(this);
        miniCakeUpdate(this);

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
    }
}

var miniCakeUpdate = function (enemy) {
    // console.log(enemy.centerX + " " + enemy.centerY)
    if (enemy.hp > 0) {
        if (enemy.moveDirection == 1) {
            if (enemy.animationWalkRight.currentFrame() >= 1 && enemy.animationWalkRight.currentFrame() <= 6) {
                enemy.x += enemy.game.clockTick * enemy.speed;
                enemy.centerX += enemy.game.clockTick * enemy.speed;
            }
        } else if (enemy.moveDirection == 2) {
            if (enemy.lookDirectionRight) {
                if (enemy.animationWalkRight.currentFrame() >= 1 && enemy.animationWalkRight.currentFrame() <= 6) {
                    enemy.y += enemy.game.clockTick * enemy.speed;
                    enemy.centerY +=enemy.game.clockTick * enemy.speed;
                }
            } else {
                if (enemy.animationWalkLeft.currentFrame() >= 1 && enemy.animationWalkLeft.currentFrame() <= 6) {
                    enemy.y += enemy.game.clockTick * enemy.speed;
                    enemy.centerY += enemy.game.clockTick * enemy.speed;
                }
            }
        } else if (enemy.moveDirection == 3) {
            if (enemy.animationWalkLeft.currentFrame() >= 1 && enemy.animationWalkLeft.currentFrame() <= 6) {
                enemy.x -= enemy.game.clockTick * enemy.speed;
                enemy.centerX -= enemy.game.clockTick * enemy.speed;
            }
        } else {
            if (enemy.lookDirectionRight) {
                if (enemy.animationWalkRight.currentFrame() >= 1 && enemy.animationWalkRight.currentFrame() <= 6) {
                    enemy.y -= enemy.game.clockTick * enemy.speed;
                    enemy.centerY -= enemy.game.clockTick * enemy.speed;
                }                    
            } else {
                if (enemy.animationWalkLeft.currentFrame() >= 1 && enemy.animationWalkLeft.currentFrame() <= 6) {
                    enemy.y -= enemy.game.clockTick * enemy.speed;
                    enemy.centerY -= enemy.game.clockTick * enemy.speed;
                }
            }
        }
    }
}