function greenTea(game, spawnX, spawnY, isRun, scale) {
    this.lifeDeduction = 1;
    this.animationWalkLeft = new Animation(AM.getAsset("./img/greenTea.png")
    , 0, 0, 65, 95, 4, 0.20, 4, true, scale, false);
    this.animationRunLeft = new Animation(AM.getAsset("./img/greenTea.png")
    , 0, 100, 72, 85, 5, 0.18, 5, true, scale, false);
    this.animationWalkRight = new Animation(AM.getAsset("./img/greenTeaFlip.png")
    , 730, 0, 65, 95, 4, 0.20, 4, true, scale, true);
    this.animationRunRight = new Animation(AM.getAsset("./img/greenTeaFlip.png")
    , 637, 100, 72, 85, 5, 0.18, 5, true, scale, true);
    this.animationDisappearRight = new Animation(AM.getAsset("./img/greenTeaFlip.png")
    , 553, 530, 74, 85, 6, 0.18, 6, false, scale, true);
    this.animationDisappearLeft = new Animation(AM.getAsset("./img/greenTea.png")
    , 0, 537, 74, 85, 6, 0.18, 6, false, scale, false);
    this.walkWidth = 65 * scale;
    this.walkHeight = 95 * scale;
    this.runWidth = 72 * scale;
    this.runHeight= 85 * scale;
    this.scale = scale;
    this.name = "green bubble tea";
    this.money = 10;
    constructor(this, game, spawnX, spawnY, isRun);
}

greenTea.prototype.draw = function () {
    if(this.game.running) {
        draw(this);
    }
}

greenTea.prototype.update = function () {
    if(this.game.running) {
        update(this);
    }
}