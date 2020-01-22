var constructor = function (tea, game, spawnX, spawnY, isRun) {
    tea.x = spawnX - 50;
    tea.y = spawnY - 50;
    tea.centerX = tea.x + ( tea.walkWidth - tea.x ) / 2;
    tea.centerY = tea.y + ( tea.y - tea.walkHeight ) / 2;
    // console.log("x:" + tea.x + ", y:" + tea.y + ", cx" + tea.centerX + ", cy:" + tea.centerY);
    var difX = tea.centerX - spawnX;
    var difY =  spawnY - tea.centerY;
    // console.log("dx:" + difX + ", dy:" + difY);
    tea.centerX = tea.centerX - Math.abs(difX);
    tea.centerY = tea.centerY - Math.abs(difY);
    tea.x = tea.x - Math.abs(difX);
    tea.y = tea.y - Math.abs(difY);
    // console.log("x:" + tea.x + ", y:" + tea.y + ", cx" + tea.centerX + ", cy:" + tea.centerY);
    tea.walkSpeed = 100;
    tea.runSpeed = 200;
    tea.game = game;
    tea.ctx = game.ctx;
    tea.moveDirection = 1; //1 is right, down, left, up
    tea.lookDirectionRight = true;
    tea.paceWalk = !isRun;
    tea.hp = 10;
}

var draw = function (tea) {
    if (tea.hp <= 0) {
        if (tea.lookDirectionRight) {
            tea.animationDisappearRight.drawFrame(tea.game.clockTick, tea.ctx, tea.x, tea.y);
        } else {
            tea.animationDisappearLeft.drawFrame(tea.game.clockTick, tea.ctx, tea.x, tea.y);
        }
    } else if (tea.paceWalk) {
        if (tea.moveDirection == 1) {
            tea.animationWalkRight.drawFrame(tea.game.clockTick, tea.ctx, tea.x, tea.y);
        } else if (tea.moveDirection == 2) {
            if (tea.lookDirectionRight) {
                // console.log("a");
                tea.animationWalkDownLookRight.drawFrame(tea.game.clockTick, tea.ctx, tea.x, tea.y);
            } else {
                tea.animationWalkDownLookLeft.drawFrame(tea.game.clockTick, tea.ctx, tea.x, tea.y);
            }
        } else if (tea.moveDirection == 3) {
            tea.animationWalkLeft.drawFrame(tea.game.clockTick, tea.ctx, tea.x, tea.y);
        } else {
            if (tea.lookDirectionRight) {
                tea.animationWalkUpLookRight.drawFrame(tea.game.clockTick, tea.ctx, tea.x, tea.y);
            } else {
                tea.animationWalkUpLookLeft.drawFrame(tea.game.clockTick, tea.ctx, tea.x, tea.y);
            }
        }
    } else {
        if (tea.moveDirection == 1) {
            tea.animationRunRight.drawFrame(tea.game.clockTick, tea.ctx, tea.x, tea.y);
        } else if (tea.moveDirection == 2) {
            if (tea.lookDirectionRight) {
                tea.animationRunDownLookRight.drawFrame(tea.game.clockTick, tea.ctx, tea.x, tea.y);
            } else {
                tea.animationRunDownLookLeft.drawFrame(tea.game.clockTick, tea.ctx, tea.x, tea.y);
            }
        } else if (tea.moveDirection == 3) {
            tea.animationRunLeft.drawFrame(tea.game.clockTick, tea.ctx, tea.x, tea.y);
        } else {
            if (tea.lookDirectionRight) {
                tea.animationRunUpLookRight.drawFrame(tea.game.clockTick, tea.ctx, tea.x, tea.y);
            } else {
                tea.animationRunUpLookLeft.drawFrame(tea.game.clockTick, tea.ctx, tea.x, tea.y);
            }
        }
    }
}

var update = function (tea) {
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
    var x;
    var y;
    var width;
    var height;
    if (tea.hp > 0) {
        if (tea.paceWalk) {
            if (tea.moveDirection == 1) {
                if (tea.animationWalkRight.elapsedTime < tea.animationWalkRight.totalTime * 8 / 14)
                    tea.x += tea.game.clockTick * tea.walkSpeed;
                    width = tea.animationWalkRight.frameWidth;
                    height =  tea.animationWalkRight.frameHeight;
            } else if (tea.moveDirection == 2) {
                if (tea.lookDirectionRight) {
                    if (tea.animationWalkDownLookRight.elapsedTime < tea.animationWalkDownLookRight.totalTime * 8 / 14)
                        tea.y += tea.game.clockTick * tea.walkSpeed;
                        width =  tea.animationWalkDownLookRight.frameWidth;
                        height =  tea.animationWalkDownLookRight.frameHeight;
                } else {
                    if (tea.animationWalkDownLookLeft.elapsedTime < tea.animationWalkDownLookLeft.totalTime * 8 / 14)
                        tea.y += tea.game.clockTick * tea.walkSpeed;
                        width =  tea.animationWalkDownLookLeft.frameWidth;
                        height =  tea.animationWalkDownLookLeft.frameHeight;
                }
            } else if (tea.moveDirection == 3) {
                if (tea.animationWalkLeft.elapsedTime < tea.animationWalkLeft.totalTime * 8 / 14)
                    tea.x -= tea.game.clockTick * tea.walkSpeed;
                    width =  tea.animationWalkLeft.frameWidth;
                    height =  tea.animationWalkLeft.frameHeight;
            } else {
                if (tea.lookDirectionRight) {
                    if (tea.animationWalkUpLookRight.elapsedTime < tea.animationWalkUpLookRight.totalTime * 8 / 14)
                        tea.y -= tea.game.clockTick * tea.walkSpeed;
                        width =  tea.animationWalkUpLookRight.frameWidth;
                        height =  tea.animationWalkUpLookRight.frameHeight;
                } else {
                    if (tea.animationWalkUpLookLeft.elapsedTime < tea.animationWalkUpLookLeft.totalTime * 8 / 14)
                        tea.y -= tea.game.clockTick * tea.walkSpeed;
                        width =  tea.animationWalkUpLookLeft.frameWidth;
                        height =  tea.animationWalkUpLookLeft.frameHeight;
                }
            }
        } else {
            if (tea.moveDirection == 1) {
                if (tea.animationRunRight.elapsedTime < tea.animationRunRight.totalTime * 8 / 14)
                    tea.x += tea.game.clockTick * tea.runSpeed;
                    width =  tea.animationRunRight.frameWidth;
                    height =  tea.animationRunRight.frameHeight;
            } else if (tea.moveDirection == 2) {
                if (tea.lookDirectionRight) {
                    if (tea.animationRunDownLookRight.elapsedTime < tea.animationRunDownLookRight.totalTime * 8 / 14)
                        tea.y += tea.game.clockTick * tea.runSpeed;
                        width =  tea.animationRunDownLookRight.frameWidth;
                        height =  tea.animationRunDownLookRight.frameHeight;
                } else {
                    if (tea.animationRunDownLookLeft.elapsedTime < tea.animationRunDownLookLeft.totalTime * 8 / 14)
                        tea.y += tea.game.clockTick * tea.runSpeed;
                        width =  tea.animationRunDownLookLeft.frameWidth;
                        height =  tea.animationRunDownLookLeft.frameHeight;
                }
            } else if (tea.moveDirection == 3) {
                if (tea.animationRunLeft.elapsedTime < tea.animationRunLeft.totalTime * 8 / 14)
                    tea.x -= tea.game.clockTick * tea.runSpeed;
                    width =  tea.animationRunLeft.frameWidth;
                    height =  tea.animationRunLeft.frameHeight;
            } else {
                if (tea.lookDirectionRight) {
                    if (tea.animationRunUpLookRight.elapsedTime < tea.animationRunUpLookRight.totalTime * 8 / 14)
                        tea.y -= tea.game.clockTick * tea.runSpeed;
                        width = tea.animationRunUpLookRight.frameWidth;
                        height = tea.animationRunUpLookRight.frameHeight;
                } else {
                    if (tea.animationRunUpLookLeft.elapsedTime < tea.animationRunUpLookLeft.totalTime * 8 / 14)
                        tea.y -= tea.game.clockTick * tea.runSpeed;
                        width =  tea.animationRunUpLookLeft.frameWidth;
                        height =  tea.animationRunUpLookLeft.frameHeight;
                }
            }
        }
    }
    x = tea.x;
    y = tea.y;
    tea.centerX = ( width - x ) / 2;
    tea.centerY = ( height - y ) / 2;
    // console.log ("x: " + tea.centerX + " y: " + tea.centerY );

    //start at -50 50 
    // console.log("x: " + x + " y: " + y + " w: " + width + " h: " + height);
    // drawRect(tea.ctx, tea.startX, tea.startY, tea.frameWidth, tea.frameHeight);
}

var getXY = function(x, y) {
    var i = Math.floor((x - BUBBLES_X_START + BUBBLES_GAP/2)/BUBBLES_GAP);
    var j = Math.floor((y - BUBBLES_Y_START + 9)/17.75);
  
    return {x: i, y: j}
}