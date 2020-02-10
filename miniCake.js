function miniCake(game, spawnX, spawnY, scale) {
    this.isEnemy = true;
    // console.log(slimeOffsetY)
    this.width = 67 * scale;
    this.height = 48 * scale;
    this.name = "minicake";
    this.speed = 25;
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
    this.moveDirection = 3; //1 is right, down, left, up
    this.lookDirectionRight = true;
    this.hp = 20;//
    this.animationWalkLeft = new Animation(AM.getAsset("./img/miniCake.png")
    , 0, 66, 67, 48, 6, .135, 6, true, scale, false);
    this.animationDisappearLeft = new Animation(AM.getAsset("./img/miniCake.png")
    , 0, 189, 67, 74, 9, .25, 9, false, scale, false);
    this.animationWalkRight = new Animation(AM.getAsset("./img/miniCakeFlip.png")
    , 714, 66, -67, 48, 6, .135, 6, true, scale, false);
    this.animationDisappearRight = new Animation(AM.getAsset("./img/miniCakeFlip.png")
    , 714, 189, -67, 74, 9, .25, 9, false, scale, false);
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

        enemyUpdateHelper(this);

        xy = getXY(this.centerX, this.centerY);
        if (xy.x == GAMEBOARD.length - 1 && GAMEBOARD[xy.x][xy.y].end) {
            this.hp = 0; //dead
        } 
        
        else i
        for (var i = 0; i < this.game.entities.length; i++) {
            var ent = this.game.entities[i];
            if (ent !== this && ent.isBoba && collide(ent, this)) {
                ent.removeFromWorld = true;
                this.hp--;
            }
        }
    }
}