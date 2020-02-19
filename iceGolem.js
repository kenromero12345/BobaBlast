function iceGolem(game, spawnX, spawnY, scale) {
    this.lifeDeduction = 10;
    this.name = "ice golem";
    this.speed = 15;
    this.hp = 100;
    this.money = 200;
    this.animationWalkLeft = new Animation(AM.getAsset("./img/iceg.png")
    , 0, 180, 194, 180, 4, 0.5, 4, true, scale, false );
    this.animationDisappearLeft = new Animation(AM.getAsset("./img/iceg.png")
    , 0, 745, 238, 180, 7, 0.25, 7, false, scale, false);
    this.animationWalkRight = new Animation(AM.getAsset("./img/icegFlip.png")
    , 870, 180, 194, 180, 4, 0.5, 4, true, scale, true );
    this.animationDisappearRight = new Animation(AM.getAsset("./img/icegFlip.png")
    , 0, 745, 238, 180, 7, 0.25, 7, false, scale, true);
    enemyConstructor(this, scale, spawnX, spawnY, this.animationWalkLeft.frameWidth
        , this.animationWalkLeft.frameHeight, game, this.speed);
}

iceGolem.prototype.setBoundingBox = function() {
    if(this.lookDirectionRight || this.moveDirection == 1 ) {
        this.boundingbox = new BoundingBox(this.x + 10 * this.scale, this.y + 10 * this.scale
            , this.width - 20 * this.scale , this.height -40 * this.scale);
    } else {
        this.boundingbox = new BoundingBox(this.x + 10 * this.scale, this.y + 10 * this.scale
            , this.width - 25 * this.scale , this.height -40 * this.scale);
    }
}

iceGolem.prototype.draw = function () {
    // console.log(this.centerX)
    enemyDraw(this);
}

iceGolem.prototype.update = function () {
    // console.log(this.centerX + " " + this.centerY)
    if(this.game.running) {
        var xy = getXY(this.centerX, this.centerY);
        if (((this.centerX +  100) % 100 > 49 && (this.centerX + 100) % 100 < 51
            && this.centerY % 100 > 49 && this.centerY % 100 < 51)) {
            this.moveDirection = getShortestPath(this.centerX, this.centerY);
            enemyUpdateLookHelper(this);
        }

        enemyUpdateHelper(this);

        this.setBoundingBox();

        enemyEscape(this);

        // for (var i = 0; i < this.game.entities.length; i++) {
        //     var ent = this.game.entities[i];
        //     if (ent !== this && ent.isBoba && this.boundingbox.collide(ent.boundingbox)) {
        //         ent.removeFromWorld = true;
        //         this.hp--;
        //     }
        // }
        collideUpdate(this);

        moneyUpdate(this);

        enemyStatusEffectUpdate(this);
    }
}