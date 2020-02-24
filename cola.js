function cola(game, spawnX, spawnY, scale, isWhite) {
    this.lifeDeduction = 2;
    this.isWhite = isWhite;
    this.name = "cola";
    this.speed = 100;
    this.hp = 30;//50
    this.money = 20;
    if (isWhite) {
        this.hp = 60;
        this.animationWalkLeft = new Animation(AM.getAsset("./img/sprite.png")
        , 0, 137, 65, 65, 4, 0.1, 4, true, scale, false);
        this.animationDisappearLeft = new Animation(AM.getAsset("./img/sprite.png")
        , 0, 341, 70, 65, 5, 0.2, 5, false, scale, false);
        this.animationWalkRight = new Animation(AM.getAsset("./img/spriteFlip.png")
        , 239, 137, 65, 65, 4, 0.10, 4, true, scale, true);
        this.animationDisappearRight = new Animation(AM.getAsset("./img/spriteFlip.png")
        , 0, 341, 70, 65, 5, 0.2, 5, false, scale, true);
    } else {
        this.animationWalkLeft = new Animation(AM.getAsset("./img/cola.png")
        , 0, 137, 65, 65, 4, 0.1, 4, true, scale, false);
        this.animationDisappearLeft = new Animation(AM.getAsset("./img/cola.png")
        , 0, 341, 70, 65, 5, 0.2, 5, false, scale, false);
        this.animationWalkRight = new Animation(AM.getAsset("./img/colaFlip.png")
        , 239, 137, 65, 65, 4, 0.10, 4, true, scale, true);
        this.animationDisappearRight = new Animation(AM.getAsset("./img/colaFlip.png")
        , 0, 341, 70, 65, 5, 0.2, 5, false, scale, true);
    }
    enemyConstructor(this, scale, spawnX, spawnY, this.animationWalkLeft.frameWidth
        , this.animationWalkLeft.frameHeight, game, this.speed, this.animationWalkLeft.frameDuration, 4);
        //                       this.moveDirection = 3;
        // this.lookDirectionRight = false;
}

cola.prototype.setBoundingBox = function() {
    if(this.lookDirectionRight || this.moveDirection == 1 ) {
        this.boundingbox = new BoundingBox(this.x + 10 * this.scale, this.y + 10 * this.scale
            , this.width - 23 * this.scale , this.height -16 * this.scale);
    } else {
        this.boundingbox = new BoundingBox(this.x + 13 * this.scale, this.y + 10 * this.scale
            , this.width - 23 * this.scale , this.height -16 * this.scale);
    }
}

cola.prototype.draw = function () {
    // console.log(this.centerX)
    enemyDraw(this);
}

cola.prototype.update = function () {
    // console.log(this.centerX + " " + this.centerY)
    if(this.game.running) {
        enemyChooseDir(this);
        // console.log(this.centerGap);
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