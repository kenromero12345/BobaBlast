var GAMEBOARD = [];

function board(game) {
	this.GAMEBOARD = [];
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
  this.GAMEBOARD = [];
  for(var i = 0; i < this.width; i++) {
    this.GAMEBOARD.push([]);
    for(var j = 0; j < this.height; j++) {
      this.GAMEBOARD[i].push({
		occupied : false,
		start : false,
		end : false,
		centerx : 0,
		centery : 0
      });
    }
  }

  this.GAMEBOARD[0][2].start = true;
  this.GAMEBOARD[0][3].start = true;
  this.GAMEBOARD[7][2].end = true;
  this.GAMEBOARD[7][3].end = true;

  for(var i = 0; i < this.width; i++) {
    for(var j = 0; j < this.height; j++) {
	  this.GAMEBOARD[i][j].centerx = this.startingXPoint + 50 + this.width * this.xgap;
	  this.GAMEBOARD[i][j].centery = this.startingYPoint + 50 + this.height * this.ygap;
    }
  }
}

board.prototype.drawRect = function (i,j) {
  var ctx = this.ctx;
  var x = this.startingXPoint + i * 100;
  var y = this.startingYPoint + j * 100;
  var w = this.xgap;
  var h = this.ygap;
  ctx.strokeStyle = "green";
  ctx.rect(x,y,w,h);
  ctx.stroke();
}

board.prototype.draw = function () {
 /* for(var i = 0; i < this.width; i++) {
    for(var j = 0; j < this.height; j++) {
      this.drawRect(i,j);
    }
  } */
}

board.prototype.update = function () {
}