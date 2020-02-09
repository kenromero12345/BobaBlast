function storeTower(game, name, cost, description, spritesheet, xCoordinate, yCoordinate, width, height, storeGridX, storeGridY) {
    this.game = game;
    this.name = name;
    this.cost = cost;
    this.description = description;
    this.spritesheet = spritesheet;
    this.ctx = game.ctx;
    this.animationStable = new Animation(spritesheet, 580, 90, 350, 350, 1, 0.1, 1, true, 0.2);
    this.animationHover = new Animation(spritesheet, 105, 90, 350, 350, 1, 0.1 , 1, true, 0.2);
    this.x = xCoordinate;
    this.y = yCoordinate;
    this.storeGridX = storeGridX;
    this.storeGridY = storeGridY;
    this.width = width;
    this.height = height;
}

storeTower.prototype.draw = function () {
    // If selected tower, show selected tower animation
    if(selectedTowerRow === this.storeGridY && selectedTowerColumn === this.storeGridX) {
        this.animationHover.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    } 
    // If hover over tower, show hover tower animation
    else if (hoverTowerRow === this.storeGridY && hoverTowerColumn === this.storeGridX) {
        this.animationHover.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    } 
    // Else show regular tower animation
    else {
        this.animationStable.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    }
}

storeTower.prototype.update = function () {
    // Click Mode: If you click a tower, set global variable for selected tower row/column
    if (this.game.click && this.game.running) {
        console.log("CLICK");
        var click = this.game.click;
        if(click.x >= this.x && click.x < this.x + 70 && click.y >= this.y && click.y < this.y + 70) {
            purchaseMode = true;
            selectedTowerColumn = this.storeGridX;
            selectedTowerRow =this.storeGridY;
        }
    }
    // Hover Mode: If hover over a tower, set global variable for hover tower row/column
    if (this.game.mouse && this.game.running) {
        var mouse = this.game.mouse;
        if(mouse.x >= this.x && mouse.x < this.x + 70 && mouse.y >= this.y && mouse.y < this.y + 70) {
            hoverTowerRow = this.storeGridY;
            hoverTowerColumn = this.storeGridX;
        } 
    } 
}
