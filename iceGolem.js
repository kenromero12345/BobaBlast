function iceGolem(game, spawnX, spawnY, scale) {
    this.width = 194 * scale;
    this.height = 180 * scale;
    this.name = "ice";
    this.speed = 15;
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
    this.lookDirectionRight = true;
    this.hp = 10;
    this.animationWalkLeft = new Animation(AM.getAsset("./img/iceg.png")
    , 0, 180, 194, 180, 4, 0.5, 4, true, scale, false );
    this.animationDisappearLeft = new Animation(AM.getAsset("./img/iceg.png")
    , 0, 745, 238, 180, 7, 0.25, 7, false, scale, false);
    this.animationWalkRight = new Animation(AM.getAsset("./img/icegFlip.png")
    , 870, 180, 194, 180, 4, 0.5, 4, true, scale, true );
    this.animationDisappearRight = new Animation(AM.getAsset("./img/icegFlip.png")
    , 0, 745, 238, 180, 7, 0.25, 7, false, scale, true);
}

iceGolem.prototype.draw = function () {
    // console.log(this.centerX)
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
    }
}

iceGolem.prototype.update = function () {
    console.log(this.centerX + " " + this.centerY)
    if(this.game.running) {
        var xy = getXY(this.centerX, this.centerY);
        if (((this.centerX +  100) % 100 > 49 && (this.centerX + 100) % 100 < 51
            && this.centerY % 100 > 49 && this.centerY % 100 < 51)) {
            this.moveDirection = getShortestPath(this.centerX, this.centerY);
            if (this.moveDirection == 1) {
                this.lookDirectionRight = true;
            } else if (this.moveDirection == 3) {
                this.lookDirectionRight = false;
            }
        }

        if (this.hp > 0) {
            if (this.moveDirection == 1) {
                if (this.animationWalkRight.elapsedTime < this.animationWalkRight.totalTime * 8 / 14) {
                    this.x += this.game.clockTick * this.speed;
                    this.centerX += this.game.clockTick * this.speed;
                }
            } else if (this.moveDirection == 2) {
                if (this.lookDirectionRight) {
                    if (this.animationWalkRight.elapsedTime < this.animationWalkRight.totalTime * 8 / 14) {
                        this.y += this.game.clockTick * this.speed;
                        this.centerY +=this.game.clockTick * this.speed;
                    }
                } else {
                    if (this.animationWalkLeft.elapsedTime < this.animationWalkLeft.totalTime * 8 / 14) {
                        this.y += this.game.clockTick * this.speed;
                        this.centerY += this.game.clockTick * this.speed;
                    }
                }
            } else if (this.moveDirection == 3) {
                if (this.animationWalkLeft.elapsedTime < this.animationWalkLeft.totalTime * 8 / 14) {
                    this.x -= this.game.clockTick * this.speed;
                    this.centerX -= this.game.clockTick * this.speed;
                }
            } else {
                if (this.lookDirectionRight) {
                    if (this.animationWalkRight.elapsedTime < this.animationWalkRight.totalTime * 8 / 14) {
                        this.y -= this.game.clockTick * this.speed;
                        this.centerY -= this.game.clockTick * this.speed;
                    }
                        
                } else {
                    if (this.animationWalkLeft.elapsedTime < this.animationWalkLeft.totalTime * 8 / 14) {
                        this.y -= this.game.clockTick * this.speed;
                        this.centerY -= this.game.clockTick * this.speed;
                    }
                }
            }
        }

        xy = getXY(this.centerX, this.centerY);
        if (xy.x == GAMEBOARD.length - 1 && GAMEBOARD[xy.x][xy.y].end) {
            this.hp = 0; //dead
        } 
        
        // else i
        for (var i = 0; i < this.game.entities.length; i++) {
            var ent = this.game.entities[i];
            if (ent !== this && ent.isBoba && collide(ent, this)) {
                ent.removeFromWorld = true;
                this.hp--;
            }
        }
    }
}