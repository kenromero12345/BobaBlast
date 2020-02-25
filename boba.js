function boba(game, startX, startY, name, target) {
    this.target = target;
    this.name = "BOBA";
    this.isFreeze = false;
    if(name ==='blue') {
        this.isFreeze = true;
    }
    this.isPoison = false;
    if(name ==='green') {
        this.isPoison = true;
    }
    this.isParalyze = false;
    if(name ==='purple') {
        this.isParalyze = true;
    }
    this.isExplosive = false;
    if(name ==='red') {
        this.isExplosive = true;
    }
    if(name ==='gold') {
        this.homing = true;
    }
    /*
        this.isFire = false;
    if(name ==='poop') {
        this.isFire = true;
    }*/
    this.animation = new Animation(AM.getAsset("./img/boba.png"), 0, 0, 20, 20, 1, 0.1, 1, true, 1);
    this.x = startX;
    this.y = startY;
    this.isBoba = true;
    // if (this.homing) {
    //     this.destinationX = target.centerX;
    //     this.destinationY = target.centerY;
    //     this.backward = false;
    //     this.upward = false;
    //     this.yDiff = this.destinationY - startY;
    //     this.xDiff = this.destinationX - startX;
    //     if(this.xDiff === 0) {
    //         this.slope = undefined;
    //     } else {
    //         this.slope = this.yDiff / this.xDiff;
    //     }
    //     if(this.xDiff < 0) {
    //         this.backward = true;
    //     }
    //     if(this.yDiff < 0) {
    //         this.upward = true;
    //     }
    //     if(this.backward && this.upward) {
    //         this.slope = -1 * this.slope;
    //     } else if (this.backward) {
    //         this.slope = -1 * this.slope;
    //     }
    // } else {
    //     this.destinationX = destinationX;
    //     this.destinationY = destinationY;
    //     this.backward = false;
    //     this.upward = false;
    //     this.yDiff = destinationY - startY;
    //     this.xDiff = destinationX - startX;
    //     if(this.xDiff === 0) {
    //         this.slope = undefined;
    //     } else {
    //         this.slope = this.yDiff / this.xDiff;
    //     }
    //     if(this.xDiff < 0) {
    //         this.backward = true;
    //     }
    //     if(this.yDiff < 0) {
    //         this.upward = true;
    //     }
    //     if(this.backward && this.upward) {
    //         this.slope = -1 * this.slope;
    //     } else if (this.backward) {
    //         this.slope = -1 * this.slope;
    //     }
    // }
    // this.destinationX = destinationX;
    // this.destinationY = destinationY;
    var dir = direction({'x':this.target.centerX - 10, 'y':this.target.centerY - 13}, this);
    // console.log(dir)
    this.velocity = dir;
    // console.log(dir)
    // this.velocity.x = dir.x;
    // this.velocity.y = dir.y;

    var speed = Math.sqrt(this.velocity.x * this.velocity.x + this.velocity.y * this.velocity.y);
    // console.log(speed)
    // if (speed > this.speed) {
        // var ratio = this.speed / speed;
        // this.velocity.x *= ratio;
        // this.velocity.y *= ratio;
    // }
    this.width = 28;
    this.height = 28;
    this.speed = 500;
    this.game = game;
    this.ctx = game.ctx;
    this.noCollision = true;
    this.boxes = false;
    this.boundingbox = new BoundingBox(this.x + 6, this.y + 13, this.width -21, this.height - 23);
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
        if (this.homing) {
            if (this.target.hp < 1) {
                this.removeFromWorld = true;
            }
            // this.destinationX = this.target.centerX;
            // this.destinationY = this.target.centerY;
            this.velocity = direction({'x':this.target.centerX -10, 'y':this.target.centerY - 13}, this);
            // this.velocity.x = dir.x;
            // this.velocity.y = dir.y;
        
            // var speed = Math.sqrt(this.velocity.x * this.velocity.x + this.velocity.y * this.velocity.y);
            // // if (speed > this.speed) {
            //     var ratio = this.speed / speed;
            //     this.velocity.x *= ratio;
            //     this.velocity.y *= ratio;
            // }
            // this.destinationX = this.target.centerX - 10;
            // this.destinationY = this.target.centerY - 13;
            // this.backward = false;
            // this.upward = false;
            // this.yDiff = this.destinationY - this.y;
            // this.xDiff = this.destinationX - this.x;
            // if(this.xDiff === 0) {
            //     this.slope = undefined;
            // } else {
            //     this.slope = this.yDiff / this.xDiff;
            // }
            // if(this.xDiff < 0) {
            //     this.backward = true;
            // }
            // if(this.yDiff < 0) {
            //     this.upward = true;
            // }
            // if(this.backward && this.upward) {
            //     this.slope = -1 * this.slope;
            // } else if (this.backward) {
            //     this.slope = -1 * this.slope;
            // }
        }
        // Remove Boba if It Goes Out of Range
        // if(this.backward && this.x < this.destinationX) {
        //     this.removeFromWorld = true;
        // } else if (!this.backward && this.x > this.destinationX) {
        //     this.removeFromWorld = true;
        // }
        if (this.x < 0 || this.y < 0 || this.x > 1200 ||  this.y > 600) {
            this.removeFromWorld = true;
        }
        // if(!this.backward && this.slope !== undefined) {
        //     if(Math.abs(this.slope) <= 10) {
        //         this.x += this.game.clockTick * this.speed;
        //     } else {
        //         this.x += this.game.clockTick * this.speed / 10;
        //     }
        //     // this.boundingbox.x += this.game.clockTick * this.speed;
        // } else if (this.slope !== undefined)  {
        //     if(Math.abs(this.slope) <= 10) {
        //         this.x -= this.game.clockTick * this.speed;
        //     } else {
        //         this.x -= this.game.clockTick * this.speed / 10;
        //     }
        //     // this.boundingbox.x -= this.game.clockTick * this.speed;
        // }
        // if(this.slope === undefined)  {
        //     this.y += this.game.clockTick * this.speed;
        //     // this.boundingbox.y += this.game.clockTick * this.speed;
        // }
        // else {
        //     if(Math.abs(this.slope) <= 10) {
        //         this.y += this.slope * this.game.clockTick * this.speed;
        //     } else {
        //         this.y += this.slope / 10 * this.game.clockTick * this.speed;
        //     }
        //     // this.boundingbox.y += this.slope * this.game.clockTick * this.speed;
        // }
        // this.velocity.x += this.action.direction.x;
        // this.velocity.y += this.action.direction.y;
        // console.log(this.velocity)
        this.x += this.velocity.x * this.game.clockTick * this.speed;
        this.y += this.velocity.y * this.game.clockTick * this.speed;
        this.boundingbox = new BoundingBox(this.x + 6, this.y + 13, this.width -21, this.height - 23);
    }
}