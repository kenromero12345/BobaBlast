var enemyDraw = function(enemy) {
    if(enemy.game.running) {
        if (enemy.hp <= 0) {
            if (enemy.lookDirectionRight) {
                enemy.animationDisappearRight.drawFrame(enemy.game.clockTick, enemy.ctx, enemy.x, enemy.y);
                if (enemy.animationDisappearRight.isDone()) {
                    enemy.removeFromWorld = true;
                }
            } else {
                enemy.animationDisappearLeft.drawFrame(enemy.game.clockTick, enemy.ctx, enemy.x, enemy.y);
                if (enemy.animationDisappearLeft.isDone()) {
                    enemy.removeFromWorld = true;
                }
            }
        } else {
            if (enemy.moveDirection == 1) {
                enemy.animationWalkRight.drawFrame(enemy.game.clockTick, enemy.ctx, enemy.x, enemy.y);
            } else if (enemy.moveDirection == 2) {
                if (enemy.lookDirectionRight) {
                    enemy.animationWalkRight.drawFrame(enemy.game.clockTick, enemy.ctx, enemy.x, enemy.y);
                } else {
                    enemy.animationWalkLeft.drawFrame(enemy.game.clockTick, enemy.ctx, enemy.x, enemy.y);
                }
            } else if (enemy.moveDirection == 3) {
                enemy.animationWalkLeft.drawFrame(enemy.game.clockTick, enemy.ctx, enemy.x, enemy.y);
            } else {
                if (enemy.lookDirectionRight) {
                    enemy.animationWalkRight.drawFrame(enemy.game.clockTick, enemy.ctx, enemy.x, enemy.y);
                } else {
                    enemy.animationWalkLeft.drawFrame(enemy.game.clockTick, enemy.ctx, enemy.x, enemy.y);
                }
            }
        }
        this.drawBoundingBox();
    }
}

var enemyUpdateLookHelper = function(enemy) {
    if (enemy.moveDirection == 1) {
        enemy.lookDirectionRight = true;
    } else if (enemy.moveDirection == 3) {
        enemy.lookDirectionRight = false;
    }
}

var enemyUpdateHelper = function (enemy) {
    // console.log(enemy.centerX + " " + enemy.centerY)
    if (enemy.hp > 0) {
        if (enemy.moveDirection == 1) {
     
                enemy.x += enemy.game.clockTick * enemy.speed;
                enemy.centerX += enemy.game.clockTick * enemy.speed;
                enemy.boundingbox.x += enemy.game.clockTick * enemy.speed;
            
        } else if (enemy.moveDirection == 2) {
            if (enemy.lookDirectionRight) {
             
                    enemy.y += enemy.game.clockTick * enemy.speed;
                    enemy.centerY +=enemy.game.clockTick * enemy.speed;
                    enemy.boundingbox.y += enemy.game.clockTick * enemy.speed;
                
            } else {
           
                    enemy.y += enemy.game.clockTick * enemy.speed;
                    enemy.centerY += enemy.game.clockTick * enemy.speed;
                    enemy.boundingbox.y += enemy.game.clockTick * enemy.speed;
                
            }
        } else if (enemy.moveDirection == 3) {
        
                enemy.x -= enemy.game.clockTick * enemy.speed;
                enemy.centerX -= enemy.game.clockTick * enemy.speed;
                enemy.boundingbox.x -= enemy.game.clockTick * enemy.speed;
            
        } else {
            if (enemy.lookDirectionRight) {
            
                    enemy.y -= enemy.game.clockTick * enemy.speed;
                    enemy.centerY -= enemy.game.clockTick * enemy.speed;
                    enemy.boundingbox.y -= enemy.game.clockTick * enemy.speed;
                    
            } else {
                
                    enemy.y -= enemy.game.clockTick * enemy.speed;
                    enemy.centerY -= enemy.game.clockTick * enemy.speed;
                    enemy.boundingbox.y -= enemy.game.clockTick * enemy.speed;
                
            }
        }
    }
}