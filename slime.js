// function slime(game, spawnX, spawnY, scale, num) {
//     this.slimeOffsetY = 0;
//     if (num == 1) {
//         this.slimeOffsetY = 424;
//     }
//     // console.log(slimeOffsetY)
//     this.width = 73 * scale;
//     this.height = 80 * scale;
//     this.name = "green slime";
//     this.speed = 100;
//     this.x = spawnX - 50;
//     this.y = spawnY - 50;
//     this.centerX = this.x + this.width / 2;
//     this.centerY = this.y + this.height / 2;
//         // console.log("x:" + this.x + ", y:" + this.y + ", cx" + this.centerX + ", cy:" + this.centerY);
//     var difX = this.centerX - spawnX;
//     var difY =  spawnY - this.centerY;
//     // console.log("dx:" + difX + ", dy:" + difY);
//     this.centerX = this.centerX - difX;
//     this.centerY = this.centerY + difY;
//     this.x = this.x - difX;
//     this.y = this.y + difY;
//         // console.log("x:" + this.x + ", y:" + this.y + ", cx" + this.centerX + ", cy:" + this.centerY);
//     this.game = game;
//     this.ctx = game.ctx;
//     this.moveDirection = 3; //1 is right, down, left, up
//     this.lookDirectionRight = true;
//     this.hp = 10;//50
//     this.animationWalkLeft = new Animation(AM.getAsset("./img/slime.png")
//     , 5, 70 + this.slimeOffsetY, 73, 80, 7, .135, 7, true, scale, false);
//     this.animationDisappearLeft = new Animation(AM.getAsset("./img/slime.png")
//     , 5, 225 + this.slimeOffsetY, 69, 70, 5, .4, 5, false, scale, false);
//     this.animationWalkRight = new Animation(AM.getAsset("./img/slimeFlip.png")
//     , 258, 70 + this.slimeOffsetY, 73, 80, 7, .135, 7, true, scale, true);//.135
//     this.animationDisappearRight = new Animation(AM.getAsset("./img/slimeFlip.png")
//     , 422, 225 + this.slimeOffsetY, 69, 70, 5, 0.4, 5, false, scale, true);
// }

// slime.prototype.draw = function () {
//     if(this.game.running) {
//         if (this.hp <= 0) {
//             if (this.lookDirectionRight) {
//                 if (this.animationDisappearRight.currentFrame() == 3) {
//                     // this.animationDisappearRight.offsetX = 10;
//                     this.animationDisappearRight.startX = 432;
//                     this.animationDisappearRight.frameWidth = 67;
//                 } else if (this.animationDisappearRight.currentFrame() == 4) {
//                     this.animationDisappearRight.offsetX = -20;
//                     this.animationDisappearRight.startX = 422;
//                     this.animationDisappearRight.frameWidth = 80;
//                 } else {
//                     this.animationDisappearRight.offsetX = 0;
//                     this.animationDisappearRight.startX = 422;
//                     this.animationDisappearRight.frameWidth = 69;
//                 }
//                 this.animationDisappearRight.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
//                 if (this.animationDisappearRight.isDone()) {
//                     this.removeFromWorld = true;
//                 }
//             } else {
//                 if (this.animationDisappearLeft.currentFrame() == 3) {
//                     this.animationDisappearLeft.offsetX = 6;
//                     this.animationDisappearLeft.startX = 7;
//                     this.animationDisappearLeft.frameWidth = 67;
//                 } else if (this.animationDisappearLeft.currentFrame() == 4) {
//                     this.animationDisappearLeft.offsetX = 35;
//                     this.animationDisappearLeft.startX = 5;
//                     this.animationDisappearLeft.frameWidth = 69;
//                 } else {
//                     this.animationDisappearLeft.offsetX = 0;
//                     this.animationDisappearLeft.startX = 5;
//                     this.animationDisappearLeft.frameWidth = 69;
//                 }
//                 this.animationDisappearLeft.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
//                 if (this.animationDisappearLeft.isDone()) {
//                     this.removeFromWorld = true;
//                 }
//             }
//         } else {
//             if (this.moveDirection == 1) {
//                rightAnim(this);
//             } else if (this.moveDirection == 2) {
//                 if (this.lookDirectionRight) {
//                     rightAnim(this);
//                 } else {
//                     leftAnim(this);
//                 }
//             } else if (this.moveDirection == 3) {
//                 leftAnim(this);
//             } else {
//                 if (this.lookDirectionRight) {
//                     rightAnim(this);
//                 } else {
//                     leftAnim(this);
//                 }
//             }
//         }
//     }
// }

// var rightAnim = function(slime) {
//     if (slime.animationWalkRight.currentFrame() == 4) {
//         slime.animationWalkRight.startY = 59 + slime.slimeOffsetY;
//         slime.animationWalkRight.offsetY = -11;
//         slime.animationWalkRight.frameHeight = 85;
//     } else if (slime.animationWalkRight.currentFrame() == 1) {
//         slime.animationWalkRight.startY = 70 + slime.slimeOffsetY;
//         slime.animationWalkRight.offsetY = 0;
//         slime.animationWalkRight.frameHeight = 80;
//         slime.animationWalkRight.offsetX = 1;
//         slime.animationWalkRight.startX = 257;
//     } else if (slime.animationWalkRight.currentFrame() == 2) {
//         slime.animationWalkRight.startY = 70 + slime.slimeOffsetY;
//         slime.animationWalkRight.offsetY = 0;
//         slime.animationWalkRight.frameHeight = 80;
//         slime.animationWalkRight.offsetX = -1;
//         slime.animationWalkRight.startX = 258;
//         slime.animationWalkRight.frameWidth = 73;
//     } else {
//         slime.animationWalkRight.startY = 70 + slime.slimeOffsetY;
//         slime.animationWalkRight.offsetY = 0;
//         slime.animationWalkRight.frameHeight = 80;
//         slime.animationWalkRight.offsetX = 0;
//         slime.animationWalkRight.startX = 258;
//         slime.animationWalkRight.frameWidth = 73;
//     }
//     slime.animationWalkRight.drawFrame(slime.game.clockTick, slime.ctx, slime.x, slime.y);
// }

// var leftAnim = function(slime) {
//     if (slime.animationWalkLeft.currentFrame() == 4) {
//         slime.animationWalkLeft.startY = 59 + slime.slimeOffsetY;
//         slime.animationWalkLeft.offsetY = -11;
//         slime.animationWalkLeft.frameHeight = 85;
//         slime.animationWalkLeft.frameWidth = 73;
//     } else if (slime.animationWalkLeft.currentFrame() == 1) {
//         slime.animationWalkLeft.offsetX = -1;
//         slime.animationWalkLeft.startX = 6;
//         slime.animationWalkLeft.frameHeight = 80;
//         slime.animationWalkLeft.frameWidth = 73;
//     } else if (slime.animationWalkLeft.currentFrame() == 2) {
//         slime.animationWalkLeft.offsetX = -2;
//         slime.animationWalkLeft.startX = 7;
//         slime.animationWalkLeft.frameHeight = 80;
//         slime.animationWalkLeft.frameWidth = 72;
//     } else {
//         slime.animationWalkLeft.startY = 70 + slime.slimeOffsetY;
//         slime.animationWalkLeft.offsetY = 0;
//         slime.animationWalkLeft.offsetX = 0;
//         slime.animationWalkLeft.startX = 5;
//         slime.animationWalkLeft.frameHeight = 80;
//         slime.animationWalkLeft.frameWidth = 73;
//     }
//     slime.animationWalkLeft.drawFrame(slime.game.clockTick, slime.ctx, slime.x, slime.y);
// }

// slime.prototype.update = function () {
//     // console.log(this.centerX + " " + this.centerY)
//     if(this.game.running) {
//         var xy = getXY(this.centerX, this.centerY);
//         if (((this.centerX +  100) % 100 > 48 && (this.centerX + 100) % 100 < 52
//             && this.centerY % 100 > 48 && this.centerY % 100 < 52)) {
//             this.moveDirection = getShortestPath(this.centerX, this.centerY);
//             enemyUpdateLookHelper(this);
//         }

//         slimeUpdate(this);

//         xy = getXY(this.centerX, this.centerY);
//         if (xy.x == GAMEBOARD.length - 1 && GAMEBOARD[xy.x][xy.y].end) {
//             this.hp = 0; //dead
//         } 
        
//         // else i
//         for (var i = 0; i < this.game.entities.length; i++) {
//             var ent = this.game.entities[i];
//             if (ent !== this && ent.isBoba && collide(ent, this)) {
//                 ent.removeFromWorld = true;
//                 this.hp--;
//             }
//         }
//     }
// }

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

// function slime(game, spawnX, spawnY, scale, num) {
//     this.slimeOffsetY = 0;
//     if (num == 1) {
//         this.slimeOffsetY = 425;
//     }
//     // console.log(slimeOffsetY)
//     this.width = 73 * scale;
//     this.height = 80 * scale;
//     this.name = "green slime";
//     this.speed = 0;
//     this.x = spawnX - 50;
//     this.y = spawnY - 50;
//     this.centerX = this.x + this.width / 2;
//     this.centerY = this.y + this.height / 2;
//     //     // console.log("x:" + this.x + ", y:" + this.y + ", cx" + this.centerX + ", cy:" + this.centerY);
//     // var difX = this.centerX - spawnX;
//     // var difY =  spawnY - this.centerY;
//     // // console.log("dx:" + difX + ", dy:" + difY);
//     // this.centerX = this.centerX - difX;
//     // this.centerY = this.centerY + difY;
//     // this.x = this.x - difX;
//     // this.y = this.y + difY;
//     //     // console.log("x:" + this.x + ", y:" + this.y + ", cx" + this.centerX + ", cy:" + this.centerY);
//     this.game = game;
//     this.ctx = game.ctx;
//     this.moveDirection = 1; //1 is right, down, left, up
//     this.lookDirectionRight = true;
//     this.hp = 10;//50
//     this.animationWalkLeft = new Animation(AM.getAsset("./img/slime.png")
//     , 5, 70 + this.slimeOffsetY, 79, 80, 7, 1, 7, true, scale, false);
//     this.animationDisappearLeft = new Animation(AM.getAsset("./img/slime.png")
//     , 5, 225 + this.slimeOffsetY, 69, 70, 5, .4, 5, false, scale, false);
//     this.animationWalkRight = new Animation(AM.getAsset("./img/slimeFlip.png")
//     , 258, 70 + this.slimeOffsetY, 79, 80, 7, 1, 7, true, scale, true);//.135
//     this.animationDisappearRight = new Animation(AM.getAsset("./img/slimeFlip.png")
//     , 422, 225 + this.slimeOffsetY, 69, 70, 5, 0.4, 5, false, scale, true);
// }

// slime.prototype.draw = function () {
//     if(this.game.running) {
//         if (this.hp <= 0) {
//             if (this.lookDirectionRight) {
//                 if (this.animationDisappearRight.currentFrame() == 3) {
//                     // this.animationDisappearRight.offsetX = 10;
//                     this.animationDisappearRight.startX = 432;
//                     this.animationDisappearRight.frameWidth = 67;
//                 } else if (this.animationDisappearRight.currentFrame() == 4) {
//                     this.animationDisappearRight.offsetX = -20;
//                     this.animationDisappearRight.startX = 422;
//                     this.animationDisappearRight.frameWidth = 80;
//                 } else {
//                     this.animationDisappearRight.offsetX = 0;
//                     this.animationDisappearRight.startX = 422;
//                     this.animationDisappearRight.frameWidth = 69;
//                 }
//                 this.animationDisappearRight.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
//                 if (this.animationDisappearRight.isDone()) {
//                     this.removeFromWorld = true;
//                 }
//             } else {
//                 if (this.animationDisappearLeft.currentFrame() == 3) {
//                     this.animationDisappearLeft.offsetX = 6;
//                     this.animationDisappearLeft.startX = 7;
//                     this.animationDisappearLeft.frameWidth = 67;
//                 } else if (this.animationDisappearLeft.currentFrame() == 4) {
//                     this.animationDisappearLeft.offsetX = 35;
//                     this.animationDisappearLeft.startX = 5;
//                     this.animationDisappearLeft.frameWidth = 69;
//                 } else {
//                     this.animationDisappearLeft.offsetX = 0;
//                     this.animationDisappearLeft.startX = 5;
//                     this.animationDisappearLeft.frameWidth = 69;
//                 }
//                 this.animationDisappearLeft.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
//                 if (this.animationDisappearLeft.isDone()) {
//                     this.removeFromWorld = true;
//                 }
//             }
//         } else {
//             if (this.moveDirection == 1) {
//                rightAnim(this);
//             } else if (this.moveDirection == 2) {
//                 if (this.lookDirectionRight) {
//                     rightAnim(this);
//                 } else {
//                     leftAnim(this);
//                 }
//             } else if (this.moveDirection == 3) {
//                 leftAnim(this);
//             } else {
//                 if (this.lookDirectionRight) {
//                     rightAnim(this);
//                 } else {
//                     leftAnim(this);
//                 }
//             }
//         }
//     }
// }

// var rightAnim = function(slime) {
//     if (slime.animationWalkRight.currentFrame() == 4) {
//         slime.animationWalkRight.startY = 59 + slime.slimeOffsetY;
//         slime.animationWalkRight.offsetY = -11;
//         slime.animationWalkRight.frameHeight = 85;
//     } else if (slime.animationWalkRight.currentFrame() == 1) {
//         slime.animationWalkRight.startY = 70 + slime.slimeOffsetY;
//         slime.animationWalkRight.offsetY = 0;
//         slime.animationWalkRight.frameHeight = 80;
//         slime.animationWalkRight.offsetX = 1;
//         slime.animationWalkRight.startX = 257;
//     } else if (slime.animationWalkRight.currentFrame() == 2) {
//         slime.animationWalkRight.startY = 70 + slime.slimeOffsetY;
//         slime.animationWalkRight.offsetY = 0;
//         slime.animationWalkRight.frameHeight = 80;
//         slime.animationWalkRight.offsetX = -1;
//         slime.animationWalkRight.startX = 257.8;
//         slime.animationWalkRight.frameWidth = 73;
//     } else {
//         slime.animationWalkRight.startY = 70 + slime.slimeOffsetY;
//         slime.animationWalkRight.offsetY = 0;
//         slime.animationWalkRight.frameHeight = 80;
//         slime.animationWalkRight.offsetX = 0;
//         slime.animationWalkRight.startX = 258;
//         slime.animationWalkRight.frameWidth = 73;
//     }
//     slime.animationWalkRight.drawFrame(slime.game.clockTick, slime.ctx, slime.x, slime.y);
// }

// var leftAnim = function(slime) {
//     if (slime.animationWalkLeft.currentFrame() == 4) {
//         slime.animationWalkLeft.startY = 59 + slime.slimeOffsetY;
//         slime.animationWalkLeft.offsetY = -11;
//         slime.animationWalkLeft.frameHeight = 85;
//         slime.animationWalkLeft.frameWidth = 73;
//     } else if (slime.animationWalkLeft.currentFrame() == 1) {
//         slime.animationWalkLeft.offsetX = -1;
//         slime.animationWalkLeft.startX = 6;
//         slime.animationWalkLeft.frameHeight = 80;
//         slime.animationWalkLeft.frameWidth = 73;
//     } else if (slime.animationWalkLeft.currentFrame() == 2) {
//         slime.animationWalkLeft.offsetX = -2;
//         slime.animationWalkLeft.startX = 7;
//         slime.animationWalkLeft.frameHeight = 80;
//         slime.animationWalkLeft.frameWidth = 72;
//     } else {
//         slime.animationWalkLeft.startY = 70 + slime.slimeOffsetY;
//         slime.animationWalkLeft.offsetY = 0;
//         slime.animationWalkLeft.offsetX = 0;
//         slime.animationWalkLeft.startX = 5;
//         slime.animationWalkLeft.frameHeight = 80;
//         slime.animationWalkLeft.frameWidth = 73;
//     }
//     slime.animationWalkLeft.drawFrame(slime.game.clockTick, slime.ctx, slime.x, slime.y);
// }

// slime.prototype.update = function () {
//     // console.log(this.centerX + " " + this.centerY)
//     if(this.game.running) {
//         // var xy = getXY(this.centerX, this.centerY);
//         // if (((this.centerX +  100) % 100 > 48 && (this.centerX + 100) % 100 < 52
//         //     && this.centerY % 100 > 48 && this.centerY % 100 < 52)) {
//         //     this.moveDirection = getShortestPath(this.centerX, this.centerY);
//         //     enemyUpdateLookHelper(this);
//         // }

//         slimeUpdate(this);

//         // xy = getXY(this.centerX, this.centerY);
//         // if (xy.x == GAMEBOARD.length - 1 && GAMEBOARD[xy.x][xy.y].end) {
//         //     this.hp = 0; //dead
//         // } 
        
//         // // else i
//         // for (var i = 0; i < this.game.entities.length; i++) {
//         //     var ent = this.game.entities[i];
//         //     if (ent !== this && ent.isBoba && collide(ent, this)) {
//         //         ent.removeFromWorld = true;
//         //         this.hp--;
//         //     }
//         // }
//     }
// }

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

function slime(game, spawnX, spawnY, scale, num) {
    this.lifeDeduction = 2;
    this.slimeOffsetY = 0;//green
    this.slimeDisappearOffsetY = 0;
    if (num == 1) {//blue
        this.slimeOffsetY = 425;
    } else if (num == 2) {//yellow
        this.slimeOffsetY = 724;
    } else if (num == 3) {//bluevioletish
        this.slimeOffsetY = 1023;
    } else if (num == 4) {//orange
        this.slimeOffsetY = 1322;
    } else if (num == 5) {//light red
        this.slimeOffsetY = 1621;
    } else if (num == 6) { // cola
        this.slimeOffsetY = 1920;
        this.slimeDisappearOffsetY = 118;
    } else if (num == 7) {//silver
        this.slimeOffsetY = 2334;
    } else if (num == 8) {//gold
        this.slimeOffsetY = 2633;
    } else if (num == 9) {//drunk
        this.slimeOffsetY = 2932;
    } else if (num == 10) {//chistmas 2 color, green, pink
        this.slimeOffsetY = 3236;
    } 
    this.name = "slime";
    this.speed = 100;
    this.hp = 10;//
    this.money = 10;
    this.animationWalkLeft = new Animation(AM.getAsset("./img/slime.png")
    , 5, 70 + this.slimeOffsetY, 79, 80, 7, .135, 7, true, scale, false);
    this.animationDisappearLeft = new Animation(AM.getAsset("./img/slime.png")
    , 7, 225 + this.slimeOffsetY, 69, 70, 5, .2, 5, false, scale, false);
    // this.animationWalkRight = new Animation(AM.getAsset("./img/slimeFlip.png")
    // , 296, 70 + this.slimeOffsetY, 79, 80, 7, 1, 7, true, scale, true);//.135
    this.animationWalkRight = new Animation(AM.getAsset("./img/slimeFlip.png")
    , 769, 70 + this.slimeOffsetY + this.slimeDisappearOffsetY, -79, 80, 7, .135, 7, true, scale, false);
    this.animationDisappearRight = new Animation(AM.getAsset("./img/slimeFlip.png")
    , 422, 225 + this.slimeOffsetY + this.slimeDisappearOffsetY, 69, 70, 5, 0.2, 5, false, scale, true);
    enemyConstructor(this, scale, spawnX, spawnY, this.animationWalkLeft.frameWidth, this.animationWalkLeft.frameHeight, game);
}

slime.prototype.setBoundingBox = function() {
    if(this.lookDirectionRight || this.moveDirection == 1 ) {
        this.boundingbox = new BoundingBox(this.x + 18 * this.scale, this.y + 30 * this.scale
            , this.width - 23 * this.scale , this.height -35 * this.scale);
    } else {
        this.boundingbox = new BoundingBox(this.x + 10 * this.scale, this.y + 10 * this.scale
            , this.width - 25 * this.scale , this.height -30 * this.scale);
    }
}

slime.prototype.draw = function () {
    if(this.game.running) {
        if (this.hp <= 0) {
            if (this.lookDirectionRight) {
                if (this.animationDisappearRight.currentFrame() == 3) {
                    // this.animationDisappearRight.offsetX = 10;
                    this.animationDisappearRight.startX = 432;
                    this.animationDisappearRight.frameWidth = 67;
                } else if (this.animationDisappearRight.currentFrame() == 4) {
                    this.animationDisappearRight.offsetX = -20;
                    this.animationDisappearRight.startX = 422;
                    this.animationDisappearRight.frameWidth = 80;
                } else {
                    this.animationDisappearRight.offsetX = 0;
                    this.animationDisappearRight.startX = 422;
                    this.animationDisappearRight.frameWidth = 69;
                }
                this.animationDisappearRight.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
                if (this.animationDisappearRight.isDone()) {
                    this.removeFromWorld = true;
                }
            } else {
                if (this.animationDisappearLeft.currentFrame() == 3) {
                    this.animationDisappearLeft.offsetX = 6;
                    this.animationDisappearLeft.startX = 7;
                    this.animationDisappearLeft.frameWidth = 67;
                } else if (this.animationDisappearLeft.currentFrame() == 4) {
                    this.animationDisappearLeft.offsetX = 35;
                    this.animationDisappearLeft.startX = 5;
                    this.animationDisappearLeft.frameWidth = 69;
                } else {
                    this.animationDisappearLeft.offsetX = 0;
                    this.animationDisappearLeft.startX = 7;
                    this.animationDisappearLeft.frameWidth = 69;
                }
                this.animationDisappearLeft.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
                if (this.animationDisappearLeft.isDone()) {
                    this.removeFromWorld = true;
                }
            }
        } else {
            if (this.moveDirection == 1) {
               rightAnim(this);
            } else if (this.moveDirection == 2) {
                if (this.lookDirectionRight) {
                    rightAnim(this);
                } else {
                    leftAnim(this);
                }
            } else if (this.moveDirection == 3) {
                leftAnim(this);
            } else {
                if (this.lookDirectionRight) {
                    rightAnim(this);
                } else {
                    leftAnim(this);
                }
            }
        }
        drawBoundingBox(this);
        // if (this.boxes) {
        //     if (this.moveDirection == 1 || this.lookDirectionRight) {
        //         this.ctx.strokeStyle = "red";
        //         this.ctx.strokeRect(this.x, this.y, this.width, this.height);
        //         this.ctx.strokeStyle = "green";
        //         this.ctx.strokeRect(this.boundingbox.x, this.boundingbox.y, this.boundingbox.width, this.boundingbox.height);
        //     } else {
        //         this.ctx.strokeStyle = "red";
        //         this.ctx.strokeRect(this.x, this.y, this.width, this.height);
        //         this.ctx.strokeStyle = "green";
        //         this.ctx.strokeRect(this.boundingbox.x, this.boundingbox.y, this.boundingbox.width, this.boundingbox.height);
        //     }
        // }
    }
}

var rightAnim = function(slime) {
    // if (slime.animationWalkRight.currentFrame() == 4) {
    //     slime.animationWalkRight.startY = 59 + slime.slimeOffsetY;
    //     slime.animationWalkRight.offsetY = -11;
    //     slime.animationWalkRight.frameHeight = 85;
    // } else if (slime.animationWalkRight.currentFrame() == 1) {
    //     slime.animationWalkRight.startY = 70 + slime.slimeOffsetY;
    //     slime.animationWalkRight.offsetY = 0;
    //     slime.animationWalkRight.frameHeight = 80;
    //     slime.animationWalkRight.offsetX = 1;
    //     slime.animationWalkRight.startX = 252;
    // } else if (slime.animationWalkRight.currentFrame() == 2) {
    //     slime.animationWalkRight.startY = 70 + slime.slimeOffsetY;
    //     slime.animationWalkRight.offsetY = 0;
    //     slime.animationWalkRight.frameHeight = 80;
    //     slime.animationWalkRight.offsetX = -1;
    //     slime.animationWalkRight.startX = 252.8;
    //     slime.animationWalkRight.frameWidth = 73;
    // } else {
    //     slime.animationWalkRight.startY = 70 + slime.slimeOffsetY;
    //     slime.animationWalkRight.offsetY = 0;
    //     slime.animationWalkRight.frameHeight = 80;
    //     slime.animationWalkRight.offsetX = 0;
    //     slime.animationWalkRight.startX = 24;
    //     slime.animationWalkRight.frameWidth = 75;
    // }

    // if (slime.animationWalkRight.currentFrame() == 4) {
    //     slime.animationWalkRight.startY = 58 + slime.slimeOffsetY;
    //     slime.animationWalkRight.offsetY = -12;
    //     // slime.animationWalkRight.offsetX = ;
    //     slime.animationWalkRight.startX = 263;
    //     slime.animationWalkRight.frameWidth = 72;
    // } else if (slime.animationWalkRight.currentFrame() >= 2 && slime.animationWalkRight.currentFrame() <= 3) {
    //     slime.animationWalkRight.offsetX = 20;
    //     slime.animationWalkRight.startX = 266;
    //     slime.animationWalkRight.frameHeight = 87;
    //     slime.animationWalkRight.frameWidth = 71;
    // } else if (slime.animationWalkRight.currentFrame() == 6) {
    //     slime.animationWalkRight.offsetX = 28;
    //     slime.animationWalkRight.startX = 260;
    //     slime.animationWalkRight.frameHeight = 89;
    //     slime.animationWalkRight.frameWidth = 72;
    //     slime.animationWalkRight.startY = 70 + slime.slimeOffsetY;
    //     slime.animationWalkRight.offsetY = 0;
    // } else if (slime.animationWalkRight.currentFrame() == 5) {
    //     slime.animationWalkRight.offsetX = 28;
    //     slime.animationWalkRight.startX = 265;
    //     slime.animationWalkRight.frameHeight = 87;
    //     slime.animationWalkRight.frameWidth = 71;
    //     slime.animationWalkRight.startY = 70 + slime.slimeOffsetY;
    //     slime.animationWalkRight.offsetY = 0;   
    // } else {
    //     slime.animationWalkRight.startY = 70 + slime.slimeOffsetY;
    //     slime.animationWalkRight.offsetY = 0;
    //     slime.animationWalkRight.offsetX = 0;
    //     slime.animationWalkRight.startX = 216;
    //     slime.animationWalkRight.frameHeight = 80;
    //     slime.animationWalkRight.frameWidth = 79;
    // }

    if (slime.animationWalkRight.currentFrame() == 4) {
        slime.animationWalkRight.startY = 58 + slime.slimeOffsetY;
        slime.animationWalkRight.offsetY = -12;
        slime.animationWalkRight.frameWidth = -72;
    } else if (slime.animationWalkRight.currentFrame() >= 2 && slime.animationWalkRight.currentFrame() <= 3) {
        slime.animationWalkRight.offsetX = 4+1;
        slime.animationWalkRight.startX = 774-9-1;
        slime.animationWalkRight.frameHeight = 87;
        slime.animationWalkRight.frameWidth = -71;
    } else if (slime.animationWalkRight.currentFrame() == 6) {
        slime.animationWalkRight.offsetX = 5;
        slime.animationWalkRight.startX = 774-10;
        slime.animationWalkRight.frameHeight = 89;
        slime.animationWalkRight.frameWidth = -72;
        slime.animationWalkRight.startY = 70 + slime.slimeOffsetY;
        slime.animationWalkRight.offsetY = 0;
    } else if (slime.animationWalkRight.currentFrame() == 5) {
        slime.animationWalkRight.offsetX = 5;
        slime.animationWalkRight.startX = 774-11;
        slime.animationWalkRight.frameHeight = 87;
        slime.animationWalkRight.frameWidth = -71;
        slime.animationWalkRight.startY = 70 + slime.slimeOffsetY;
        slime.animationWalkRight.offsetY = 0;
    } else {
        slime.animationWalkRight.startY = 70 + slime.slimeOffsetY;
        slime.animationWalkRight.offsetY = 0;
        slime.animationWalkRight.offsetX = 0;
        slime.animationWalkRight.startX = 774-5;
        slime.animationWalkRight.frameHeight = 80;
        slime.animationWalkRight.frameWidth = -78;
    }
    slime.animationWalkRight.drawFrame(slime.game.clockTick, slime.ctx, slime.x, slime.y);
}

var leftAnim = function(slime) {
    if (slime.animationWalkLeft.currentFrame() == 4) {
        slime.animationWalkLeft.startY = 58 + slime.slimeOffsetY;
        slime.animationWalkLeft.offsetY = -12;
        slime.animationWalkLeft.frameWidth = 72;
    } else if (slime.animationWalkLeft.currentFrame() >= 2 && slime.animationWalkLeft.currentFrame() <= 3) {
        slime.animationWalkLeft.offsetX = -4;
        slime.animationWalkLeft.startX = 9;
        slime.animationWalkLeft.frameHeight = 87;
        slime.animationWalkLeft.frameWidth = 71;
    } else if (slime.animationWalkLeft.currentFrame() == 6) {
        slime.animationWalkLeft.offsetX = -5;
        slime.animationWalkLeft.startX = 10;
        slime.animationWalkLeft.frameHeight = 89;
        slime.animationWalkLeft.frameWidth = 72;
        slime.animationWalkLeft.startY = 70 + slime.slimeOffsetY;
        slime.animationWalkLeft.offsetY = 0;
    } else if (slime.animationWalkLeft.currentFrame() == 5) {
        slime.animationWalkLeft.offsetX = -5;
        slime.animationWalkLeft.startX = 11;
        slime.animationWalkLeft.frameHeight = 87;
        slime.animationWalkLeft.frameWidth = 71;
        slime.animationWalkLeft.startY = 70 + slime.slimeOffsetY;
        slime.animationWalkLeft.offsetY = 0;
    } else {
        slime.animationWalkLeft.startY = 70 + slime.slimeOffsetY;
        slime.animationWalkLeft.offsetY = 0;
        slime.animationWalkLeft.offsetX = 0;
        slime.animationWalkLeft.startX = 5;
        slime.animationWalkLeft.frameHeight = 80;
        slime.animationWalkLeft.frameWidth = 79;
    }
    slime.animationWalkLeft.drawFrame(slime.game.clockTick, slime.ctx, slime.x, slime.y);
}

slime.prototype.update = function () {
    // console.log(this.centerX + " " + this.centerY)
    if(this.game.running) {
        var xy = getXY(this.centerX, this.centerY);
        if (((this.centerX +  100) % 100 > 48 && (this.centerX + 100) % 100 < 52
            && this.centerY % 100 > 48 && this.centerY % 100 < 52)) {
            this.moveDirection = getShortestPath(this.centerX, this.centerY);
            enemyUpdateLookHelper(this);
        }
        
        slimeUpdate(this);

        this.setBoundingBox();
        
        enemyEscape(this);
        
        // else i
        // for (var i = 0; i < this.game.entities.length; i++) {
        //     var ent = this.game.entities[i];
        //     if (ent !== this && ent.isBoba && this.boundingbox.collide(ent.boundingbox)) {
        //         ent.removeFromWorld = true;
        //         this.hp--;
        //     }
        // }
        collideUpdate(this);

        moneyUpdate(this);

        enemyStatusEffectUpdate(this);
    }
}

var slimeUpdate = function (enemy) {
    // console.log(enemy.centerX + " " + enemy.centerY)
    if (enemy.hp > 0) {
        if (enemy.moveDirection == 1) {
            if (enemy.animationWalkRight.currentFrame() >= 1 && enemy.animationWalkRight.currentFrame() <= 5) {
                enemy.x += enemy.game.clockTick * enemy.speed;
                enemy.centerX += enemy.game.clockTick * enemy.speed;
                enemy.boundingbox.x += enemy.game.clockTick * enemy.speed;
            }
        } else if (enemy.moveDirection == 2) {
            if (enemy.lookDirectionRight) {
                if (enemy.animationWalkRight.currentFrame() >= 1 && enemy.animationWalkRight.currentFrame() <= 5) {
                    enemy.y += enemy.game.clockTick * enemy.speed;
                    enemy.centerY += enemy.game.clockTick * enemy.speed;
                    enemy.boundingbox.y += enemy.game.clockTick * enemy.speed;
                }
            } else {
                if (enemy.animationWalkLeft.currentFrame() >= 1 && enemy.animationWalkLeft.currentFrame() <= 5) {
                    enemy.y += enemy.game.clockTick * enemy.speed;
                    enemy.centerY += enemy.game.clockTick * enemy.speed;
                    enemy.boundingbox.y += enemy.game.clockTick * enemy.speed;
                }
            }
        } else if (enemy.moveDirection == 3) {
            if (enemy.animationWalkLeft.currentFrame() >= 1 && enemy.animationWalkLeft.currentFrame() <= 5) {
                enemy.x -= enemy.game.clockTick * enemy.speed;
                enemy.centerX -= enemy.game.clockTick * enemy.speed;
                enemy.boundingbox.x -= enemy.game.clockTick * enemy.speed;
            }
        } else {
            if (enemy.lookDirectionRight) {
                if (enemy.animationWalkRight.currentFrame() >= 1 && enemy.animationWalkRight.currentFrame() <= 5) {
                    enemy.y -= enemy.game.clockTick * enemy.speed;
                    enemy.centerY -= enemy.game.clockTick * enemy.speed;
                    enemy.boundingbox.y -= enemy.game.clockTick * enemy.speed;
                }                    
            } else {
                if (enemy.animationWalkLeft.currentFrame() >= 1 && enemy.animationWalkLeft.currentFrame() <= 5) {
                    enemy.y -= enemy.game.clockTick * enemy.speed;
                    enemy.centerY -= enemy.game.clockTick * enemy.speed;
                    enemy.boundingbox.y -= enemy.game.clockTick * enemy.speed;
                }
            }
        }
    }
}