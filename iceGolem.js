function iceGolem(game, spawnX, spawnY, scale) {
    this.lifeDeduction = 10;
    this.name = "ice golem";
    this.speed = 15;
    this.hp = 1200;
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
        , this.animationWalkLeft.frameHeight, game, this.speed, this.animationWalkLeft.frameDuration, 1);
        //                               this.moveDirection = 3;
        // this.lookDirectionRight = false;
    this.freezeResistance = .99;
    this.burnResistance = .2;
}

iceGolem.prototype.setBoundingBox = function() {
    if(this.lookDirectionRight || this.moveDirection == 1 ) {
        this.boundingbox = new BoundingBox(this.x + 60 * this.scale, this.y + 13 * this.scale
            , this.width - 120 * this.scale , this.height -48 * this.scale);
    } else {
        this.boundingbox = new BoundingBox(this.x + 58 * this.scale, this.y + 13 * this.scale
            , this.width - 120 * this.scale , this.height -48 * this.scale);
    }
}

iceGolem.prototype.draw = function () {
    // console.log(this.centerX)
    enemyDraw(this);
    drawHP(this, 0, -5);
}

iceGolem.prototype.update = function () {
    // console.log(this.centerX + " " + this.centerY)
    if(this.game.running) {
        enemyChooseDir(this);

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