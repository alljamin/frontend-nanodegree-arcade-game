// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.width = 52;
    this.height = 50;
    this.speed = Math.floor(Math.random() * 200);
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

//collision between the bug and player
Enemy.prototype.collision = function() {
  if(player.x < this.x + this.width &&
    player.x + player.width > this.x &&
    player.y < this.y + this.height &&
    player.height + player.y > this.y){
      player.x = 305;
      player.y = 400;
  }
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if (this.x > 700) {
        this.x = -150;
    }
    this.collision();
};

Enemy.prototype.reset = function(){
    this.speed = Math.floor(Math.random()*200);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(){
    this.x = 305;
    this.y = 400;
    this.width = 52;
    this.height = 50;
    this.sprite='images/char-boy.png';
};

//control the player movement
Player.prototype.handleInput = function(key){
    switch (key){
        case "left":
            this.x = this.x - 30;
        break;
            
        case "right":
            this.x = this.x + 30;
        break;
        
        case "up":
            this.y = this.y - 30;
        break;

        case "down":
            this.y = this.y + 30;
        break;
    };
};

//player cannot move out of the canvas
Player.prototype.update = function(dt){
    if(this.x < 0){
        this.x = 0;
    } else if (this.x > 400){
        this.x = 400;
    } else if (this.y < 0){
        this.y = 0;
    } else if (this.y > 400){
        this.y = 400;
    }
};

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.reset = function(){
    this.x = 305;
    this.y = 400;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
allEnemies.push(new Enemy(10, 50));
allEnemies.push(new Enemy(20, 150));
allEnemies.push(new Enemy(50, 230));

var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
