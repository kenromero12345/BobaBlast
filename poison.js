function Poison(game, x, y, lvl) {
    this.animation = new Animation(AM.getAsset("./img/poison.png")
        ,0, 0, 950/5, 576/3, 5, 0.03, 15, false, .65);
    this.game = game;
    this.ctx = game.ctx;
    // this.isPoison = true;
    this.speed = 100;
    this.x = x - 10;
    this.y = y - 20;
    this.width = this.animation.frameWidth * this.animation.scale;
    this.height = this.animation.frameHeight * this.animation.scale;
    this.boxes = false;
    this.poisonLvl = lvl;
    this.poisonProbAdder = 0;
    this.poisonTimeAdder = 0;
    if (this.poisonLvl == 2) {
        this.poisonProbAdder = .5;
        this.poisonTimeAdder = 3000/1000;
    } else if (this.poisonLvl == 3) {
        this.poisonProbAdder = .8;
        this.poisonTimeAdder = 5000/1000;
    } 
    this.boundingbox = new BoundingBox(this.x + 20, this.y + 20
        , this.width - 40, this.height - 40);
}

Poison.prototype.draw = function() {
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

Poison.prototype.update = function() {
}
