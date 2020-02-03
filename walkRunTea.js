var constructor = function (tea, game, spawnX, spawnY, isRun) {
    tea.x = spawnX - 50;
    tea.y = spawnY - 50;
    if (isRun) {
        tea.centerX = tea.x + tea.runWidth / 2;
        tea.centerY = tea.y + tea.runHeight / 2;
    } else {
        tea.centerX = tea.x + tea.walkWidth / 2;
        tea.centerY = tea.y + tea.walkHeight / 2;
    }
    // console.log("x:" + tea.x + ", y:" + tea.y + ", cx" + tea.centerX + ", cy:" + tea.centerY);
    var difX = tea.centerX - spawnX;
    var difY =  spawnY - tea.centerY;
    // console.log("dx:" + difX + ", dy:" + difY);
    tea.centerX = tea.centerX - difX;
    tea.centerY = tea.centerY + difY;
    tea.x = tea.x - difX;
    tea.y = tea.y + difY;
    // console.log("x:" + tea.x + ", y:" + tea.y + ", cx" + tea.centerX + ", cy:" + tea.centerY);
    tea.walkSpeed = 100;
    tea.runSpeed = 200;
    tea.game = game;
    tea.ctx = game.ctx;
    tea.moveDirection = 1; //1 is right, down, left, up
    tea.lookDirectionRight = true;
    tea.paceWalk = !isRun;
    tea.hp = 10;
    if (tea.paceWalk) {
        tea.width = tea.walkWidth;
        tea.height = tea.walkHeight;
    } else {
        tea.width = tea.runWidth;
        tea.height = tea.runHeight;
    }
}

var draw = function (tea) {
    if (tea.hp <= 0) {
        if (tea.lookDirectionRight) {
            tea.animationDisappearRight.drawFrame(tea.game.clockTick, tea.ctx, tea.x, tea.y);
            if (tea.animationDisappearRight.isDone()) {
                tea.removeFromWorld = true;
            }
        } else {
            tea.animationDisappearLeft.drawFrame(tea.game.clockTick, tea.ctx, tea.x, tea.y);
            if (tea.animationDisappearLeft.isDone()) {
                tea.removeFromWorld = true;
            }
        }
    } else if (tea.paceWalk) {
        if (tea.moveDirection == 1) {
            tea.animationWalkRight.drawFrame(tea.game.clockTick, tea.ctx, tea.x, tea.y);
        } else if (tea.moveDirection == 2) {
            if (tea.lookDirectionRight) {
                // console.log("a");
                tea.animationWalkRight.drawFrame(tea.game.clockTick, tea.ctx, tea.x, tea.y);
            } else {
                tea.animationWalkLeft.drawFrame(tea.game.clockTick, tea.ctx, tea.x, tea.y);
            }
        } else if (tea.moveDirection == 3) {
            tea.animationWalkLeft.drawFrame(tea.game.clockTick, tea.ctx, tea.x, tea.y);
        } else {
            if (tea.lookDirectionRight) {
                tea.animationWalkRight.drawFrame(tea.game.clockTick, tea.ctx, tea.x, tea.y);
            } else {
                tea.animationWalkLeft.drawFrame(tea.game.clockTick, tea.ctx, tea.x, tea.y);
            }
        }
    } else {
        if (tea.moveDirection == 1) {
            tea.animationRunRight.drawFrame(tea.game.clockTick, tea.ctx, tea.x, tea.y);
        } else if (tea.moveDirection == 2) {
            if (tea.lookDirectionRight) {
                tea.animationRunRight.drawFrame(tea.game.clockTick, tea.ctx, tea.x, tea.y);
            } else {
                tea.animationRunLeft.drawFrame(tea.game.clockTick, tea.ctx, tea.x, tea.y);
            }
        } else if (tea.moveDirection == 3) {
            tea.animationRunLeft.drawFrame(tea.game.clockTick, tea.ctx, tea.x, tea.y);
        } else {
            if (tea.lookDirectionRight) {
                tea.animationRunRight.drawFrame(tea.game.clockTick, tea.ctx, tea.x, tea.y);
            } else {
                tea.animationRunLeft.drawFrame(tea.game.clockTick, tea.ctx, tea.x, tea.y);
            }
        }
    }
}

var update = function (tea) {
    // console.log("x:" + tea.x + ", y:" + tea.y + ", cx" + tea.centerX + ", cy:" + tea.centerY);
    //update moveDirection, lookDirection, pace
    if (tea.game.space) tea.hp--;
    // if (tea.moveDirection == 5) tea.moveDirection = 1;
    if (tea.game.right) {
        tea.moveDirection = 1;
        tea.lookDirectionRight = true;
    }
    if (tea.game.down) tea.moveDirection = 2;
    if (tea.game.left) {
        tea.moveDirection = 3;
        tea.lookDirectionRight = false;
    }
    if (tea.game.up) tea.moveDirection = 4;
    if (tea.game.run) tea.paceWalk = !tea.paceWalk;
    var xy = getXY(tea.centerX, tea.centerY);
    // console.log(xy);
    // console.log(tea.centerX + " " + tea.centerY)
    if (((tea.centerX +  100) % 100 > 43 && (tea.centerX + 100) % 100 < 57
        && tea.centerY % 100 > 43 && tea.centerY % 100 < 57) && !tea.paceWalk
        || ((tea.centerX +  100) % 100 > 49 && (tea.centerX + 100) % 100 < 51
        && tea.centerY % 100 > 49 && tea.centerY % 100 < 51) && tea.paceWalk) {
            // console.log(tea.centerX + " " + tea.centerY)
        tea.moveDirection = getShortestPath(tea.centerX, tea.centerY);
        if (tea.moveDirection == 1) {
            tea.lookDirectionRight = true;
        } else if (tea.moveDirection == 3) {
            tea.lookDirectionRight = false;
        }
    }
    // console.log(xy);
    // console.log(tea.centerX + " " +  tea.centerY);
    // var width;
    // var height;
    if (tea.hp > 0) {
        if (tea.paceWalk) {
            if (tea.moveDirection == 1) {
                if (tea.animationWalkRight.elapsedTime < tea.animationWalkRight.totalTime * 8 / 14) {
                    tea.x += tea.game.clockTick * tea.walkSpeed;
                    tea.centerX += tea.game.clockTick * tea.walkSpeed;
                }
                // width = tea.animationWalkRight.frameWidth;
                // height =  tea.animationWalkRight.frameHeight;
            } else if (tea.moveDirection == 2) {
                if (tea.lookDirectionRight) {
                    if (tea.animationWalkRight.elapsedTime < tea.animationWalkRight.totalTime * 8 / 14) {
                        tea.y += tea.game.clockTick * tea.walkSpeed;
                        tea.centerY += tea.game.clockTick * tea.walkSpeed;
                    }
                    // width =  tea.animationWalkRight.frameWidth;
                    // height =  tea.animationWalkRight.frameHeight;
                } else {
                    if (tea.animationWalkLeft.elapsedTime < tea.animationWalkLeft.totalTime * 8 / 14) {
                        tea.y += tea.game.clockTick * tea.walkSpeed;
                        tea.centerY += tea.game.clockTick * tea.walkSpeed;
                    }
                    // width =  tea.animationWalkLeft.frameWidth;
                    // height =  tea.animationWalkLeft.frameHeight;
                }
            } else if (tea.moveDirection == 3) {
                if (tea.animationWalkLeft.elapsedTime < tea.animationWalkLeft.totalTime * 8 / 14) {
                    tea.x -= tea.game.clockTick * tea.walkSpeed;
                    tea.centerX -= tea.game.clockTick * tea.walkSpeed;
                }
                // width =  tea.animationWalkLeft.frameWidth;
                // height =  tea.animationWalkLeft.frameHeight;
            } else {
                if (tea.lookDirectionRight) {
                    if (tea.animationWalkRight.elapsedTime < tea.animationWalkRight.totalTime * 8 / 14) {
                        tea.y -= tea.game.clockTick * tea.walkSpeed;
                        tea.centerY -= tea.game.clockTick * tea.walkSpeed;
                    }
                    // width =  tea.animationWalkRight.frameWidth;
                    // height =  tea.animationWalkRight.frameHeight;
                        // console.log(width);
                } else {
                    if (tea.animationWalkLeft.elapsedTime < tea.animationWalkLeft.totalTime * 8 / 14) {
                        tea.y -= tea.game.clockTick * tea.walkSpeed;
                        tea.centerY -= tea.game.clockTick * tea.walkSpeed;
                    }
                    // width =  tea.animationWalkLeft.frameWidth;
                    // height =  tea.animationWalkLeft.frameHeight;
                }
            }
        } else {
            if (tea.moveDirection == 1) {
                if (tea.animationRunRight.elapsedTime < tea.animationRunRight.totalTime * 8 / 14) {
                    tea.x += tea.game.clockTick * tea.runSpeed;
                    tea.centerX += tea.game.clockTick * tea.runSpeed;
                }
                    // width =  tea.animationRunRight.frameWidth;
                    // height =  tea.animationRunRight.frameHeight;
            } else if (tea.moveDirection == 2) {
                if (tea.lookDirectionRight) {
                    if (tea.animationRunRight.elapsedTime < tea.animationRunRight.totalTime * 8 / 14) {
                        tea.y += tea.game.clockTick * tea.runSpeed;
                        tea.centerY += tea.game.clockTick * tea.runSpeed;
                    }
                    // width =  tea.animationRunRight.frameWidth;
                    // height =  tea.animationRunRight.frameHeight;
                } else {
                    if (tea.animationRunLeft.elapsedTime < tea.animationRunLeft.totalTime * 8 / 14) {
                        tea.y += tea.game.clockTick * tea.runSpeed;
                        tea.centerY += tea.game.clockTick * tea.runSpeed;
                    }
                    // width =  tea.animationRunLeft.frameWidth;
                    // height =  tea.animationRunLeft.frameHeight;
                }
            } else if (tea.moveDirection == 3) {
                if (tea.animationRunLeft.elapsedTime < tea.animationRunLeft.totalTime * 8 / 14) {
                    tea.x -= tea.game.clockTick * tea.runSpeed;
                    tea.centerX -= tea.game.clockTick * tea.runSpeed;
                }
                // width =  tea.animationRunLeft.frameWidth;
                // height =  tea.animationRunLeft.frameHeight;
            } else {
                if (tea.lookDirectionRight) {
                    if (tea.animationRunRight.elapsedTime < tea.animationRunRight.totalTime * 8 / 14) {
                        tea.y -= tea.game.clockTick * tea.runSpeed;
                        tea.centerY -= tea.game.clockTick * tea.runSpeed;
                    }
                    // width = tea.animationRunRight.frameWidth;
                    // height = tea.animationRunRight.frameHeight;
                } else {
                    if (tea.animationRunLeft.elapsedTime < tea.animationRunLeft.totalTime * 8 / 14) {
                        tea.y -= tea.game.clockTick * tea.runSpeed;
                        tea.centerY -= tea.game.clockTick * tea.runSpeed;
                    }
                    // width =  tea.animationRunLeft.frameWidth;
                    // height =  tea.animationRunLeft.frameHeight;
                }
            }
        }
    }
    // tea.centerX = tea.x + width / 2;
    // tea.centerY = tea.y + height / 2;
    // console.log(tea.moveDirection)
    // console.log(tea.lookDirectionRight)
    // console.log(tea.centerX)
    // console.log(x - tea.centerX);
    // console.log(tea.y - tea.centerY);
    xy = getXY(tea.centerX, tea.centerY);
    if (xy.x == GAMEBOARD.length - 1 && GAMEBOARD[xy.x][xy.y].end) {
        tea.hp = 0; //dead
        // console.log("true");
        // console.log(GAMEBOARD.length);
        // console.log(xy);
        // console.log(tea.centerX)
    } 
    
    // else if (xy.x > GAMEBOARD.length - 1) {
        // console.log(xy)
    // }
    // console.log("x:" + tea.x + ", y:" + tea.y + ", cx" + tea.centerX + ", cy:" + tea.centerY);
    // var difX = this.centerX - spawnX;
    // var difY =  spawnY - this.centerY;
    // // console.log("dx:" + difX + ", dy:" + difY);
    // this.centerX = this.centerX - Math.abs(difX);
    // this.centerY = this.centerY - Math.abs(difY);
    // tea.centerX = ( width - x ) / 2;
    // tea.centerY = ( height - y ) / 2;
    // console.log(tea.centerX + " " + tea.centerY)
    // console.log(getXY(this.centerX, this.centerY));
    // console.log ("x: " + tea.centerX + " y: " + tea.centerY );

    //start at -50 50 
    // console.log("x: " + x + " y: " + y + " w: " + width + " h: " + height);
    // drawRect(tea.ctx, tea.startX, tea.startY, tea.frameWidth, tea.frameHeight);
    // console.log(tea.game.entities.length);

    for (var i = 0; i < tea.game.entities.length; i++) {
        var ent = tea.game.entities[i];
        if (ent !== tea && ent.isBoba && collide(ent, tea)) {
            //collide
             console.log(tea.name + " collide with " + ent.name);
            ent.removeFromWorld = true;
            tea.hp--;
        }
    }
}

var getXY = function(x, y) {
    var i = Math.floor(x/100) + 1;
    var j = Math.floor(y/100);
  
    return {x: i, y: j}
}

//make it bidirection ?
function getShortestPath(x, y) {
    var queue = [];

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
				return helperToGetDirection(node);
            }

            if (node.x + 1 < GAMEBOARD.length && node.x + 1 >= 0 && !GAMEBOARD[node.x + 1][node.y].occupied 
                && GAMEBOARD[node.x + 1][node.y].dir < 0) {
                var newNode = Object.assign({}, node);
                newNode.x++;
                queue.push(newNode);
				GAMEBOARD[node.x + 1][node.y].distToXY = GAMEBOARD[node.x][node.y].distToXY + 1;
				GAMEBOARD[node.x + 1][node.y].dir = 1;
            }
            if (node.y + 1 < GAMEBOARD[0].length && node.y + 1 >= 0 && !GAMEBOARD[node.x][node.y + 1].occupied 
                && GAMEBOARD[node.x][node.y + 1].dir < 0) {
                var newNode = Object.assign({}, node);
                newNode.y++;
                queue.push(newNode);
				GAMEBOARD[node.x][node.y + 1].distToXY = GAMEBOARD[node.x][node.y].distToXY + 1;
				GAMEBOARD[node.x][node.y + 1].dir = 2;
            }
            if (node.x - 1 < GAMEBOARD.length && node.x - 1 >= 0 && !GAMEBOARD[node.x - 1][node.y].occupied 
                && GAMEBOARD[node.x - 1][node.y].dir < 0) {
                var newNode = Object.assign({}, node);
                newNode.x--;
                queue.push(newNode);
				GAMEBOARD[node.x - 1][node.y].distToXY = GAMEBOARD[node.x][node.y].distToXY + 1;
				GAMEBOARD[node.x - 1][node.y].dir = 3;
            }
            if (node.y - 1 < GAMEBOARD[0].length && node.y - 1 >= 0 && !GAMEBOARD[node.x][node.y - 1].occupied 
                && GAMEBOARD[node.x][node.y - 1].dir < 0) {
                var newNode = Object.assign({}, node);
                newNode.y--;
                queue.push(newNode);
				GAMEBOARD[node.x][node.y - 1].distToXY = GAMEBOARD[node.x][node.y].distToXY + 1;
				GAMEBOARD[node.x][node.y - 1].dir = 4;
            }
        }
    }
    return 0; // no shortest path
};

function helperToGetDirection(node) {

    // if (node.x == 2 && node.y > 0) {
    //     console.log("problem")
    // }
	if(GAMEBOARD[node.x][node.y].distToXY == 0) {
		return node.linkedDir;
	}

	if (node.x + 1 < GAMEBOARD.length && node.x + 1 >= 0 && !GAMEBOARD[node.x + 1][node.y].occupied
		&& GAMEBOARD[node.x + 1][node.y].distToXY == GAMEBOARD[node.x][node.y].distToXY - 1) {
		node.linkedDir = GAMEBOARD[node.x][node.y].dir;
		node.x++;
		return helperToGetDirection(node);
	}
	if (node.y + 1 < GAMEBOARD[0].length && node.y + 1 >= 0 && !GAMEBOARD[node.x][node.y + 1].occupied
		&& GAMEBOARD[node.x][node.y + 1].distToXY == GAMEBOARD[node.x][node.y].distToXY - 1) {
		node.linkedDir = GAMEBOARD[node.x][node.y].dir;
		node.y++;
		return helperToGetDirection(node);
	}
	if (node.x - 1 < GAMEBOARD.length && node.x - 1 >= 0 && !GAMEBOARD[node.x - 1][node.y].occupied
		&& GAMEBOARD[node.x - 1][node.y].distToXY == GAMEBOARD[node.x][node.y].distToXY - 1) {
		node.linkedDir = GAMEBOARD[node.x][node.y].dir;
		node.x--;
		return helperToGetDirection(node);
	}
	if (node.y - 1 < GAMEBOARD[0].length && node.y - 1 >= 0 && !GAMEBOARD[node.x][node.y - 1].occupied 
		&& GAMEBOARD[node.x][node.y - 1].distToXY == GAMEBOARD[node.x][node.y].distToXY - 1) {
		node.linkedDir = GAMEBOARD[node.x][node.y].dir;
        node.y--;
		return helperToGetDirection(node);
	}
};

