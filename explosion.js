function Explosion(game, x, y, lvl) {
    this.animation = new Animation(AM.getAsset("./img/explosion.png")
        ,20, 28, 100, 100, 8, 0.03, 28, false, 1);
    this.game = game;
    this.ctx = game.ctx;
    // this.isExplosion = true;
    this.speed = 200;
    this.x = x - 10;
    this.y = y - 20;
    this.width = this.animation.frameWidth;
    this.height = this.animation.frameHeight;
    this.boxes = false;
    this.burnLvl = lvl;
    this.burnProbAdder = 0;
    this.burnTimeAdder = 0;
    if (this.burnLvl == 2) {
        this.burnProbAdder = .5;
        this.burnTimeAdder = 500/100;
    } else if (this.burnLvl == 3) {
        this.burnProbAdder = .8;
        this.burnTimeAdder = 1000/1000;
    } 
    // console.log(this.burnLvl)
    this.boundingbox = new BoundingBox(this.x + 25, this.y + 22, this.width - 50, this.height - 50);
}

Explosion.prototype.draw = function() {
    if (this.animation.isDone()) {
        this.removeFromWorld = true;
    } else {
        if (this.boxes) {
            this.ctx.strokeStyle = "red";
            this.ctx.strokeRect(this.x, this.y, this.animation.frameWidth, this.animation.frameHeight);
            this.ctx.strokeStyle = "green";
            this.ctx.strokeRect(this.boundingbox.x, this.boundingbox.y, this.boundingbox.width, this.boundingbox.height);
        }
        this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    }
}

Explosion.prototype.update = function() {
}
