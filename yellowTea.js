function yellowTea(game, spawnX, spawnY, isRun) {
    this.animationWalkLeft = new Animation(AM.getAsset("./img/yellowTea.png")
    , 0, 0, 65, 95, 4, 0.20, 4, true, 1, false);
    this.animationRunLeft = new Animation(AM.getAsset("./img/yellowTea.png")
    , 0, 100, 71, 83, 5, 0.18, 5, true, 1, false);
    this.animationWalkRight = new Animation(AM.getAsset("./img/yellowTeaFlip.png")
    , 830, 0, 65, 95, 4, 0.20, 4, true, 1, true);
    this.animationRunRight = new Animation(AM.getAsset("./img/yellowTeaFlip.png")
    , 730, 100, 71, 83, 5, 0.18, 5, true, 1, true);
    this.animationWalkUpLookRight = new Animation(AM.getAsset("./img/yellowTeaFlip.png")
    , 830, 0, 65, 95, 4, 0.20, 4, true, 1, true);
    this.animationRunUpLookRight = new Animation(AM.getAsset("./img/yellowTeaFlip.png")
    , 730, 100, 71, 83, 5, 0.18, 5, true, 1, true);
    this.animationWalkUpLookLeft = new Animation(AM.getAsset("./img/yellowTea.png")
    , 0, 0, 65, 95, 4, 0.20, 4, true, 1, false);
    this.animationRunUpLookLeft= new Animation(AM.getAsset("./img/yellowTea.png")
    , 0, 100, 71, 83, 5, 0.18, 5, true, 1, false);
    this.animationWalkDownLookRight = new Animation(AM.getAsset("./img/yellowTeaFlip.png")
    , 830, 0, 65, 95, 4, 0.20, 4, true, 1, true);
    this.animationRunDownLookRight = new Animation(AM.getAsset("./img/yellowTeaFlip.png")
    , 730, 100, 71, 83, 5, 0.18, 5, true, 1, true);
    this.animationWalkDownLookLeft = new Animation(AM.getAsset("./img/yellowTea.png")
    , 0, 0, 65, 95, 4, 0.20, 4, true, 1, false);
    this.animationRunDownLookLeft = new Animation(AM.getAsset("./img/yellowTea.png")
    , 0, 100, 71, 83, 5, 0.18, 5, true, 1, false);
    this.animationDisappearRight = new Animation(AM.getAsset("./img/yellowTeaFlip.png")
    , 635, 530, 75, 85, 6, 0.18, 6, false, 1, true);
    this.animationDisappearLeft = new Animation(AM.getAsset("./img/yellowTea.png")
    , -3, 534, 75, 85, 6, 0.18, 6, false, 1, false);
    this.walkWidth = 65;
    this.walkHeight = 95;
    this.runWidth = 71;
    this.runHeight= 83;
    this.name = "yellow";
    constructor(this, game, spawnX, spawnY, isRun);
}

yellowTea.prototype.draw = function () {
    if(this.game.running) {
        draw(this);
    }
}

yellowTea.prototype.update = function () {
    if(this.game.running) {
        update(this);
    }
}