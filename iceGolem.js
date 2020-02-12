function iceGolem(game, spawnX, spawnY, scale) {
    this.isEnemy = true;
    this.width = 194 * scale;
    this.height = 180 * scale;
    this.name = "ice";
    this.speed = 15;
    this.x = spawnX - 50;
    this.y = spawnY - 50;
    this.centerX = this.x + this.width / 2;
    this.centerY = this.y + this.height / 2;
        // console.log("x:" + this.x + ", y:" + this.y + ", cx" + this.centerX + ", cy:" + this.centerY);
    var difX = this.centerX - spawnX;
    var difY =  spawnY - this.centerY;
    // console.log("dx:" + difX + ", dy:" + difY);
    this.centerX = this.centerX - difX;
    this.centerY = this.centerY + difY;
    this.x = this.x - difX;
    this.y = this.y + difY;
        // console.log("x:" + this.x + ", y:" + this.y + ", cx" + this.centerX + ", cy:" + this.centerY);
    this.game = game;
    this.ctx = game.ctx;
    this.moveDirection = 1; //1 is right, down, left, up
    this.lookDirectionRight = true;
    this.hp = 100;
    this.animationWalkLeft = new Animation(AM.getAsset("./img/iceg.png")
    , 0, 180, 194, 180, 4, 0.5, 4, true, scale, false );
    this.animationDisappearLeft = new Animation(AM.getAsset("./img/iceg.png")
    , 0, 745, 238, 180, 7, 0.25, 7, false, scale, false);
    this.animationWalkRight = new Animation(AM.getAsset("./img/icegFlip.png")
    , 870, 180, 194, 180, 4, 0.5, 4, true, scale, true );
    this.animationDisappearRight = new Animation(AM.getAsset("./img/icegFlip.png")
    , 0, 745, 238, 180, 7, 0.25, 7, false, scale, true);
    this.boxes = false;
    this.boundingbox = new BoundingBox(this.x, this.y, this.width, this.height);
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

        xy = getXY(this.centerX, this.centerY);
        if (xy.x == GAMEBOARD.length - 1 && GAMEBOARD[xy.x][xy.y].end) {
            this.hp = 0; //dead
        } 
        
        // else i
        for (var i = 0; i < this.game.entities.length; i++) {
            var ent = this.game.entities[i];
            if (ent !== this && ent.isBoba && this.boundingbox.collide(ent.boundingbox)) {
                ent.removeFromWorld = true;
                this.hp--;
            }
        }
    }
}