function boardTower(game, gridX, gridY, type) {
    this.pointDirection = 'S';
    this.currentDirection = null; // TODO
    this.intendedDirection = null; // TODO
    this.game = game;
    this.ctx = game.ctx;
    this.gridX = gridX;
    this.gridY = gridY;
    this.xOffset = 0;
    this.yOffset = 1;
    this.towerType = type;
    this.spritesheet = type.spritesheet;
    this.animationSouthEast = new Animation(this.spritesheet, 580, 90, 350, 350, 1, 0.1, 1, true, 0.2);
    this.animationSouth = new Animation(this.spritesheet, 105, 90, 350, 350, 1, 0.1 , 1, true, 0.2); 
    this.animationEast = new Animation(this.spritesheet, 1000, 60, 440, 420, 1, 0.1 , 1, true, 0.2); 
    this.animationNorthEast = new Animation(this.spritesheet, 1480, 80, 350, 350, 1, 0.1, 1, true, 0.2);
    this.animationNorth = new Animation(this.spritesheet, 60, 540, 350, 360, 1, 0.1, 1, true, 0.2);
    this.animationNorthWest = new Animation(this.spritesheet, 540, 540, 350, 360, 1, 0.1, 1, true, 0.2);
    this.animationWest = new Animation(this.spritesheet, 940, 520, 405, 400, 1, 0.1, 1, true, 0.2);
    this.animationSouthWest = new Animation(this.spritesheet, 1460, 560, 350, 350, 1, 0.1, 1, true, 0.2);
    this.x = (gridX - 1) * 100 + 20;
    this.y = gridY * 100 + 10;
    this.centerX = this.x + 25;
    this.centerY = this.y + 25;
    this.shootOutX = this.x + 15; // for testing purposes for sSOUTH
    this.shootOutY = this.y + 50; // for testing purposes for SOUTH
    this.shootBoba = false; 
    this.upgradeMode = false;
    this.shootBobaSpeed = null; // TODO
    this.radius = 150; // TODO
    this.shootDestinationX = 0; // TODO
    this.shootDestinationY = 0; // TODO
}

boardTower.prototype.draw = function () {
    if(this.pointDirection === 'SE') {
        this.animationSouthEast.drawFrame(this.game.clockTick, this.ctx, this.x + this.xOffset, this.y + this.yOffset);
    } else if (this.pointDirection === 'S') {
        this.animationSouth.drawFrame(this.game.clockTick, this.ctx, this.x + this.xOffset, this.y + this.yOffset);
        if(this.shootBoba) {
            
        sleep(1000).then(() => {
            this.game.addEntity(new boba(this.game,this.shootOutX, this.shootOutY, this.shootDestinationX, this.shootDestinationY));
            this.shootBoba = false;
         });
        }
         if(this.upgradeMode) {
            this.ctx.save();
            this.ctx.globalAlpha = 0.25;
            this.ctx.fillStyle = "white";
            this.ctx.beginPath();
            this.ctx.arc(this.centerX, this.centerY, this.radius, 0, 2 * Math.PI);
            this.ctx.fill();
            this.ctx.restore();
        }
    } else if (this.pointDirection === 'E') {
        this.animationEast.drawFrame(this.game.clockTick, this.ctx, this.x + this.xOffset, this.y + this.yOffset);
    } else if (this.pointDirection === 'NE') {
        this.animationNorthEast.drawFrame(this.game.clockTick, this.ctx, this.x + this.xOffset, this.y + this.yOffset);
    } else if (this.pointDirection === 'N') {
        this.animationNorth.drawFrame(this.game.clockTick, this.ctx, this.x + this.xOffset, this.y + this.yOffset);
    } else if (this.pointDirection === 'NW') {
        this.animationNorthWest.drawFrame(this.game.clockTick, this.ctx, this.x + this.xOffset, this.y + this.yOffset);
    } else if (this.pointDirection === 'W') {
        this.animationWest.drawFrame(this.game.clockTick, this.ctx, this.x + this.xOffset, this.y + this.yOffset);
    } else if (this.pointDirection === 'SW') {
        this.animationSouthWest.drawFrame(this.game.clockTick, this.ctx, this.x + this.xOffset, this.y + this.yOffset);
    }
}

boardTower.prototype.update = function () {
    if(this.game.click) {
        var click = this.game.click;
        var upperLeftX = (this.gridX - 1) * 100;
        var upperLeftY = (this.gridY) * 100;
        var width = 100;
        var height = 100;
        if(click.x >= upperLeftX && click.x < upperLeftX + width && click.y >= upperLeftY && click.y < upperLeftY + height) {
            this.upgradeMode = !this.upgradeMode;
        // UNCOMMENT BELOW TO TEST CLICK TO SPIN FUNCTIONALITY
            /*   if(this.pointDirection === 'S') {
                this.pointDirection = 'SE';
                this.xOffset = 0;
                this.yOffset = 0;
            } else if (this.pointDirection === 'SE') {
                this.pointDirection = 'E';
                this.xOffset = -11;
                this.yOffset = -6;
            } else if (this.pointDirection === 'E') {
                this.pointDirection = 'NE';
                this.xOffset = -10;
                this.yOffset = -2;
            } else if (this.pointDirection === 'NE') {
                this.pointDirection = 'N';
                this.xOffset = -9;
                this.yOffset = -5;
            } else if (this.pointDirection === 'N') {
                this.pointDirection = 'NW';
                this.xOffset = -8;
                this.yOffset = -5;
            } else if (this.pointDirection === 'NW') {
                this.pointDirection = 'W';
                this.xOffset = -23;
                this.yOffset = -9;
            } else if (this.pointDirection === 'W') {
                this.pointDirection = 'SW';
                this.xOffset = -14;
                this.yOffset = -1;
            } else  {
                this.pointDirection = 'S';
                this.xOffset = 0;
                this.yOffset = 0;
            } */
        // TESTING CLICK TO SHOOT FUNCTIONALITY
            if(!this.shootBoba) {
                this.shootBoba = true;
                if(this.pointDirection = 'S') {
                    this.shootOutX = this.x + 15;
                    this.shootOutY = this.y + 50;
                }
            } else {
                this.shootBoba = false;
            }  

        }
    }
    for (var i = 0; i < this.game.entities.length; i++) {
        var ent = this.game.entities[i];
        if (ent !== this && ent.isEnemy) {
            var temp = this.enemyInRange(ent);
            if(temp) {
                console.log("ENEMY IN RANGE");
                this.shootBoba = true;
            }
        }
    }
}

// Determines if an Enemy is within Range of Tower
boardTower.prototype.enemyInRange = function (rect) {
 //   console.log(rect.x < this.centerX + this.radius && rect.x + rect.width > this.centerX - this.radius
  //      && rect.y < this.centerY + this.radius && this.y + this.height > this.centerY);
    if (rect.x < this.centerX + this.radius && rect.x + rect.width > this.centerX - this.radius
        && rect.y < this.centerY + this.radius && rect.y + rect.height > this.centerY - this.radius) {
        this.shootDestinationX = rect.x + rect.width / 2 ;
        this.shootDestinationY = rect.y + rect.height / 2 ;
       // return {x: rect.x + (rect.width / 2), y: rect.y + (rect.height/2)};
       return true;
    } else {
        return false;
    }
}