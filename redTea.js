function redTea(game, spawnX, spawnY, isRun, scale) {
    this.lifeDeduction = 1;
    this.animationWalkLeft = new Animation(AM.getAsset("./img/22137.png")
    , 0, 0, 65, 95, 4, 0.20, 4, true, scale, false);
    this.animationRunLeft = new Animation(AM.getAsset("./img/22137.png")
    , 0, 100, 72, 85, 5, 0.18, 5, true, scale, false);
    this.animationWalkRight = new Animation(AM.getAsset("./img/22137Flip.png")
    , 785, 0, 65, 95, 4, 0.20, 4, true, scale, true);
    this.animationRunRight = new Animation(AM.getAsset("./img/22137Flip.png")
    , 678, 100, 72, 85, 5, 0.18, 5, true, scale, true);
    this.animationDisappearRight = new Animation(AM.getAsset("./img/22137Flip.png")
    , 593, 560, 74, 85, 6, 0.18, 6, false, scale, true);
    this.animationDisappearLeft = new Animation(AM.getAsset("./img/22137.png")
    , 0, 560, 74, 85, 6, 0.18, 6, false, scale, false);
    this.walkWidth = 65 * scale;
    this.walkHeight = 95 * scale;
    this.runWidth = 72 * scale;
    this.runHeight= 85 * scale;
    this.scale = scale;
    this.name = "red";
    this.money = 10;
    constructor(this, game, spawnX, spawnY, isRun);
}

redTea.prototype.draw = function () {
    if(this.game.running) {
        draw(this);
    }
}

redTea.prototype.update = function () {
    if(this.game.running) {
        update(this);
    }
}