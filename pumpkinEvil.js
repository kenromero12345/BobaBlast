function pumpkinEvil(game, spawnX, spawnY, scale) {
    this.spawnX = spawnX;
    this.spawnY = spawnY;
    this.lifeDeduction = 10;
    this.isEnemy = true;
    // console.log(slimeOffsetY)
    this.width = 125 * scale;
    this.height = 112 * scale;
    this.name = "evil pumpkin";
    this.speed = 100;
    this.x = spawnX - 50;
    this.y = spawnY - 50;
    this.game = game;
    this.ctx = game.ctx;
    this.moveDirection = 1; //1 is right, down, left, up
    this.lookDirectionRight = !false;
    this.hp = 40;//
    this.animationWalkLeft = new Animation(AM.getAsset("./img/pumpkinEvil.png")
    , 0, 115, 125, 112, 6, .135, 6, true, scale, false);
    this.animationDisappearLeft = new Animation(AM.getAsset("./img/pumpkinEvil.png")
    , 15, 286, 115, 172, 10, .2, 10, false, scale, false);
    this.animationWalkRight = new Animation(AM.getAsset("./img/pumpkinEvilFlip.png")
    , 1335, 115, -125, 112, 6, .135, 6, true, scale, false);
    this.animationDisappearRight = new Animation(AM.getAsset("./img/pumpkinEvilFlip.png")
    , 1320, 286, -110, 172, 10, .2, 10, false, scale, false);
    this.boxes = true;
    this.setBoundingBox();
    enemyCenterUpdate(this);
}

pumpkinEvil.prototype.setBoundingBox = function() {
    if(this.lookDirectionRight || this.moveDirection == 1 ) {
        this.boundingbox = new BoundingBox(this.x + 10 * this.scale, this.y + 10 * this.scale
            , this.width - 20 * this.scale , this.height -40 * this.scale);
    } else {
        this.boundingbox = new BoundingBox(this.x + 10 * this.scale, this.y + 10 * this.scale
            , this.width - 25 * this.scale , this.height -40 * this.scale);
    }
}

pumpkinEvil.prototype.draw = function () {
    if(this.game.running) {
        if (this.hp <= 0) {
            if (this.lookDirectionRight) {
                // if ( this.animationDisappearRight.currentFrame() == 2) {
                //     this.animationDisappearRight.offsetX = 0;
                //     this.animationDisappearRight.startX = 879-17;
                //     this.animationDisappearRight.frameWidth = -96;
                // } else if ( this.animationDisappearRight.currentFrame() == 3) {
                //     this.animationDisappearRight.offsetX = 0;
                //     this.animationDisappearRight.startX = 879;
                //     this.animationDisappearRight.frameWidth = -110;
                // } else if ( this.animationDisappearRight.currentFrame() == 4) {
                //     this.animationDisappearRight.offsetX = 0;
                //     this.animationDisappearRight.startX = 879+20;
                //     this.animationDisappearRight.frameWidth = -120;
                // } else if ( this.animationDisappearRight.currentFrame() == 5) {
                //     this.animationDisappearRight.offsetX = 0;
                //     this.animationDisappearRight.startX = 879-85;
                //     this.animationDisappearRight.frameWidth = -100;
                // } else if ( this.animationDisappearRight.currentFrame() == 6) {
                //     this.animationDisappearRight.offsetX = -3;
                //     this.animationDisappearRight.startX = 879-85;
                //     this.animationDisappearRight.frameWidth = -100;
                // } else if ( this.animationDisappearRight.currentFrame() == 7) {
                //     this.animationDisappearRight.offsetX = -5;
                //     this.animationDisappearRight.startX = 879-85;
                //     this.animationDisappearRight.frameWidth = -100;
                // } else {
                //     this.animationDisappearRight.offsetX = 0;
                //     this.animationDisappearRight.startX = 879;
                //     this.animationDisappearRight.frameWidth = -96;
                // }
                this.animationDisappearRight.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
                if (this.animationDisappearRight.isDone()) {
                    this.removeFromWorld = true;
                }
            } else {
                // if ( this.animationDisappearLeft.currentFrame() == 2) {
                //     this.animationDisappearLeft.offsetX = 0;
                //     this.animationDisappearLeft.startX = 17;
                //     this.animationDisappearLeft.frameWidth = 96;
                // } else if ( this.animationDisappearLeft.currentFrame() == 3) {
                //     this.animationDisappearLeft.offsetX = -10;
                //     this.animationDisappearLeft.startX = 0;
                //     this.animationDisappearLeft.frameWidth = 110;
                // } else if ( this.animationDisappearLeft.currentFrame() == 4) {
                //     this.animationDisappearLeft.offsetX = -20;
                //     this.animationDisappearLeft.startX = -20;
                //     this.animationDisappearLeft.frameWidth = 120;
                // } else if ( this.animationDisappearLeft.currentFrame() == 5) {
                //     this.animationDisappearLeft.offsetX = 0;
                //     this.animationDisappearLeft.startX = 85;
                //     this.animationDisappearLeft.frameWidth = 100;
                // } else if ( this.animationDisappearLeft.currentFrame() == 6) {
                //     this.animationDisappearLeft.offsetX = 5;
                //     this.animationDisappearLeft.startX = 85;
                //     this.animationDisappearLeft.frameWidth = 100;
                // } else if ( this.animationDisappearLeft.currentFrame() == 7) {
                //     this.animationDisappearLeft.offsetX = 5;
                //     this.animationDisappearLeft.startX = 85;
                //     this.animationDisappearLeft.frameWidth = 100;
                // } else {
                //     this.animationDisappearLeft.offsetX = 0;
                //     this.animationDisappearLeft.startX = 0;
                //     this.animationDisappearLeft.frameWidth = 96;
                // }
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
    }
}

var pumpkinEvilLeft = function(enemy) {
    // if (enemy.animationWalkLeft.currentFrame() == 5) {
    //     enemy.animationWalkLeft.startX = 11;
    //     enemy.animationWalkLeft.width = 100;
    //     enemy.animationWalkLeft.offsetX = 0;
    // } else {
    //     enemy.animationWalkLeft.startX = 7;
    //     enemy.animationWalkLeft.width = 98;
    //     enemy.animationWalkLeft.offsetX = 0;
    // }
    enemy.animationWalkLeft.drawFrame(enemy.game.clockTick, enemy.ctx, enemy.x, enemy.y);
}

var pumpkinEvilRight = function(enemy) {
    // if (enemy.animationWalkRight.currentFrame() == 5) {
    //     enemy.animationWalkRight.startX = 803-11;
    //     enemy.animationWalkRight.width = -100;
    //     enemy.animationWalkRight.offsetX = 0;
    // } else if (enemy.animationWalkRight.currentFrame() == 2) {
    //     enemy.animationWalkRight.startX = 803-6;
    // } else {
    //     enemy.animationWalkRight.startX = 803-7;
    //     enemy.animationWalkRight.width = -98;
    //     enemy.animationWalkRight.offsetX = 0;
    // }
    enemy.animationWalkRight.drawFrame(enemy.game.clockTick, enemy.ctx, enemy.x, enemy.y);
}

pumpkinEvil.prototype.update = function () {
    // console.log(this.centerX + " " + this.centerY)
    if(this.game.running) {
        var xy = getXY(this.centerX, this.centerY);
        if (((this.centerX +  100) % 100 > 48 && (this.centerX + 100) % 100 < 52
            && this.centerY % 100 > 48 && this.centerY % 100 < 52)) {
            this.moveDirection = getShortestPath(this.centerX, this.centerY);
            enemyUpdateLookHelper(this);
        }
        //enemyUpdateHelper(this);
        pumpkinEvilUpdate(this);
        
        this.setBoundingBox();
        
        enemyEscape(this);

        for (var i = 0; i < this.game.entities.length; i++) {
            var ent = this.game.entities[i];
            if (ent !== this && ent.isBoba && this.boundingbox.collide(ent.boundingbox)) {
                ent.removeFromWorld = true;
                this.hp--;
            }
        }
    }
}

var pumpkinEvilUpdate = function (enemy) {
    // console.log(enemy.centerX + " " + enemy.centerY)
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