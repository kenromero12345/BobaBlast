function boardTower(game, gridX, gridY, type) {
    this.game = game;
    this.ctx = game.ctx;
    this.gridX = gridX;
    this.gridY = gridY;
    this.towerType = type;
    this.spritesheet = type.spritesheet;
    this.animation = new Animation(this.spritesheet, 580, 90, 350, 350, 1, 0.1, 1, true, 0.2);
    this.x = (gridX - 1) * 100;
    this.y = gridY * 100;
}

boardTower.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
}

boardTower.prototype.update = function () {
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
