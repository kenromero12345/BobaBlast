function ColaDrinkLookRight(game, xOffset) {
    this.animation = new Animation(AM.getAsset("./img/colaFlip.png"), 499, 35, -65, 65, 4, 0.10, 4, true, 1);
    this.animationDead = new Animation(AM.getAsset("./img/cola.png"), 0, 341, 70, 65, 5, 0.2, 5, true, 1);
    this.x = 330 + xOffset;
    this.y = 400;
    this.width = 52;
    this.height = 62;
    this.speed = 100;
    this.game = game;
    this.ctx = game.ctx;
    this.dead = false;
}

ColaDrinkLookRight.prototype.draw = function () {
    if(!this.dead) {
        this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    } else {
        this.animationDead.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    }
}

ColaDrinkLookRight.prototype.update = function () {
}

function ColaDrinkMoveLeft(game) {
    this.animationMoveLeft = new Animation(AM.getAsset("./img/cola.png"), 0, 137, 65, 65, 4, 0.1, 4, true, 1);
    this.x = 1500;
    this.y = 200;
    this.width = 52;
    this.height = 62;
    this.speed = 100;
    this.game = game;
    this.ctx = game.ctx;
}

ColaDrinkMoveLeft.prototype.draw = function () {
    this.animationMoveLeft.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);

}

ColaDrinkMoveLeft.prototype.update = function () {
    if (this.animationMoveLeft.elapsedTime < this.animationMoveLeft.totalTime * 8 /14 ) {
        this.x -= this.game.clockTick * this.speed;
    } 
    if (this.x < -100) this.x = 900;
}

function ColaDrinkMoveRight(game) {
    this.animation = new Animation(AM.getAsset("./img/colaFlip.png"), 499, 137, -65, 65, 4, 0.10, 4, true, 1);
    this.x = -100;
    this.y= 100;
    this.width = 52;
    this.height = 62;
    this.speed = 100;
    this.game = game;
    this.ctx = game.ctx;
}

ColaDrinkMoveRight.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
}

ColaDrinkMoveRight.prototype.update = function () {
    if (this.animation.elapsedTime < this.animation.totalTime * 8 /14 ) {
        this.x += this.game.clockTick * this.speed;
    } 
    if (this.x > 900) this.x = -200;
    for (var i = 0; i < this.game.entities.length; i++) {
        var ent = this.game.entities[i];
        if (ent !== this && collide(ent, this) && !ent.dead) {
            ent.dead = true;
            this.game.addEntity(new Explosion(this.game));
        }
    } 
}

function ColaDrinkLookLeft(game) {
    this.animation = new Animation(AM.getAsset("./img/cola.png"), 0, 35, 65, 65, 4, 0.10, 4, true, 1);
    this.animationDead = new Animation(AM.getAsset("./img/cola.png"), 0, 341, 70, 65, 5, 0.2, 5, false, 1);
    this.x = 330;
    this.y = 100;
    this.width = 52;
    this.height = 62;
    this.speed = 100;
    this.game = game;
    this.ctx = game.ctx;
    this.dead = false;
}

ColaDrinkLookLeft.prototype.draw = function () {
    if(!this.dead) {
        this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    } else {
        this.animationDead.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    }
}

ColaDrinkLookLeft.prototype.update = function () {
}