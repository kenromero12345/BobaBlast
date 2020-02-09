// function ColaDrinkLookRight(game, xOffset) {
//     this.animation = new Animation(AM.getAsset("./img/colaFlip.png"), 499, 35, -65, 65, 4, 0.10, 4, true, 1);
//     this.animationDead = new Animation(AM.getAsset("./img/cola.png"), 0, 341, 70, 65, 5, 0.2, 5, true, 1);
//     this.x = 330 + xOffset;
//     this.y = 400;
//     this.width = 52;
//     this.height = 62;
//     this.speed = 100;
//     this.game = game;
//     this.ctx = game.ctx;
//     this.dead = false;
// }

// ColaDrinkLookRight.prototype.draw = function () {
//     if(!this.dead) {
//         this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
//     } else {
//         this.animationDead.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
//     }
// }

// ColaDrinkLookRight.prototype.update = function () {
// }

// function ColaDrinkMoveLeft(game) {
//     this.animationMoveLeft = new Animation(AM.getAsset("./img/cola.png"), 0, 137, 65, 65, 4, 0.1, 4, true, 1);
//     this.x = 1500;
//     this.y = 200;
//     this.width = 52;
//     this.height = 62;
//     this.speed = 100;
//     this.game = game;
//     this.ctx = game.ctx;
// }

// ColaDrinkMoveLeft.prototype.draw = function () {
//     this.animationMoveLeft.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);

// }

// ColaDrinkMoveLeft.prototype.update = function () {
//     if (this.animationMoveLeft.elapsedTime < this.animationMoveLeft.totalTime * 8 /14 ) {
//         this.x -= this.game.clockTick * this.speed;
//     } 
//     if (this.x < -100) this.x = 900;
// }

// function ColaDrinkMoveRight(game) {
//     this.animation = new Animation(AM.getAsset("./img/colaFlip.png"), 499, 137, -65, 65, 4, 0.10, 4, true, 1);
//     this.x = -100;
//     this.y= 100;
//     this.width = 52;
//     this.height = 62;
//     this.speed = 100;
//     this.game = game;
//     this.ctx = game.ctx;
// }

// ColaDrinkMoveRight.prototype.draw = function () {
//     this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
// }

// ColaDrinkMoveRight.prototype.update = function () {
//     if (this.animation.elapsedTime < this.animation.totalTime * 8 /14 ) {
//         this.x += this.game.clockTick * this.speed;
//     } 
//     if (this.x > 900) this.x = -200;
//     for (var i = 0; i < this.game.entities.length; i++) {
//         var ent = this.game.entities[i];
//         if (ent !== this && collide(ent, this) && !ent.dead) {
//             ent.dead = true;
//             this.game.addEntity(new Explosion(this.game));
//         }
//     } 
// }

// function ColaDrinkLookLeft(game) {
//     this.animation = new Animation(AM.getAsset("./img/cola.png"), 0, 35, 65, 65, 4, 0.10, 4, true, 1);
//     this.animationDead = new Animation(AM.getAsset("./img/cola.png"), 0, 341, 70, 65, 5, 0.2, 5, false, 1);
//     this.x = 330;
//     this.y = 100;
//     this.width = 52;
//     this.height = 62;
//     this.speed = 100;
//     this.game = game;
//     this.ctx = game.ctx;
//     this.dead = false;
// }

// ColaDrinkLookLeft.prototype.draw = function () {
//     if(!this.dead) {
//         this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
//     } else {
//         this.animationDead.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
//     }
// }

// ColaDrinkLookLeft.prototype.update = function () {
// }

function cola(game, spawnX, spawnY, scale) {
    this.isEnemy = true;
    this.width = 65 * scale;
    this.height = 65 * scale;
    this.name = "cola";
    this.speed = 100;
    this.x = spawnX - 50;
    this.y = spawnY - 50;
    this.centerX = this.x + this.width / 2;
    this.centerY = this.y + this.height / 2;
        console.log("x:" + this.x + ", y:" + this.y + ", cx" + this.centerX + ", cy:" + this.centerY);
    var difX = this.centerX - spawnX;
    var difY =  spawnY - this.centerY;
    console.log("dx:" + difX + ", dy:" + difY);
    this.centerX = this.centerX - difX;
    this.centerY = this.centerY + difY;
    this.x = this.x - difX;
    this.y = this.y + difY;
        console.log("x:" + this.x + ", y:" + this.y + ", cx" + this.centerX + ", cy:" + this.centerY);
    this.game = game;
    this.ctx = game.ctx;
    this.moveDirection = 1; //1 is right, down, left, up
    this.lookDirectionRight = true;
    this.hp = 50;
    this.animationWalkLeft = new Animation(AM.getAsset("./img/cola.png")
    , 0, 137, 65, 65, 4, 0.1, 4, true, 1, false);
    this.animationDisappearLeft = new Animation(AM.getAsset("./img/cola.png")
    , 0, 341, 70, 65, 5, 0.2, 5, false, 1, false);
    this.animationWalkRight = new Animation(AM.getAsset("./img/colaFlip.png")
    , 239, 137, 65, 65, 4, 0.10, 4, true, 1, true);
    this.animationDisappearRight = new Animation(AM.getAsset("./img/colaFlip.png")
    , 0, 341, 70, 65, 5, 0.2, 5, false, 1, true);
}

cola.prototype.draw = function () {
    // console.log(this.centerX)
    enemyDraw(this);
}

cola.prototype.update = function () {
    // console.log(this.centerX + " " + this.centerY)
    if(this.game.running) {
        var xy = getXY(this.centerX, this.centerY);
        if (((this.centerX +  100) % 100 > 48 && (this.centerX + 100) % 100 < 52
            && this.centerY % 100 > 48 && this.centerY % 100 < 52)) {
            this.moveDirection = getShortestPath(this.centerX, this.centerY);
            enemyUpdateLookHelper(this);
        }

        enemyUpdateHelper(this);

        xy = getXY(this.centerX, this.centerY);
        if (xy.x == GAMEBOARD.length - 1 && GAMEBOARD[xy.x][xy.y].end) {
            this.hp = 0; //dead
        } 
        
        // else i
        for (var i = 0; i < this.game.entities.length; i++) {
            var ent = this.game.entities[i];
            if (ent !== this && ent.isIce && collide(ent, this)) {
                ent.removeFromWorld = true;
                this.hp--;
            }
        }
    }
}