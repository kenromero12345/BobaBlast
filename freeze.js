function Freeze(game, x, y, lvl) {
    this.animation = new Animation(AM.getAsset("./img/freeze.png")
        ,0, 0, 256/4, 384/6, 4, 0.03, 12, false, 1.5);
    this.game = game;
    this.ctx = game.ctx;
    // this.isFroze = true;
    this.speed = 100;
    this.x = x - 10;
    this.y = y - 25;
    this.width = this.animation.frameWidth * this.animation.scale;
    this.height = this.animation.frameHeight * this.animation.scale;
    this.boxes = false;
    this.freezeLvl = lvl;
    this.freezeProbAdder = 0;
    this.freezeTimeAdder = 0;
    if (this.freezeLvl == 2) {
        this.freezeProbAdder = .5;
        this.freezeTimeAdder = 3000;
    } else if (this.freezeLvl == 3) {
        this.freezeProbAdder = .8;
        this.freezeTimeAdder = 5000/1000;
    }
    this.boundingbox = new BoundingBox(this.x + 15, this.y + 20
        , this.width - 30, this.height - 35);
}

Freeze.prototype.draw = function() {
    if (this.animation.isDone()) {
        this.removeFromWorld = true;
    } else {
        if (this.boxes) {
            this.ctx.strokeStyle = "red";
            this.ctx.strokeRect(this.x, this.y, this.width, this.height);
            this.ctx.strokeStyle = "green";
            this.ctx.strokeRect(this.boundingbox.x, this.boundingbox.y, this.boundingbox.width, this.boundingbox.height);
        }
        this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    }
}

Freeze.prototype.update = function() {
}
