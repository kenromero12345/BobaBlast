function cake(game, spawnX, spawnY, scale) {
    this.isEnemy = true;
    // console.log(slimeOffsetY)
    this.width = 96 * scale;
    this.height = 90 * scale;
    this.name = "cake";
    this.speed = 100;
    this.x = spawnX - 50;
    this.y = spawnY - 50;
    this.centerX = this.x + this.width / 2;
    this.centerY = this.y + this.height / 2;
        // console.log("x:" + this.x + ", y:" + this.y + ", cx" + this.centerX + ", cy:" + this.centerY);
    var difX = this.centerX - spawnX;
    var difY =  spawnY - this.centerY;
    // console.log("dx:" + difX + ", dy:" + difY);
    this.centerX = this.centerX - difX;
    this.centerY = this.centerY + difY;
    this.x = this.x - difX;
    this.y = this.y + difY;
        // console.log("x:" + this.x + ", y:" + this.y + ", cx" + this.centerX + ", cy:" + this.centerY);
    this.game = game;
    this.ctx = game.ctx;
    this.moveDirection = 1; //1 is right, down, left, up
    this.lookDirectionRight = !false;
    this.hp = 40;//
    this.animationWalkLeft = new Animation(AM.getAsset("./img/cake.png")
    , 0, 85, 96, 90, 5, .135, 5, true, scale, false);
    this.animationDisappearLeft = new Animation(AM.getAsset("./img/cake.png")
    , 0, 270, 96, 103, 8, .2, 8, false, scale, false);
    this.animationWalkRight = new Animation(AM.getAsset("./img/cakeFlip.png")
    , 879, 85, -96, 90, 5, .135, 5, true, scale, false);
    this.animationDisappearRight = new Animation(AM.getAsset("./img/cakeFlip.png")
    , 879, 270, -96, 103, 8, .2, 8, false, scale, false);
    this.boxes = false;
    this.boundingbox = new BoundingBox(this.x, this.y, this.width, this.height);
}

cake.prototype.draw = function () {
    if(this.game.running) {
        if (this.hp <= 0) {
            if (this.lookDirectionRight) {
                if ( this.animationDisappearRight.currentFrame() == 2) {
                    this.animationDisappearRight.offsetX = 0;
                    this.animationDisappearRight.startX = 879-17;
                    this.animationDisappearRight.frameWidth = -96;
                } else if ( this.animationDisappearRight.currentFrame() == 3) {
                    this.animationDisappearRight.offsetX = 0;
                    this.animationDisappearRight.startX = 879;
                    this.animationDisappearRight.frameWidth = -110;
                } else if ( this.animationDisappearRight.currentFrame() == 4) {
                    this.animationDisappearRight.offsetX = 0;
                    this.animationDisappearRight.startX = 879+20;
                    this.animationDisappearRight.frameWidth = -120;
                } else if ( this.animationDisappearRight.currentFrame() == 5) {
                    this.animationDisappearRight.offsetX = 0;
                    this.animationDisappearRight.startX = 879-85;
                    this.animationDisappearRight.frameWidth = -100;
                } else if ( this.animationDisappearRight.currentFrame() == 6) {
                    this.animationDisappearRight.offsetX = -3;
                    this.animationDisappearRight.startX = 879-85;
                    this.animationDisappearRight.frameWidth = -100;
                } else if ( this.animationDisappearRight.currentFrame() == 7) {
                    this.animationDisappearRight.offsetX = -5;
                    this.animationDisappearRight.startX = 879-85;
                    this.animationDisappearRight.frameWidth = -100;
                } else {
                    this.animationDisappearRight.offsetX = 0;
                    this.animationDisappearRight.startX = 879;
                    this.animationDisappearRight.frameWidth = -96;
                }
                this.animationDisappearRight.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
                if (this.animationDisappearRight.isDone()) {
                    this.removeFromWorld = true;
                }
            } else {
                if ( this.animationDisappearLeft.currentFrame() == 2) {
                    this.animationDisappearLeft.offsetX = 0;
                    this.animationDisappearLeft.startX = 17;
                    this.animationDisappearLeft.frameWidth = 96;
                } else if ( this.animationDisappearLeft.currentFrame() == 3) {
                    this.animationDisappearLeft.offsetX = -10;
                    this.animationDisappearLeft.startX = 0;
                    this.animationDisappearLeft.frameWidth = 110;
                } else if ( this.animationDisappearLeft.currentFrame() == 4) {
                    this.animationDisappearLeft.offsetX = -20;
                    this.animationDisappearLeft.startX = -20;
                    this.animationDisappearLeft.frameWidth = 120;
                } else if ( this.animationDisappearLeft.currentFrame() == 5) {
                    this.animationDisappearLeft.offsetX = 0;
                    this.animationDisappearLeft.startX = 85;
                    this.animationDisappearLeft.frameWidth = 100;
                } else if ( this.animationDisappearLeft.currentFrame() == 6) {
                    this.animationDisappearLeft.offsetX = 5;
                    this.animationDisappearLeft.startX = 85;
                    this.animationDisappearLeft.frameWidth = 100;
                } else if ( this.animationDisappearLeft.currentFrame() == 7) {
                    this.animationDisappearLeft.offsetX = 5;
                    this.animationDisappearLeft.startX = 85;
                    this.animationDisappearLeft.frameWidth = 100;
                } else {
                    this.animationDisappearLeft.offsetX = 0;
                    this.animationDisappearLeft.startX = 0;
                    this.animationDisappearLeft.frameWidth = 96;
                }
                this.animationDisappearLeft.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
                if (this.animationDisappearLeft.isDone()) {
                    this.removeFromWorld = true;
                }
            }
        } else {
            if (this.moveDirection == 1) {
                cakeChocoRight(this);
            } else if (this.moveDirection == 2) {
                if (this.lookDirectionRight) {
                    cakeChocoRight(this);
                } else {
                    cakeChocoLeft(this);
                }
            } else if (this.moveDirection == 3) {
                cakeChocoLeft(this);
            } else {
                if (this.lookDirectionRight) {
                    cakeChocoRight(this);
                } else {
                    cakeChocoLeft(this);
                }
            }
        }
    }
}

var cakeLeft = function(enemy) {
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

var cakeRight = function(enemy) {
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

cake.prototype.update = function () {
    // console.log(this.centerX + " " + this.centerY)
    if(this.game.running) {
        var xy = getXY(this.centerX, this.centerY);
        if (((this.centerX +  100) % 100 > 48 && (this.centerX + 100) % 100 < 52
            && this.centerY % 100 > 48 && this.centerY % 100 < 52)) {
            this.moveDirection = getShortestPath(this.centerX, this.centerY);
            enemyUpdateLookHelper(this);
        }

        //enemyUpdateHelper(this);
        cakeUpdate(this);
        
        xy = getXY(this.centerX, this.centerY);
        if (xy.x == GAMEBOARD.length - 1 && GAMEBOARD[xy.x][xy.y].end) {
            this.hp = 0; //dead
        } 
        
        else i
        for (var i = 0; i < this.game.entities.length; i++) {
            var ent = this.game.entities[i];
            if (ent !== this && ent.isBoba && this.boundingbox.collide(ent.boundingbox)) {
                ent.removeFromWorld = true;
                this.hp--;
            }
        }
    }
}

var cakeUpdate = function (enemy) {
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