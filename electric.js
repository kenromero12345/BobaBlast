function Electric(game, x, y, lvl) {
    this.animation = new Animation(AM.getAsset("./img/electric.png")
        ,0, 0, 1920/4, 960/2, 4, 0.03, 8, false, .25);
    this.game = game;
    this.ctx = game.ctx;
    this.isElectricity = true;
    this.speed = 200;
    this.x = x - 10;
    this.y = y - 20;
    this.width = this.animation.frameWidth * this.animation.scale;
    this.height = this.animation.frameHeight * this.animation.scale;
    this.boxes = true;
    this.paralysisLvl = lvl;
    this.paralysisProbAdder = 0;
    this.paralysisTimeAdder = 0;
    if (this.paralysisLvl == 2) {
        this.paralysisProbAdder = .5;
        this.paralysisTimeAdder = 500;
    } else if (this.paralysisLvl == 3) {
        this.paralysisProbAdder = .8;
        this.paralysisTimeAdder = 1000/1000;
    } 
    this.boundingbox = new BoundingBox(this.x + 25, this.y + 22
        , this.width - 50, this.height - 50);
}

Electric.prototype.draw = function() {
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

Electric.prototype.update = function() {
}
