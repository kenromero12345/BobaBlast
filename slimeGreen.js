function slimeGreen(game, spawnX, spawnY, scale) {
    this.width = 65 * scale;
    this.height = 65 * scale;
    this.name = "green slime";
    this.speed = 100;
    this.x = spawnX - 50;
    this.y = spawnY - 50;
    // this.centerX = this.x + this.width / 2;
    // this.centerY = this.y + this.height / 2;
    //     console.log("x:" + this.x + ", y:" + this.y + ", cx" + this.centerX + ", cy:" + this.centerY);
    // var difX = this.centerX - spawnX;
    // var difY =  spawnY - this.centerY;
    // console.log("dx:" + difX + ", dy:" + difY);
    // this.centerX = this.centerX - difX;
    // this.centerY = this.centerY + difY;
    // this.x = this.x - difX;
    // this.y = this.y + difY;
    //     console.log("x:" + this.x + ", y:" + this.y + ", cx" + this.centerX + ", cy:" + this.centerY);
    this.game = game;
    this.ctx = game.ctx;
    this.moveDirection = 3; //1 is right, down, left, up
    this.lookDirectionRight = false;
    this.hp = 1;//50
    this.animationWalkLeft = new Animation(AM.getAsset("./img/slime.png")
    , 5, 70, 73, 80, 7, .135, 7, true, 1, false);
    this.animationDisappearLeft = new Animation(AM.getAsset("./img/slime.png")
    , 5, 341, 70, 65, 5, 0.2, 5, false, 1, false);
    this.animationWalkRight = new Animation(AM.getAsset("./img/slimeFlip.png")
    , 239, 137, 73, 80, 7, 0.135, 7, true, 1, true);
    this.animationDisappearRight = new Animation(AM.getAsset("./img/slimeFlip.png")
    , 0, 341, 70, 65, 5, 0.2, 5, false, 1, true);
}

slimeGreen.prototype.draw = function () {
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
                if (this.animationWalkLeft.currentFrame() == 4) {
                    this.animationWalkLeft.startY = 59;
                    // this.animationWalkLeft.frameHeight = 91;
                    // this.animationWalkLeft.frameWidth = 73;
                    this.animationWalkLeft.offsetY = -11;
                } else if (this.animationWalkLeft.currentFrame() == 1 ) {
                    this.animationWalkLeft.offsetX = -1;
                    this.animationWalkLeft.startX = 6;
                    // this.animationWalkLeft.frameWidth = 72;
                } else if (this.animationWalkLeft.currentFrame() <= 2) {
                    this.animationWalkLeft.offsetX = -.3;
                    this.animationWalkLeft.startX = 5.3;
                    // this.animationWalkLeft.frameWidth = 72;
                } else {
                    this.animationWalkLeft.startY = 70;
                    // this.animationWalkLeft.frameHeight = 80;
                    this.animationWalkLeft.offsetY = 0;
                    this.animationWalkLeft.offsetX = 0;
                    this.animationWalkLeft.startX = 5;
                    // this.animationWalkLeft.frameWidth = 73;
                }
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

slimeGreen.prototype.update = function () {
    // console.log(this.centerX + " " + this.centerY)
    // if(this.game.running) {
    //     var xy = getXY(this.centerX, this.centerY);
    //     if (((this.centerX +  100) % 100 > 48 && (this.centerX + 100) % 100 < 52
    //         && this.centerY % 100 > 48 && this.centerY % 100 < 52)) {
    //         this.moveDirection = getShortestPath(this.centerX, this.centerY);
    //         enemyUpdateLookHelper(this);
    //     }

        enemyUpdateHelper(this);

    //     xy = getXY(this.centerX, this.centerY);
    //     if (xy.x == GAMEBOARD.length - 1 && GAMEBOARD[xy.x][xy.y].end) {
    //         this.hp = 0; //dead
    //     } 
        
    //     // else i
    //     for (var i = 0; i < this.game.entities.length; i++) {
    //         var ent = this.game.entities[i];
    //         if (ent !== this && ent.isIce && collide(ent, this)) {
    //             ent.removeFromWorld = true;
    //             this.hp--;
    //         }
    //     }
    // }
}