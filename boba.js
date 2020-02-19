function boba(game, startX, startY, destinationX, destinationY) {
    this.name = "BOBA";
    this.animation = new Animation(AM.getAsset("./img/boba.png"), 0, 0, 20, 20, 1, 0.1, 1, true, 1);
    this.x = startX;
    this.y = startY;
    this.isBoba = true;
    this.destinationX = destinationX;
    this.destinationY = destinationY;
    this.backward = false;
    this.upward = false;
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
    if(this.yDiff < 0) {
        this.upward = true;
    }
    if(this.backward && this.upward) {
        this.slope = -1 * this.slope;
    } else if (this.backward) {
        this.slope = -1 * this.slope;
    }
    this.width = 28;
    this.height = 28;
    this.speed = 500;
    this.game = game;
    this.ctx = game.ctx;
    this.noCollision = true;
    this.boxes = true;
    this.boundingbox = new BoundingBox(this.x + 5, this.y + 5, this.width -10, this.height - 10);
}

boba.prototype.draw = function () {
    if(this.game.running) {
        if(this.noCollision) {
            if (this.boxes) {
                this.ctx.strokeStyle = "red";
                this.ctx.strokeRect(this.x, this.y, this.animation.frameWidth, this.animation.frameHeight);
                this.ctx.strokeStyle = "green";
                this.ctx.strokeRect(this.boundingbox.x, this.boundingbox.y, this.boundingbox.width, this.boundingbox.height);
            }
            this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
        }
    }
}

boba.prototype.update = function () {
    if(this.game.running) {
        // Remove Boba if It Goes Out of Range
        if(this.backward && this.x < this.destinationX) {
            this.removeFromWorld = true;
        } else if (!this.backward && this.x > this.destinationX) {
            this.removeFromWorld = true;
        }
        if(!this.backward && this.slope !== undefined) {
            this.x += this.game.clockTick * this.speed;
            // this.boundingbox.x += this.game.clockTick * this.speed;
        } else if (this.slope !== undefined)  {
            this.x -= this.game.clockTick * this.speed;
            // this.boundingbox.x -= this.game.clockTick * this.speed;
        }
        if(this.slope === undefined)  {
            this.y += this.game.clockTick * this.speed;
            // this.boundingbox.y += this.game.clockTick * this.speed;
        }
        else {
            this.y += this.slope * this.game.clockTick * this.speed;
            // this.boundingbox.y += this.slope * this.game.clockTick * this.speed;
        }
        this.boundingbox = new BoundingBox(this.x + 5, this.y + 5, this.width -10, this.height - 10);
    }


}