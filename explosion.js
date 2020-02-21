function Explosion(game, x, y) {
    this.animation = new Animation(AM.getAsset("./img/explosion.png"),20, 33, 100, 100, 8, 0.1, 48, false, 1);
    this.game = game;
    this.ctx = game.ctx;
    this.speed = 200;
    this.x = x;
    this.y = y;
}

Explosion.prototype.draw = function() {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
}

Explosion.prototype.update = function() {
}

Explosion.prototype.draw = function() {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
}