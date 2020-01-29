function greenTea(game, spawnX, spawnY, isRun) {
    this.animationWalkLeft = new Animation(AM.getAsset("./img/greenTea.png")
    , 0, 0, 65, 95, 4, 0.20, 4, true, 1, false);
    this.animationRunLeft = new Animation(AM.getAsset("./img/greenTea.png")
    , 0, 100, 72, 85, 5, 0.18, 5, true, 1, false);
    this.animationWalkRight = new Animation(AM.getAsset("./img/greenTeaFlip.png")
    , 730, 0, 65, 95, 4, 0.20, 4, true, 1, true);
    this.animationRunRight = new Animation(AM.getAsset("./img/greenTeaFlip.png")
    , 637, 100, 72, 85, 5, 0.18, 5, true, 1, true);
    this.animationWalkUpLookRight = new Animation(AM.getAsset("./img/greenTeaFlip.png")
    , 730, 0, 65, 95, 4, 0.20, 4, true, 1, true);
    this.animationRunUpLookRight = new Animation(AM.getAsset("./img/greenTeaFlip.png")
    , 637, 100, 72, 85, 5, 0.18, 5, true, 1, true);
    this.animationWalkUpLookLeft = new Animation(AM.getAsset("./img/greenTea.png")
    , 0, 0, 65, 95, 4, 0.20, 4, true, 1, false);
    this.animationRunUpLookLeft= new Animation(AM.getAsset("./img/greenTea.png")
    , 0, 100, 72, 85, 5, 0.18, 5, true, 1, false);
    this.animationWalkDownLookRight = new Animation(AM.getAsset("./img/greenTeaFlip.png")
    , 730, 0, 65, 95, 4, 0.20, 4, true, 1, true);
    this.animationRunDownLookRight = new Animation(AM.getAsset("./img/greenTeaFlip.png")
    , 637, 100, 72, 85, 5, 0.18, 5, true, 1, true);
    this.animationWalkDownLookLeft = new Animation(AM.getAsset("./img/greenTea.png")
    , 0, 0, 65, 95, 4, 0.20, 4, true, 1, false);
    this.animationRunDownLookLeft = new Animation(AM.getAsset("./img/greenTea.png")
    , 0, 100, 72, 85, 5, 0.18, 5, true, 1, false);
    this.animationDisappearRight = new Animation(AM.getAsset("./img/greenTeaFlip.png")
    , 553, 530, 74, 85, 6, 0.18, 6, false, 1, true);
    this.animationDisappearLeft = new Animation(AM.getAsset("./img/greenTea.png")
    , 0, 537, 74, 85, 6, 0.18, 6, false, 1, false);
    this.walkWidth = 65;
    this.walkHeight = 95;
    this.runWidth = 72;
    this.runHeight= 85;
    this.name = "green";
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