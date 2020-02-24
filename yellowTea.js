function yellowTea(game, spawnX, spawnY, isRun, scale) {
    this.lifeDeduction = 3;
    this.animationWalkLeft = new Animation(AM.getAsset("./img/yellowTea.png")
    , 0, 0, 65, 95, 4, 0.20, 4, true, scale, false);
    this.animationRunLeft = new Animation(AM.getAsset("./img/yellowTea.png")
    , 0, 100, 71, 83, 5, 0.18, 5, true, scale, false);
    this.animationWalkRight = new Animation(AM.getAsset("./img/yellowTeaFlip.png")
    , 830, 0, 65, 95, 4, 0.20, 4, true, scale, true);
    this.animationRunRight = new Animation(AM.getAsset("./img/yellowTeaFlip.png")
    , 730, 100, 71, 83, 5, 0.18, 5, true, scale, true);
    this.animationDisappearRight = new Animation(AM.getAsset("./img/yellowTeaFlip.png")
    , 635, 530, 75, 85, 6, 0.18, 6, false, scale, true);
    this.animationDisappearLeft = new Animation(AM.getAsset("./img/yellowTea.png")
    , -3, 534, 75, 85, 6, 0.18, 6, false, scale, false);
    this.walkWidth = 65 * scale;
    this.walkHeight = 95 * scale;
    this.runWidth = 71 * scale;
    this.runHeight= 83 * scale;
    this.scale = scale;
    this.name = "yellow bubble tea";
    this.money = 20;
    walkRunTeaConstructor(this, game, spawnX, spawnY, isRun);
}

yellowTea.prototype.draw = function () {
    if(this.game.running) {
        walkRunTeaDraw(this);
    }
}

yellowTea.prototype.update = function () {
    if(this.game.running) {
        walkRunTeaUpdate(this);
    }
}