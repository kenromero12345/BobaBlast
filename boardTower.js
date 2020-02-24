function boardTower(game, gridX, gridY, type) {
    this.name = type.towerType;
    this.isTower = true;
    this.spin = false;
    this.counterclockwise = true;
    this.shootTimer = Date.now();
    this.pointDirectionIndex = 0;
    this.pointDirection = 'S';
    this.intendedDirection = 'S';
    this.intendedDirectionIndex = 0;
    this.game = game;
    this.ctx = game.ctx;
    this.gridX = gridX;
    this.gridY = gridY;
    this.xOffset = 0;
    this.yOffset = 1;
    this.towerType = type;
    this.cost = this.towerType.cost;
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
    this.centerX = this.x + 30;//used to be +25, now plus +30 to make it total +50
    this.centerY = this.y + 40;// used to be+25, now plus +40 to make it ottal +40
    this.shootOutX = this.x;
    this.shootOutY = this.y;
    this.shootBoba = false; 
    this.upgradeMode = false;
    this.shootBobaSpeed = null; // TODO
    this.radius = this.towerType.radius; 
    this.shootDestinationX = 0; 
    this.shootDestinationY = 0; 
    this.target = null;
    this.shootBobaEveryMS = this.towerType.frequency;      
    this.directions = ['S', 'SE', 'E', 'NE', 'N', 'NW', 'W', 'SW']
    this.shootOutXOffset = [15, 45, 65, 45, 17, -15, -30, -25 ];
    this.shootOutYOffset = [50,40, 15, -5, -15, -5, 10, 40];
}

boardTower.prototype.draw = function () {
    if(this.upgradeMode) {
        this.ctx.save();
        this.ctx.globalAlpha = 0.25;
        this.ctx.fillStyle = "white";
        this.ctx.beginPath();
        this.ctx.arc(this.centerX, this.centerY, this.radius, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.restore();
    }
    if(this.pointDirection === 'SE') {
        this.xOffset = 0;
        this.yOffset = 0;
        this.animationSouthEast.drawFrame(this.game.clockTick, this.ctx, this.x + this.xOffset, this.y + this.yOffset);
    } else if (this.pointDirection === 'S') {
        this.xOffset = 0;
        this.yOffset = 0;
        this.animationSouth.drawFrame(this.game.clockTick, this.ctx, this.x + this.xOffset, this.y + this.yOffset);
    } else if (this.pointDirection === 'E') {
        this.xOffset = -11;
        this.yOffset = -6;
        this.animationEast.drawFrame(this.game.clockTick, this.ctx, this.x + this.xOffset, this.y + this.yOffset);
    } else if (this.pointDirection === 'NE') {
        this.xOffset = -10;
        this.yOffset = -2;
        this.animationNorthEast.drawFrame(this.game.clockTick, this.ctx, this.x + this.xOffset, this.y + this.yOffset);
    } else if (this.pointDirection === 'N') {
        this.xOffset = -9;
        this.yOffset = -5;
        this.animationNorth.drawFrame(this.game.clockTick, this.ctx, this.x + this.xOffset, this.y + this.yOffset);
    } else if (this.pointDirection === 'NW') {
        this.xOffset = -8;
        this.yOffset = -5;
        this.animationNorthWest.drawFrame(this.game.clockTick, this.ctx, this.x + this.xOffset, this.y + this.yOffset);
    } else if (this.pointDirection === 'W') {
        this.xOffset = -23;
        this.yOffset = -9;
        this.animationWest.drawFrame(this.game.clockTick, this.ctx, this.x + this.xOffset, this.y + this.yOffset);
    } else if (this.pointDirection === 'SW') {
        this.xOffset = -14;
        this.yOffset = -1;
        this.animationSouthWest.drawFrame(this.game.clockTick, this.ctx, this.x + this.xOffset, this.y + this.yOffset);
    }

    if(this.shootBoba) {
        if(this.shootTimer < Date.now()) {
            this.game.addEntity(new boba(this.game,this.shootOutX, this.shootOutY, this.shootDestinationX, this.shootDestinationY, this.name, this.target));
            this.shootBoba = false;
            this.shootTimer = Date.now() + this.shootBobaEveryMS;
        }
    }
}

boardTower.prototype.update = function () {
    if(this.spin && this.pointDirection === this.intendedDirection) {
        this.pointDirectionIndex = this.intendedDirectionIndex;
        this.spin = false;
    }

    if(this.spin) {
        if(this.counterclockwise) {
            if(this.pointDirection === 'S') {
                this.pointDirection = 'SE';
            } else if (this.pointDirection === 'SE') {
                this.pointDirection = 'E';
            } else if (this.pointDirection === 'E') {
                this.pointDirection = 'NE';
            } else if (this.pointDirection === 'NE') {
                this.pointDirection = 'N';
            } else if (this.pointDirection === 'N') {
                this.pointDirection = 'NW';
            } else if (this.pointDirection === 'NW') {
                this.pointDirection = 'W';
            } else if (this.pointDirection === 'W') {
                this.pointDirection = 'SW';
            } else  {
                this.pointDirection = 'S';
            }
        }
        else {
            if(this.pointDirection === 'S') {
                this.pointDirection = 'SW';
            } else if (this.pointDirection === 'SW') {
                this.pointDirection = 'W';
            } else if (this.pointDirection === 'W') {
                this.pointDirection = 'NW';
            } else if (this.pointDirection === 'NW') {
                this.pointDirection = 'N';
            } else if (this.pointDirection === 'N') {
                this.pointDirection = 'NE';
            } else if (this.pointDirection === 'NE') {
                this.pointDirection = 'E';
            } else if (this.pointDirection === 'E') {
                this.pointDirection = 'SE';
            } else  {
                this.pointDirection = 'S';
            }
        }
    }

 

    if(this.game.click) {
        var click = this.game.click;
        var upperLeftX = (this.gridX - 1) * 100;
        var upperLeftY = (this.gridY) * 100;
        var width = 100;
        var height = 100;
        if(click.x >= upperLeftX && click.x < upperLeftX + width && click.y >= upperLeftY && click.y < upperLeftY + height) {
            this.upgradeMode = !this.upgradeMode;
        // UNCOMMENT BELOW TO TEST CLICK TO SPIN FUNCTIONALITY
             /* 
            if(this.pointDirection === 'S') {
                this.pointDirection = 'SW';
            } else if (this.pointDirection === 'SW') {
                this.pointDirection = 'W';
            } else if (this.pointDirection === 'W') {
                this.pointDirection = 'NW';
            } else if (this.pointDirection === 'NW') {
                this.pointDirection = 'N';
            } else if (this.pointDirection === 'N') {
                this.pointDirection = 'NE';
            } else if (this.pointDirection === 'NE') {
                this.pointDirection = 'E';
            } else if (this.pointDirection === 'E') {
                this.pointDirection = 'SE';
            } else  {
                this.pointDirection = 'S';
            }*/
        // TESTING CLICK TO SHOOT FUNCTIONALITY
          /*  if(!this.shootBoba) {
                this.shootBoba = true;
                if(this.pointDirection = 'S') {
                    this.shootOutX = this.x + 15;
                    this.shootOutY = this.y + 50;
                }
            } else {
                this.shootBoba = false;
            }  */
        }
    }

    // This shooting method always shoots the enemy that entered last.
    /*
    for (var i = 0; i < this.game.entities.length; i++) {
        var ent = this.game.entities[i];
        if (ent !== this && ent.isEnemy) {
            var temp = this.enemyInRange(ent);
            if(temp && ent.hp >= 1) {
                this.shootDestinationX = ent.centerX;
                this.shootDestinationY = ent.centerY;
                this.calculateDirection(ent);
                this.shootBoba = true;
            }
        }
    } */
    

    // This shooting method always shoots the enemy that is closest to the end.
    var withinRange = [];
    for (var i = 0; i < this.game.entities.length; i++) {
        var ent = this.game.entities[i];
        if (ent !== this && ent.isEnemy) {
            var temp = this.enemyInRange(ent);
            if(temp && ent.hp >= 1) {
                var dist = distanceToEndPoint(ent.centerX, ent.centerY);
                withinRange.push({enemy: ent, distToEnd: dist});
            }
        }
    }

    if(withinRange.length >= 1) {
        var selectedEnemy = withinRange[0];
        for(var i = 1; i < withinRange.length; i++) {
            if(selectedEnemy.distToEnd >= withinRange[i].distToEnd) {
                selectedEnemy = withinRange[i]
            }
        }
        this.shootDestinationX = selectedEnemy.enemy.centerX - 10;
        this.shootDestinationY = selectedEnemy.enemy.centerY - 13;
        this.target = selectedEnemy.enemy;
        this.calculateDirection(selectedEnemy.enemy);
        this.shootBoba = true;
    }
}

// Determines if an Enemy is within Range of Tower
boardTower.prototype.enemyInRange = function (rect) {
    // Center of Circle Minus Center of Rectangle
    var circleDistanceX = Math.abs(this.centerX - rect.centerX);
    var circleDistanceY = Math.abs(this.centerY - rect.centerY);

    if(circleDistanceX > rect.boundingbox.width/2 + this.radius) return false;
    if(circleDistanceY > rect.boundingbox.height/2 + this.radius) return false;

    if(circleDistanceX <= rect.boundingbox.width/2) {
         return true;
     }
    if(circleDistanceY <= rect.boundingbox.height/2) {
        return true;
    }

    var cornerDistance_sq = Math.pow(circleDistanceX - rect.boundingbox.width / 2, 2) + 
                            Math.pow(circleDistanceY - rect.boundingbox.height /2, 2); 

    if(cornerDistance_sq <= Math.pow(this.radius, 2)) {
        return true;
    } else {
        return false;
    }
}

boardTower.prototype.calculateDirection = function (target) {
    if(this.shootTimer >= Date.now())  return;
    var tempDirection = null;
    var tempShortestDistance = Infinity;
    var bestIndex = null;
    for(var i = 0; i < this.directions.length; i++) {
        var tempX = this.x + this.shootOutXOffset[i];
        var tempY = this.y + this.shootOutYOffset[i];
        var tempDistance = getDistance(target.centerX, target.centerY, tempX, tempY);
        if(tempDistance < tempShortestDistance) {
            tempDirection = this.directions[i];
            tempShortestDistance = tempDistance;
            bestIndex = i;
        }
    }
    this.intendedDirectionIndex = bestIndex;
    this.intendedDirection = tempDirection;
    this.shootOutX = this.x + this.shootOutXOffset[bestIndex];
    this.shootOutY = this.y + this.shootOutYOffset[bestIndex];
    if(this.pointDirection != this.intendedDirection) {
        this.spin = true;
        var temp = this.intendedDirectionIndex - this.pointDirectionIndex;
        if((temp >= 0 && temp <= 4) || (temp <= -4 && temp >= -7)) {
            this.counterclockwise = true;
        } else {
            this.counterclockwise = false;
        }
    }
}

function getDistance(x1, y1, x2, y2) {
	var xs = x2 - x1;
    var ys = y2 - y1;		
      
    xs *= xs;
    ys *= ys;
         
    return Math.sqrt( xs + ys );
}

function distanceToEndPoint(x1, y1) {
	var xs = 900 - x1;
    var ys = 300 - y1;		
      
    xs *= xs;
    ys *= ys;
         
    return Math.sqrt( xs + ys );
}
