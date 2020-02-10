var GAMEBOARD = [];
var ACTIVETOWERS = [];

function board(game) {
	GAMEBOARD = [];
	this.width = 12;
	this.height = 6;
	this.xgap = 100;
  this.ygap = 100;
  this.startingXPoint = -100;
  this.startingYPoint = 0;
	this.game = game;
	this.ctx = game.ctx;
	this.buildGameboard();
}

board.prototype.buildGameboard = function () {
  GAMEBOARD = [];
  for(var i = 0; i < this.width; i++) {
    GAMEBOARD.push([]);
    for(var j = 0; j < this.height; j++) {
      GAMEBOARD[i].push({
    occupied : false,
    hoverOccupied: false,
		start : false,
		end : false,
		centerx : 0,
    centery : 0,
    hasEnemyRadius: false
      });
    }
  }

  GAMEBOARD[0][2].start = true;
  GAMEBOARD[0][3].start = true;
  GAMEBOARD[11][2].end = true;
  GAMEBOARD[11][3].end = true;

  GAMEBOARD[0][0].occupied = true;
  GAMEBOARD[0][1].occupied = true;
  GAMEBOARD[0][4].occupied = true;
  GAMEBOARD[0][5].occupied = true;

  GAMEBOARD[10][0].occupied = true;
  GAMEBOARD[10][1].occupied = true;
  GAMEBOARD[10][4].occupied = true;
  GAMEBOARD[10][5].occupied = true;

  GAMEBOARD[11][0].occupied = true;
  GAMEBOARD[11][1].occupied = true;
  GAMEBOARD[11][4].occupied = true;
  GAMEBOARD[11][5].occupied = true;

  // GAMEBOARD[1][1].occupied = true;

  // GAMEBOARD[2][2].occupied = true;
  // GAMEBOARD[2][3].occupied = true;
  // GAMEBOARD[2][4].occupied = true;

  // GAMEBOARD[4][2].occupied = true;
  // GAMEBOARD[4][3].occupied = true;
  // GAMEBOARD[4][4].occupied = true;
  // GAMEBOARD[4][5].occupied = true;

  // GAMEBOARD[5][1].occupied = true;

  // GAMEBOARD[6][1].occupied = true;
  // GAMEBOARD[6][3].occupied = true;
  // GAMEBOARD[6][4].occupied = true;
  
  // GAMEBOARD[7][1].occupied = true;
  // GAMEBOARD[7][3].occupied = true;

  // GAMEBOARD[8][3].occupied = true;

  // GAMEBOARD[9][2].occupied = true;


  for(var i = 0; i < this.width; i++) {
    for(var j = 0; j < this.height; j++) {
	  GAMEBOARD[i][j].centerx = this.startingXPoint + 50 + this.width * this.xgap;
	  GAMEBOARD[i][j].centery = this.startingYPoint + 50 + this.height * this.ygap;
    }
  }

//   for(var i = 0; i < this.width; i++) {
//     for(var j = 0; j < this.height; j++) {
//       GAMEBOARD[i][j].hasEnemyRadius = false;
//     }
//   }

//   for (var i = 0; i < this.game.entities.length; i++) {
//     var ent = this.game.entities[i];
//     if (ent !== this && !ent.isTower) {
//         var xy = getXY(ent.centerX, ent.centerY);
//         // console.log(xy)
//         if (xy.x && xy.y) {
//           GAMEBOARD[xy.x][xy.y].hasEnemyRadius = true;  
//           if (xy.x + 1< GAMEBOARD.length && xy.x + 1 >= 0) {
//             GAMEBOARD[xy.x + 1][xy.y].hasEnemyRadius = true;  
//           }  
//           if (xy.y + 1 < GAMEBOARD[0].length && xy.y + 1 >= 0) {
//             GAMEBOARD[xy.x][xy.y + 1].hasEnemyRadius = true;  
//           }
//           if (xy.x - 1 < GAMEBOARD.length && xy.x - 1 >= 0) {
//             GAMEBOARD[xy.x - 1][xy.y].hasEnemyRadius = true;
//           }
//           if (xy.y - 1 < GAMEBOARD[0].length && xy.y - 1 >= 0) {
//             GAMEBOARD[xy.x][xy.y - 1].hasEnemyRadius = true;  
//           }  
          
//         }
//     }
// }
}

// Rectangle for Testing Purposes DELETE WHEN DONE
board.prototype.drawRect = function (i,j) {
  var ctx = this.ctx;
  var x = this.startingXPoint + i * 100;
  var y = this.startingYPoint + j * 100;
  var w = this.xgap;
  var h = this.ygap;
  // ctx.strokeStyle = "green";
  // ctx.rect(x,y,w,h);
  // ctx.stroke();
  ctx.fillStyle = "green";
  ctx.fillRect(x,y,w,h);
}

board.prototype.draw = function () {
 for(var i = 0; i < this.width; i++) {
    for(var j = 0; j < this.height; j++) {
      // this.drawRect(i,j);
      if (GAMEBOARD[i][j].occupied) {
       // this.drawRect(i, j);
        for(var z = 0; z < ACTIVETOWERS.length; z++) {
        // this.ctx.drawImage(ACTIVETOWERS[z][2], this.startingXPoint + ACTIVETOWERS[z][0] * 100, this.startingYPoint + 100 * ACTIVETOWERS[z][1]);
        
        }
       
      }
    }
  } 


    // Shadow Effect
    if (this.game.mouse && purchaseMode == true) {
      var mouse = this.game.mouse;
      this.ctx.save();
      this.ctx.globalAlpha = 0.5;
      var upperLeftX = Math.floor(mouse.x/100) * 100;
      var upperLeftY = Math.floor(mouse.y/100) * 100;
      var gridX = Math.floor(mouse.x/100) + 1;
      var gridY = Math.floor(mouse.y/100);
      // console.log(gridX + " " + gridY);
      // if (!isPath(-50, 250, gridX, gridY)) {
      //   console.log(GAMEBOARD);
      // }
      // console.log(isPath(-50, 250, gridX, gridY));
      // console.log(GAMEBOARD[gridX][gridY].hasEnemyRadius);
      if (gridX >= 0 && gridX < GAMEBOARD.length && gridY >= 0 && gridY < GAMEBOARD[0].length
        && !GAMEBOARD[gridX][gridY].end && !GAMEBOARD[gridX][gridY].hasEnemyRadius 
        && isPath(-50, 250, gridX, gridY) && !GAMEBOARD[gridX][gridY].occupied) {
       this.drawRect(Math.floor(mouse.x/100) + 1, Math.floor(mouse.y/100));
      }
      this.ctx.restore();
    }
}


board.prototype.update = function () {
  for(var i = 0; i < this.width; i++) {
    for(var j = 0; j < this.height; j++) {
      GAMEBOARD[i][j].hasEnemyRadius = false;
    }
  }

  for (var i = 0; i < this.game.entities.length; i++) {
    var ent = this.game.entities[i];
    if (ent !== this && ent.isEnemy) {//&& !isTower
        var xy = getXY(ent.centerX, ent.centerY);
        // console.log(xy)
        if (xy.x && xy.y) {
          GAMEBOARD[xy.x][xy.y].hasEnemyRadius = true;  
          if (xy.x + 1< GAMEBOARD.length && xy.x + 1 >= 0) {
            GAMEBOARD[xy.x + 1][xy.y].hasEnemyRadius = true;  
          }  
          if (xy.y + 1 < GAMEBOARD[0].length && xy.y + 1 >= 0) {
            GAMEBOARD[xy.x][xy.y + 1].hasEnemyRadius = true;  
          }
          if (xy.x - 1 < GAMEBOARD.length && xy.x - 1 >= 0) {
            GAMEBOARD[xy.x - 1][xy.y].hasEnemyRadius = true;
          }
          if (xy.y - 1 < GAMEBOARD[0].length && xy.y - 1 >= 0) {
            GAMEBOARD[xy.x][xy.y - 1].hasEnemyRadius = true;  
          }  
          
        }
    }
}

// BUG : If in purchase mode, and I click on a place hwere I cannot put down tower (e.g. enemy is there) 
// and I dont select another tower, it will put down the tower once the enemy has passed
// PATCHED BUG WITH ELSE STATEMENT SETTING CLICK TO FALSE
  if (this.game.click && purchaseMode === true) {
    var click = this.game.click;
    if(click.x >= 0 && click.x < 900 && click.y >= 0 && click.y < 600) {
      var gridX = Math.floor(click.x/100) + 1;
      var gridY = Math.floor(click.y/100);
      // console.log("X: " + click.x + "Y" + click.y);
      if (isPath(-50, 250, gridX, gridY) && !GAMEBOARD[gridX][gridY].hasEnemyRadius 
        && !GAMEBOARD[gridX][gridY].occupied) {
        GAMEBOARD[gridX][gridY].occupied = true;
        var tempTower = new boardTower(this.game, gridX, gridY, towerArray[selectedTowerRow][selectedTowerColumn]);
        this.game.addEntity(tempTower);
      //  ACTIVETOWERS.push([gridX, gridY,towerArray[selectedTowerRow][selectedTowerColumn].spritesheet]);
        selectedTowerRow = -1;
        selectedTowerColumn = -1;
        purchaseMode = false;
      } else {
        this.game.click = false;
      }
      // console.log(ACTIVETOWERS[0][0]);
    }
  }
  
}

//make it bidirection ?
function isPath(x, y, blockX, blockY) {
  var queue = [];
  if (GAMEBOARD[blockX][blockY]) {
    GAMEBOARD[blockX][blockY].hoverOccupied = true;
  } else {
    return false;
  }

for(var i = 0; i < GAMEBOARD.length; i++) {
    for(var j = 0; j < GAMEBOARD[i].length; j++) {
          GAMEBOARD[i][j].distToXY = -1;
          GAMEBOARD[i][j].dir = -1;
    }
}

  var xy = getXY(x, y);
  GAMEBOARD[xy.x][xy.y].distToXY = 0;
  GAMEBOARD[xy.x][xy.y].dir = 0;
  queue.push(xy);

  while (queue.length !== 0) {
      for (let i = 0; i < queue.length; i++) {
          var node = queue.shift();
          // if (node.x == 2 && node.y > 0) {
          //     console.log("problem")
          // }
          if (GAMEBOARD[node.x][node.y].end) {
            GAMEBOARD[blockX][blockY].hoverOccupied = false;
            return true;
          }

          if (node.x + 1 < GAMEBOARD.length && node.x + 1 >= 0 && (!GAMEBOARD[node.x + 1][node.y].hoverOccupied 
            && !GAMEBOARD[node.x + 1][node.y].occupied) && GAMEBOARD[node.x + 1][node.y].dir < 0) {
              var newNode = Object.assign({}, node);
              newNode.x++;
              queue.push(newNode);
              GAMEBOARD[node.x + 1][node.y].distToXY = GAMEBOARD[node.x][node.y].distToXY + 1;
              GAMEBOARD[node.x + 1][node.y].dir = 1;
          }
          if (node.y + 1 < GAMEBOARD[0].length && node.y + 1 >= 0 && (!GAMEBOARD[node.x][node.y + 1].hoverOccupied 
            && !GAMEBOARD[node.x][node.y + 1].occupied) && GAMEBOARD[node.x][node.y + 1].dir < 0) {
              var newNode = Object.assign({}, node);
              newNode.y++;
              queue.push(newNode);
              GAMEBOARD[node.x][node.y + 1].distToXY = GAMEBOARD[node.x][node.y].distToXY + 1;
              GAMEBOARD[node.x][node.y + 1].dir = 2;
          }
          if (node.x - 1 < GAMEBOARD.length && node.x - 1 >= 0 && (!GAMEBOARD[node.x - 1][node.y].hoverOccupied 
            && !GAMEBOARD[node.x - 1][node.y].occupied) && GAMEBOARD[node.x - 1][node.y].dir < 0) {
              var newNode = Object.assign({}, node);
              newNode.x--;
              queue.push(newNode);
              GAMEBOARD[node.x - 1][node.y].distToXY = GAMEBOARD[node.x][node.y].distToXY + 1;
              GAMEBOARD[node.x - 1][node.y].dir = 3;
          }
          if (node.y - 1 < GAMEBOARD[0].length && node.y - 1 >= 0 && (!GAMEBOARD[node.x][node.y - 1].hoverOccupied 
            && !GAMEBOARD[node.x][node.y - 1].occupied) && GAMEBOARD[node.x][node.y - 1].dir < 0) {
              var newNode = Object.assign({}, node);
              newNode.y--;
              queue.push(newNode);
              GAMEBOARD[node.x][node.y - 1].distToXY = GAMEBOARD[node.x][node.y].distToXY + 1;
              GAMEBOARD[node.x][node.y - 1].dir = 4;
          }
      }
  }
  GAMEBOARD[blockX][blockY].hoverOccupied = false;
  return false; // no shortest path
};