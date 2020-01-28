var GAMEBOARD = [];
var ACTIVETOWERS = [];

function board(game) {
	GAMEBOARD = [];
	this.width = 11;
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
		start : false,
		end : false,
		centerx : 0,
		centery : 0
      });
    }
  }

  GAMEBOARD[0][2].start = true;
  GAMEBOARD[0][3].start = true;
  GAMEBOARD[10][2].end = true;
  GAMEBOARD[10][3].end = true;

  GAMEBOARD[0][0].occupied = true;
  GAMEBOARD[0][1].occupied = true;
  GAMEBOARD[0][4].occupied = true;
  GAMEBOARD[0][5].occupied = true;

  GAMEBOARD[10][0].occupied = true;
  GAMEBOARD[10][1].occupied = true;
  GAMEBOARD[10][4].occupied = true;
  GAMEBOARD[10][5].occupied = true;

  GAMEBOARD[1][1].occupied = true;

  GAMEBOARD[2][2].occupied = true;
  GAMEBOARD[2][3].occupied = true;
  GAMEBOARD[2][4].occupied = true;

  GAMEBOARD[4][2].occupied = true;
  GAMEBOARD[4][3].occupied = true;
  GAMEBOARD[4][4].occupied = true;
  GAMEBOARD[4][5].occupied = true;

  GAMEBOARD[5][1].occupied = true;

  GAMEBOARD[6][1].occupied = true;
  GAMEBOARD[6][3].occupied = true;
  GAMEBOARD[6][4].occupied = true;
  
  GAMEBOARD[7][1].occupied = true;
  GAMEBOARD[7][3].occupied = true;

  GAMEBOARD[8][3].occupied = true;

  GAMEBOARD[9][2].occupied = true;


  for(var i = 0; i < this.width; i++) {
    for(var j = 0; j < this.height; j++) {
	  GAMEBOARD[i][j].centerx = this.startingXPoint + 50 + this.width * this.xgap;
	  GAMEBOARD[i][j].centery = this.startingYPoint + 50 + this.height * this.ygap;
    }
  }
}

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
        this.drawRect(i, j);
        var x = this.startingXPoint + i * 100;
        var y = this.startingYPoint + j * 100;
        this.ctx.drawImage(towerArray[selectedTowerRow][selectedTowerColumn].spritesheet, x, y);
           
      }
    }
  } 

  if (this.game.mouse && purchaseMode == true) {
    var mouse = this.game.mouse;
    this.ctx.save();
    this.ctx.globalAlpha = 0.5;
    var upperLeftX = Math.floor(mouse.x/100) * 100;
    var upperLeftY = Math.floor(mouse.y/100) * 100;
    console.log("X: " + mouse.x + "Y" + mouse.y);
    this.drawRect(Math.floor(mouse.x/100) + 1, Math.floor(mouse.y/100));
    this.ctx.drawImage(towerArray[selectedTowerRow][selectedTowerColumn].spritesheet, upperLeftX, upperLeftY);
           
    this.ctx.restore();
  }
}

board.prototype.update = function () {
}