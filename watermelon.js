function watermelon(game, spawnX, spawnY, scale) {
    // console.log(slimeOffsetY)
    this.width = 73 * scale;
    this.height = 80 * scale;
    this.name = "green slime";
    this.speed = 100;
    this.x = spawnX - 50;
    this.y = spawnY - 50;
    this.centerX = this.x + this.width / 2;
    this.centerY = this.y + this.height / 2;
        // console.log("x:" + this.x + ", y:" + this.y + ", cx" + this.centerX + ", cy:" + this.centerY);
    var difX = this.centerX - spawnX;
    var difY =  spawnY - this.centerY;
    // console.log("dx:" + difX + ", dy:" + difY);
    this.centerX = this.centerX - difX;
    this.centerY = this.centerY + difY;
    this.x = this.x - difX;
    this.y = this.y + difY;
        // console.log("x:" + this.x + ", y:" + this.y + ", cx" + this.centerX + ", cy:" + this.centerY);
    this.game = game;
    this.ctx = game.ctx;
    this.moveDirection = 1; //1 is right, down, left, up
    this.lookDirectionRight = true;
    this.hp = 50;//
    this.animationWalkLeft = new Animation(AM.getAsset("./img/watermelon.png")
    , 0, 82, 62, 68, 4, .135, 4, true, scale, false);
    this.animationDisappearLeft = new Animation(AM.getAsset("./img/watermelon.png")
    , 0, 245, 62, 74, 14, .25, 14, false, scale, false);
    this.animationWalkRight = new Animation(AM.getAsset("./img/watermelonFlip.png")
    , 1394, 82, -62, 68, 4, .135, 4, true, scale, false);
    this.animationDisappearRight = new Animation(AM.getAsset("./img/watermelonFlip.png")
    , 1394, 245, -62, 74, 14, .25, 14, false, scale, false);
}

watermelon.prototype.draw = function () {
    if(this.game.running) {
        if (this.hp <= 0) {
            if (this.lookDirectionRight) {
                if (this.animationDisappearRight.currentFrame() == 1) {
                    this.animationDisappearRight.startX = 1394-2;
                    this.animationDisappearRight.frameWidth = -70;
                } else if (this.animationDisappearRight.currentFrame() == 2) {
                    this.animationDisappearRight.startX = 1394-6;
                    this.animationDisappearRight.frameWidth = -72;
                } else if (this.animationDisappearRight.currentFrame() == 3) {
                    this.animationDisappearRight.startX = 1394-12;
                    this.animationDisappearRight.frameWidth = -72;
                } else if (this.animationDisappearRight.currentFrame() == 4) {
                    this.animationDisappearRight.offsetX = -5;
                    this.animationDisappearRight.startX = 1394+12;
                    this.animationDisappearRight.frameWidth = -82;
                } else if (this.animationDisappearRight.currentFrame() == 5) {
                    this.animationDisappearRight.offsetX = -5;
                    this.animationDisappearRight.startX = 1394-18;
                    this.animationDisappearRight.frameWidth = -78;
                } else if (this.animationDisappearRight.currentFrame() == 6) {
                    this.animationDisappearRight.offsetX = -6;
                    this.animationDisappearRight.startX = 1394-20;
                    this.animationDisappearRight.frameWidth = -77;
                } else if (this.animationDisappearRight.currentFrame() == 7) {
                    this.animationDisappearRight.startX = 1394-6-1;
                    this.animationDisappearRight.frameWidth = -78;
                } else if (this.animationDisappearRight.currentFrame() == 8) {
                    this.animationDisappearRight.offsetX = -17;
                    this.animationDisappearRight.startX = 1394+120;
                    this.animationDisappearRight.frameWidth = -95;
                } else if (this.animationDisappearRight.currentFrame() == 9) {
                    this.animationDisappearRight.offsetX = -42;
                    this.animationDisappearRight.startX = 1394+522;
                    this.animationDisappearRight.frameWidth = -140;
                } else if (this.animationDisappearRight.currentFrame() == 10) {//todo: 
                    this.animationDisappearRight.offsetX = -58;
                    this.animationDisappearRight.startX = 1394+602;
                    this.animationDisappearRight.frameWidth = -150;
                } else if (this.animationDisappearRight.currentFrame() == 11) {
                    this.animationDisappearRight.offsetX = -30;
                    this.animationDisappearRight.startX = 1394+398;
                    this.animationDisappearRight.frameWidth = -130;
                } else if (this.animationDisappearRight.currentFrame() == 12) {
                    this.animationDisappearRight.offsetX = -35;
                    this.animationDisappearRight.startX = 1394+408-3;
                    this.animationDisappearRight.frameWidth = -130;
                } else if (this.animationDisappearRight.currentFrame() == 13) {
                    this.animationDisappearRight.offsetX = -41;
                    this.animationDisappearRight.startX = 1394+408;
                    this.animationDisappearRight.frameWidth = -130;
                } else {
                    this.animationDisappearRight.offsetX = 0;
                    this.animationDisappearRight.startX = 1394;
                    this.animationDisappearRight.frameWidth = -68;
                }
                this.animationDisappearRight.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
                if (this.animationDisappearRight.isDone()) {
                    this.removeFromWorld = true;
                }
            } else {
                if (this.animationDisappearLeft.currentFrame() == 1) {
                    this.animationDisappearLeft.startX = 2;
                    this.animationDisappearLeft.frameWidth = 70;
                } else if (this.animationDisappearLeft.currentFrame() == 2) {
                    this.animationDisappearLeft.startX = 6;
                    this.animationDisappearLeft.frameWidth = 72;
                } else if (this.animationDisappearLeft.currentFrame() == 3) {
                    this.animationDisappearLeft.startX = 12;
                    this.animationDisappearLeft.frameWidth = 72;
                } else if (this.animationDisappearLeft.currentFrame() == 4) {
                    this.animationDisappearLeft.offsetX = 5;
                    this.animationDisappearLeft.startX = -12;
                    this.animationDisappearLeft.frameWidth = 82;
                } else if (this.animationDisappearLeft.currentFrame() == 5) {
                    this.animationDisappearLeft.offsetX = 5;
                    this.animationDisappearLeft.startX = 18;
                    this.animationDisappearLeft.frameWidth = 78;
                } else if (this.animationDisappearLeft.currentFrame() == 6) {
                    this.animationDisappearLeft.offsetX = 6;
                    this.animationDisappearLeft.startX = 20;
                    this.animationDisappearLeft.frameWidth = 77;
                } else if (this.animationDisappearLeft.currentFrame() == 7) {
                    this.animationDisappearLeft.startX = 6;
                    this.animationDisappearLeft.frameWidth = 78;
                } else if (this.animationDisappearLeft.currentFrame() == 8) {
                    this.animationDisappearLeft.startX = -120;
                    this.animationDisappearLeft.frameWidth = 95;
                } else if (this.animationDisappearLeft.currentFrame() == 9) {
                    this.animationDisappearLeft.offsetX = -16;
                    this.animationDisappearLeft.startX = -522;
                    this.animationDisappearLeft.frameWidth = 140;
                } else if (this.animationDisappearLeft.currentFrame() == 10) {//todo: 
                    this.animationDisappearLeft.offsetX = -10;
                    this.animationDisappearLeft.startX = -602;
                    this.animationDisappearLeft.frameWidth = 150;
                } else if (this.animationDisappearLeft.currentFrame() == 11) {
                    this.animationDisappearLeft.offsetX = -14;
                    this.animationDisappearLeft.startX = -398;
                    this.animationDisappearLeft.frameWidth = 130;
                } else if (this.animationDisappearLeft.currentFrame() == 12) {
                    this.animationDisappearLeft.offsetX = -10;
                    this.animationDisappearLeft.startX = -408;
                    this.animationDisappearLeft.frameWidth = 130;
                } else if (this.animationDisappearLeft.currentFrame() == 13) {
                    this.animationDisappearLeft.offsetX = 2;
                    this.animationDisappearLeft.startX = -408;
                    this.animationDisappearLeft.frameWidth = 130;
                } else {
                    this.animationDisappearLeft.offsetX = 0;
                    this.animationDisappearLeft.startX = 0;
                    this.animationDisappearLeft.frameWidth = 68;
                }
                this.animationDisappearLeft.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
                if (this.animationDisappearLeft.isDone()) {
                    this.removeFromWorld = true;
                }
            }
        } else {
            if (this.moveDirection == 1) {
                this.animationWalkRight.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
            } else if (this.moveDirection == 2) {
                if (this.lookDirectionRight) {
                    this.animationWalkRight.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
                } else {
                    this.animationWalkLeft.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
                }
            } else if (this.moveDirection == 3) {
                this.animationWalkLeft.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
            } else {
                if (this.lookDirectionRight) {
                    this.animationWalkRight.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
                } else {
                    this.animationWalkLeft.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
                }
            }
        }
    }
}
// var rightAnim = function(slime) {
//     // if (slime.animationWalkRight.currentFrame() == 4) {
//     //     slime.animationWalkRight.startY = 59 + slime.slimeOffsetY;
//     //     slime.animationWalkRight.offsetY = -11;
//     //     slime.animationWalkRight.frameHeight = 85;
//     // } else if (slime.animationWalkRight.currentFrame() == 1) {
//     //     slime.animationWalkRight.startY = 70 + slime.slimeOffsetY;
//     //     slime.animationWalkRight.offsetY = 0;
//     //     slime.animationWalkRight.frameHeight = 80;
//     //     slime.animationWalkRight.offsetX = 1;
//     //     slime.animationWalkRight.startX = 252;
//     // } else if (slime.animationWalkRight.currentFrame() == 2) {
//     //     slime.animationWalkRight.startY = 70 + slime.slimeOffsetY;
//     //     slime.animationWalkRight.offsetY = 0;
//     //     slime.animationWalkRight.frameHeight = 80;
//     //     slime.animationWalkRight.offsetX = -1;
//     //     slime.animationWalkRight.startX = 252.8;
//     //     slime.animationWalkRight.frameWidth = 73;
//     // } else {
//     //     slime.animationWalkRight.startY = 70 + slime.slimeOffsetY;
//     //     slime.animationWalkRight.offsetY = 0;
//     //     slime.animationWalkRight.frameHeight = 80;
//     //     slime.animationWalkRight.offsetX = 0;
//     //     slime.animationWalkRight.startX = 24;
//     //     slime.animationWalkRight.frameWidth = 75;
//     // }

//     // if (slime.animationWalkRight.currentFrame() == 4) {
//     //     slime.animationWalkRight.startY = 58 + slime.slimeOffsetY;
//     //     slime.animationWalkRight.offsetY = -12;
//     //     // slime.animationWalkRight.offsetX = ;
//     //     slime.animationWalkRight.startX = 263;
//     //     slime.animationWalkRight.frameWidth = 72;
//     // } else if (slime.animationWalkRight.currentFrame() >= 2 && slime.animationWalkRight.currentFrame() <= 3) {
//     //     slime.animationWalkRight.offsetX = 20;
//     //     slime.animationWalkRight.startX = 266;
//     //     slime.animationWalkRight.frameHeight = 87;
//     //     slime.animationWalkRight.frameWidth = 71;
//     // } else if (slime.animationWalkRight.currentFrame() == 6) {
//     //     slime.animationWalkRight.offsetX = 28;
//     //     slime.animationWalkRight.startX = 260;
//     //     slime.animationWalkRight.frameHeight = 89;
//     //     slime.animationWalkRight.frameWidth = 72;
//     //     slime.animationWalkRight.startY = 70 + slime.slimeOffsetY;
//     //     slime.animationWalkRight.offsetY = 0;
//     // } else if (slime.animationWalkRight.currentFrame() == 5) {
//     //     slime.animationWalkRight.offsetX = 28;
//     //     slime.animationWalkRight.startX = 265;
//     //     slime.animationWalkRight.frameHeight = 87;
//     //     slime.animationWalkRight.frameWidth = 71;
//     //     slime.animationWalkRight.startY = 70 + slime.slimeOffsetY;
//     //     slime.animationWalkRight.offsetY = 0;   
//     // } else {
//     //     slime.animationWalkRight.startY = 70 + slime.slimeOffsetY;
//     //     slime.animationWalkRight.offsetY = 0;
//     //     slime.animationWalkRight.offsetX = 0;
//     //     slime.animationWalkRight.startX = 216;
//     //     slime.animationWalkRight.frameHeight = 80;
//     //     slime.animationWalkRight.frameWidth = 79;
//     // }

//     if (slime.animationWalkRight.currentFrame() == 4) {
//         slime.animationWalkRight.startY = 58 + slime.slimeOffsetY;
//         slime.animationWalkRight.offsetY = -12;
//         slime.animationWalkRight.frameWidth = -72;
//     } else if (slime.animationWalkRight.currentFrame() >= 2 && slime.animationWalkRight.currentFrame() <= 3) {
//         slime.animationWalkRight.offsetX = 4+1;
//         slime.animationWalkRight.startX = 774-9-1;
//         slime.animationWalkRight.frameHeight = 87;
//         slime.animationWalkRight.frameWidth = -71;
//     } else if (slime.animationWalkRight.currentFrame() == 6) {
//         slime.animationWalkRight.offsetX = 5;
//         slime.animationWalkRight.startX = 774-10;
//         slime.animationWalkRight.frameHeight = 89;
//         slime.animationWalkRight.frameWidth = -72;
//         slime.animationWalkRight.startY = 70 + slime.slimeOffsetY;
//         slime.animationWalkRight.offsetY = 0;
//     } else if (slime.animationWalkRight.currentFrame() == 5) {
//         slime.animationWalkRight.offsetX = 5;
//         slime.animationWalkRight.startX = 774-11;
//         slime.animationWalkRight.frameHeight = 87;
//         slime.animationWalkRight.frameWidth = -71;
//         slime.animationWalkRight.startY = 70 + slime.slimeOffsetY;
//         slime.animationWalkRight.offsetY = 0;
//     } else {
//         slime.animationWalkRight.startY = 70 + slime.slimeOffsetY;
//         slime.animationWalkRight.offsetY = 0;
//         slime.animationWalkRight.offsetX = 0;
//         slime.animationWalkRight.startX = 774-5;
//         slime.animationWalkRight.frameHeight = 80;
//         slime.animationWalkRight.frameWidth = -78;
//     }
//     slime.animationWalkRight.drawFrame(slime.game.clockTick, slime.ctx, slime.x, slime.y);
// }

// var leftAnim = function(slime) {
//     if (slime.animationWalkLeft.currentFrame() == 4) {
//         slime.animationWalkLeft.startY = 58 + slime.slimeOffsetY;
//         slime.animationWalkLeft.offsetY = -12;
//         slime.animationWalkLeft.frameWidth = 72;
//     } else if (slime.animationWalkLeft.currentFrame() >= 2 && slime.animationWalkLeft.currentFrame() <= 3) {
//         slime.animationWalkLeft.offsetX = -4;
//         slime.animationWalkLeft.startX = 9;
//         slime.animationWalkLeft.frameHeight = 87;
//         slime.animationWalkLeft.frameWidth = 71;
//     } else if (slime.animationWalkLeft.currentFrame() == 6) {
//         slime.animationWalkLeft.offsetX = -5;
//         slime.animationWalkLeft.startX = 10;
//         slime.animationWalkLeft.frameHeight = 89;
//         slime.animationWalkLeft.frameWidth = 72;
//         slime.animationWalkLeft.startY = 70 + slime.slimeOffsetY;
//         slime.animationWalkLeft.offsetY = 0;
//     } else if (slime.animationWalkLeft.currentFrame() == 5) {
//         slime.animationWalkLeft.offsetX = -5;
//         slime.animationWalkLeft.startX = 11;
//         slime.animationWalkLeft.frameHeight = 87;
//         slime.animationWalkLeft.frameWidth = 71;
//         slime.animationWalkLeft.startY = 70 + slime.slimeOffsetY;
//         slime.animationWalkLeft.offsetY = 0;
//     } else {
//         slime.animationWalkLeft.startY = 70 + slime.slimeOffsetY;
//         slime.animationWalkLeft.offsetY = 0;
//         slime.animationWalkLeft.offsetX = 0;
//         slime.animationWalkLeft.startX = 5;
//         slime.animationWalkLeft.frameHeight = 80;
//         slime.animationWalkLeft.frameWidth = 79;
//     }
//     slime.animationWalkLeft.drawFrame(slime.game.clockTick, slime.ctx, slime.x, slime.y);
// }

watermelon.prototype.update = function () {
    // console.log(this.centerX + " " + this.centerY)
    if(this.game.running) {
        var xy = getXY(this.centerX, this.centerY);
        if (((this.centerX +  100) % 100 > 48 && (this.centerX + 100) % 100 < 52
            && this.centerY % 100 > 48 && this.centerY % 100 < 52)) {
            this.moveDirection = getShortestPath(this.centerX, this.centerY);
            enemyUpdateLookHelper(this);
        }

        //slimeUpdate(this);
        enemyUpdateHelper(this);

        xy = getXY(this.centerX, this.centerY);
        if (xy.x == GAMEBOARD.length - 1 && GAMEBOARD[xy.x][xy.y].end) {
            this.hp = 0; //dead
        } 
        
        // else i
        for (var i = 0; i < this.game.entities.length; i++) {
            var ent = this.game.entities[i];
            if (ent !== this && ent.isBoba && collide(ent, this)) {
                ent.removeFromWorld = true;
                this.hp--;
            }
        }
    }
}

// var slimeUpdate = function (enemy) {
//     // console.log(enemy.centerX + " " + enemy.centerY)
//     if (enemy.hp > 0) {
//         if (enemy.moveDirection == 1) {
//             if (enemy.animationWalkRight.currentFrame() >= 1 && enemy.animationWalkRight.currentFrame() <= 5) {
//                 enemy.x += enemy.game.clockTick * enemy.speed;
//                 enemy.centerX += enemy.game.clockTick * enemy.speed;
//             }
//         } else if (enemy.moveDirection == 2) {
//             if (enemy.lookDirectionRight) {
//                 if (enemy.animationWalkRight.currentFrame() >= 1 && enemy.animationWalkRight.currentFrame() <= 5) {
//                     enemy.y += enemy.game.clockTick * enemy.speed;
//                     enemy.centerY +=enemy.game.clockTick * enemy.speed;
//                 }
//             } else {
//                 if (enemy.animationWalkLeft.currentFrame() >= 1 && enemy.animationWalkLeft.currentFrame() <= 5) {
//                     enemy.y += enemy.game.clockTick * enemy.speed;
//                     enemy.centerY += enemy.game.clockTick * enemy.speed;
//                 }
//             }
//         } else if (enemy.moveDirection == 3) {
//             if (enemy.animationWalkLeft.currentFrame() >= 1 && enemy.animationWalkLeft.currentFrame() <= 5) {
//                 enemy.x -= enemy.game.clockTick * enemy.speed;
//                 enemy.centerX -= enemy.game.clockTick * enemy.speed;
//             }
//         } else {
//             if (enemy.lookDirectionRight) {
//                 if (enemy.animationWalkRight.currentFrame() >= 1 && enemy.animationWalkRight.currentFrame() <= 5) {
//                     enemy.y -= enemy.game.clockTick * enemy.speed;
//                     enemy.centerY -= enemy.game.clockTick * enemy.speed;
//                 }                    
//             } else {
//                 if (enemy.animationWalkLeft.currentFrame() >= 1 && enemy.animationWalkLeft.currentFrame() <= 5) {
//                     enemy.y -= enemy.game.clockTick * enemy.speed;
//                     enemy.centerY -= enemy.game.clockTick * enemy.speed;
//                 }
//             }
//         }
//     }
// }