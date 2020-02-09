function boardTower(game, gridX, gridY, type) {
    this.pointDirection = 'S';
    this.currentDirection = null;
    this.intendedDirection = null;
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
}

boardTower.prototype.draw = function () {
    if(this.pointDirection === 'SE') {
        this.animationSouthEast.drawFrame(this.game.clockTick, this.ctx, this.x + this.xOffset, this.y + this.yOffset);
    } else if (this.pointDirection === 'S') {
        this.animationSouth.drawFrame(this.game.clockTick, this.ctx, this.x + this.xOffset, this.y + this.yOffset);
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
            if(this.pointDirection === 'S') {
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
            }
        }
    }
    // Click Mode: If you click a tower, set global variable for selected tower row/column
  /*  if (this.game.click) {
        console.log("CLICK");
        var click = this.game.click;
        if(click.x >= this.x && click.x < this.x + 70 && click.y >= this.y && click.y < this.y + 70) {
            purchaseMode = true;
            selectedTowerColumn = this.storeGridX;
            selectedTowerRow =this.storeGridY;
        }
    }
    // Hover Mode: If hover over a tower, set global variable for hover tower row/column
    if (this.game.mouse) {
        var mouse = this.game.mouse;
        if(mouse.x >= this.x && mouse.x < this.x + 70 && mouse.y >= this.y && mouse.y < this.y + 70) {
            hoverTowerRow = this.storeGridY;
            hoverTowerColumn = this.storeGridX;
        } 
    } */
}
