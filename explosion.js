function Explosion(game, x, y) {
    this.animation = new Animation(AM.getAsset("./img/explosion.png"),20, 33, 100, 100, 8, 0.1, 48, false, 1);
    this.game = game;
    this.ctx = game.ctx;
    this.isExplosion = true;
    this.speed = 200;
    this.x = x;
    this.y = y;
    this.boxes = true;
    this.boundingbox = new BoundingBox(this.x, this.y, this.width, this.height);
}

Explosion.prototype.draw = function() {
    if (this.animation.isDone()) {
        this.removeFromWorld = true;
    }
    if (this.boxes) {
        this.ctx.strokeStyle = "red";
        this.ctx.strokeRect(this.x, this.y, this.animation.frameWidth, this.animation.frameHeight);
        this.ctx.strokeStyle = "green";
        this.ctx.strokeRect(this.boundingbox.x, this.boundingbox.y, this.boundingbox.width, this.boundingbox.height);
    }
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
}

Explosion.prototype.update = function() {
}
