function cakeChoco(game, spawnX, spawnY, scale) {
    this.lifeDeduction = 8;
    this.name = "choco cake";
    this.speed = 100;
    this.hp = 30;//
    this.money = 50;
    this.animationWalkLeft = new Animation(AM.getAsset("./img/cakeChoco.png")
    , 0, 122, 96, 101, 6, .135, 6, true, scale, false);
    this.animationDisappearLeft = new Animation(AM.getAsset("./img/cakeChoco.png")
    , 0, 365, 96, 103, 7, .2, 7, false, scale, false);
    this.animationWalkRight = new Animation(AM.getAsset("./img/cakeChocoFlip.png")
    , 847, 122, -96, 102, 6, .135, 6, true, scale, false);
    this.animationDisappearRight = new Animation(AM.getAsset("./img/cakeChocoFlip.png")
    , 847, 221, -91, 94, 7, .2, 7, false, scale, false);
    enemyConstructor(this, scale, spawnX, spawnY, this.animationWalkLeft.frameWidth
        , this.animationWalkLeft.frameHeight, game, this.speed);
}

cakeChoco.prototype.setBoundingBox = function() {
    if(this.lookDirectionRight || this.moveDirection == 1 ) {
        this.boundingbox = new BoundingBox(this.x + 22 * this.scale, this.y + 23 * this.scale
            , this.width - 32 * this.scale , this.height -23 * this.scale);
    } else {
        this.boundingbox = new BoundingBox(this.x + 10 * this.scale, this.y + 23 * this.scale
            , this.width - 32 * this.scale , this.height - 23 * this.scale);
    }
}

cakeChoco.prototype.draw = function () {
    if(this.game.running) {
        if (this.hp <= 0) {
            if (this.lookDirectionRight) {
                if (this.animationDisappearRight.currentFrame() == 1) {
                    this.animationDisappearRight.startY = 345;
                    this.animationDisappearRight.offsetY = -20;
                    this.animationDisappearRight.frameHeight = 120;
                } else if (this.animationDisappearRight.currentFrame() == 2) {
                    this.animationDisappearRight.startY = 365;
                    this.animationDisappearRight.offsetY = 0;
                    this.animationDisappearRight.frameHeight = 113;
                    this.animationDisappearRight.offsetX = -18;
                    this.animationDisappearRight.startX = 847+10;
                    this.animationDisappearRight.frameWidth = -110;
                } else if (this.animationDisappearRight.currentFrame() == 3) {
                    this.animationDisappearRight.startY = 365;
                    this.animationDisappearRight.offsetY = 0;
                    this.animationDisappearRight.frameHeight = 110;
                    this.animationDisappearRight.offsetX = -29;
                    this.animationDisappearRight.startX = 847+70;
                    this.animationDisappearRight.frameWidth = -130;
                } else if (this.animationDisappearRight.currentFrame() == 4) {
                    this.animationDisappearRight.startY = 365;
                    this.animationDisappearRight.offsetY = 0;
                    this.animationDisappearRight.frameHeight = 110;
                    this.animationDisappearRight.offsetX = -29;
                    this.animationDisappearRight.startX = 847+70;
                    this.animationDisappearRight.frameWidth = -130;
                } else if (this.animationDisappearRight.currentFrame() == 5) {
                    this.animationDisappearRight.startY = 365;
                    this.animationDisappearRight.offsetY = 0;
                    this.animationDisappearRight.frameHeight = 110;
                    this.animationDisappearRight.offsetX = -29;
                    this.animationDisappearRight.startX = 847+70;
                    this.animationDisappearRight.frameWidth = -130;
                } else if (this.animationDisappearRight.currentFrame() == 6) {
                    this.animationDisappearRight.startY = 365;
                    this.animationDisappearRight.offsetY = 0;
                    this.animationDisappearRight.frameHeight = 110;
                    this.animationDisappearRight.offsetX = -29;
                    this.animationDisappearRight.startX = 847+70;
                    this.animationDisappearRight.frameWidth = -130;
                } else {
                    this.animationDisappearRight.startY = 365;
                    this.animationDisappearRight.offsetY = 0;
                    this.animationDisappearRight.frameHeight = 103;
                    this.animationDisappearRight.offsetX = 0;
                    this.animationDisappearRight.startX = 847;
                    this.animationDisappearRight.frameWidth = -96;
                }
                this.animationDisappearRight.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
                if (this.animationDisappearRight.isDone()) {
                    this.removeFromWorld = true;
                }
            } else {
                if (this.animationDisappearLeft.currentFrame() == 1) {
                    this.animationDisappearLeft.startY = 345;
                    this.animationDisappearLeft.offsetY = -20;
                    this.animationDisappearLeft.frameHeight = 120;
                } else if (this.animationDisappearLeft.currentFrame() == 2) {
                    this.animationDisappearLeft.startY = 365;
                    this.animationDisappearLeft.offsetY = 0;
                    this.animationDisappearLeft.frameHeight = 113;
                    this.animationDisappearLeft.offsetX = 8;
                    this.animationDisappearLeft.startX = -10;
                    this.animationDisappearLeft.frameWidth = 110;
                } else if (this.animationDisappearLeft.currentFrame() == 3) {
                    this.animationDisappearLeft.startY = 365;
                    this.animationDisappearLeft.offsetY = 0;
                    this.animationDisappearLeft.frameHeight = 110;
                    this.animationDisappearLeft.offsetX = 3;
                    this.animationDisappearLeft.startX = -68;
                    this.animationDisappearLeft.frameWidth = 130;
                } else if (this.animationDisappearLeft.currentFrame() == 4) {
                    this.animationDisappearLeft.startY = 365;
                    this.animationDisappearLeft.offsetY = 0;
                    this.animationDisappearLeft.frameHeight = 110;
                    this.animationDisappearLeft.offsetX = 3;
                    this.animationDisappearLeft.startX = -68;
                    this.animationDisappearLeft.frameWidth = 130;
                } else if (this.animationDisappearLeft.currentFrame() == 5) {
                    this.animationDisappearLeft.startY = 365;
                    this.animationDisappearLeft.offsetY = 0;
                    this.animationDisappearLeft.frameHeight = 110;
                    this.animationDisappearLeft.offsetX = 3;
                    this.animationDisappearLeft.startX = -68;
                    this.animationDisappearLeft.frameWidth = 130;
                } else if (this.animationDisappearLeft.currentFrame() == 6) {
                    this.animationDisappearLeft.startY = 365;
                    this.animationDisappearLeft.offsetY = 0;
                    this.animationDisappearLeft.frameHeight = 110;
                    this.animationDisappearLeft.offsetX = 3;
                    this.animationDisappearLeft.startX = -68;
                    this.animationDisappearLeft.frameWidth = 130;
                } else {
                    this.animationDisappearLeft.startY = 365;
                    this.animationDisappearLeft.offsetY = 0;
                    this.animationDisappearLeft.frameHeight = 103;
                    this.animationDisappearLeft.offsetX = 0;
                    this.animationDisappearLeft.startX = 0;
                    this.animationDisappearLeft.frameWidth = 96;
                }
                this.animationDisappearLeft.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
                if (this.animationDisappearLeft.isDone()) {
                    this.removeFromWorld = true;
                }
            }
        } else {
            if (this.moveDirection == 1) {
                cakeChocoRight(this);
            } else if (this.moveDirection == 2) {
                if (this.lookDirectionRight) {
                    cakeChocoRight(this);
                } else {
                    cakeChocoLeft(this);
                }
            } else if (this.moveDirection == 3) {
                cakeChocoLeft(this);
            } else {
                if (this.lookDirectionRight) {
                    cakeChocoRight(this);
                } else {
                    cakeChocoLeft(this);
                }
            }
            // this.drawBoundingBox();
            drawBoundingBox(this);
        }
    }
}

var cakeChocoLeft = function(enemy) {
    // if (enemy.animationWalkLeft.currentFrame() == 5) {
    //     enemy.animationWalkLeft.startX = 11;
    //     enemy.animationWalkLeft.width = 100;
    //     enemy.animationWalkLeft.offsetX = 0;
    // } else {
    //     enemy.animationWalkLeft.startX = 7;
    //     enemy.animationWalkLeft.width = 98;
    //     enemy.animationWalkLeft.offsetX = 0;
    // }
    enemy.animationWalkLeft.drawFrame(enemy.game.clockTick, enemy.ctx, enemy.x, enemy.y);
}

var cakeChocoRight = function(enemy) {
    // if (enemy.animationWalkRight.currentFrame() == 5) {
    //     enemy.animationWalkRight.startX = 803-11;
    //     enemy.animationWalkRight.width = -100;
    //     enemy.animationWalkRight.offsetX = 0;
    // } else if (enemy.animationWalkRight.currentFrame() == 2) {
    //     enemy.animationWalkRight.startX = 803-6;
    // } else {
    //     enemy.animationWalkRight.startX = 803-7;
    //     enemy.animationWalkRight.width = -98;
    //     enemy.animationWalkRight.offsetX = 0;
    // }
    enemy.animationWalkRight.drawFrame(enemy.game.clockTick, enemy.ctx, enemy.x, enemy.y);
}

cakeChoco.prototype.update = function () {
    // console.log(this.centerX + " " + this.centerY)
    if(this.game.running) {
        var xy = getXY(this.centerX, this.centerY);
        if (((this.centerX +  100) % 100 > 48 && (this.centerX + 100) % 100 < 52
            && this.centerY % 100 > 48 && this.centerY % 100 < 52)) {
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