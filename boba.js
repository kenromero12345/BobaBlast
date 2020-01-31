function boba(game, startX, startY, destinationX, destinationY) {
    this.name = "BOBA";
    this.animation = new Animation(AM.getAsset("./img/22137.png"), 14, 445, 28, 28, 1, 0.1, 1, true, 1);
    this.x = startX;
    this.y = startY;
    this.isBoba = true;
    this.destinationX = destinationX;
    this.destinationY = destinationY;
    this.backward = false;
    this.yDiff = destinationY - startY;
    this.xDiff = destinationX - startX;
    if(this.xDiff === 0) {
        this.slope = undefined;
    } else {
        this.slope = this.yDiff / this.xDiff;
    }
    if(this.xDiff < 0) {
        this.backward = true;
    }
    if(this.backward && this.yDiff < 0) {
        this.slope = -1 * this.slope;
    }
    this.width = 28;
    this.height = 28;
    this.speed = 100;
    this.game = game;
    this.ctx = game.ctx;
    this.noCollision = true;
}

boba.prototype.draw = function () {
    if(this.game.running) {
        if(this.noCollision) {
            this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
        }
    }
}

boba.prototype.update = function () {
    if(this.game.running) {
        if(!this.backward && this.slope !== undefined) {
            this.x += this.game.clockTick * this.speed;
        } else if (this.slope !== undefined)  {
            this.x -= this.game.clockTick * this.speed;
        }
        if(this.slope === undefined)  this.y += this.game.clockTick * this.speed;
        else this.y += this.slope * this.game.clockTick * this.speed;
    }


}