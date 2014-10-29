function Game() {
  this.numOfStars = 525;
  this.starSpeed = 8;
  this.ratio = 256;
  this.stars = new Stars();
}

Game.prototype.init = function(canvas) {
  this.canvas = canvas;
  this.stars.init(canvas, this.numOfStars, this.starSpeed, this.ratio);
};

Game.prototype.render = function(time) {
  this.stars.render(time);
};

Game.prototype.draw = function(context) {
  this.stars.draw(context);
};

Game.prototype.mouse_wheel = function(e) {
  var delta;
  if (e.wheelDelta) {
    delta = e.wheelDelta / 120;
  }
  else {
    delta = -e.detail / 3;
  }

  if (delta >= 0) {
    // raise warp factor
    this.stars.increaseWarpIndex();
  }
  else {
    // decrease warp factor
    this.stars.decreaseWarpIndex();
  }
};

function Stars() {
  this.stars = [];
  this.warpIndex = 0;
  this.transitionSpeed = 2;

  this.warpFactor = {
    0: { speed: 0.5,
         opacity: 1 },

    1: { speed: 1,
         opacity: 1 },

    2: { speed: 2,
         opacity: 1 },

    3: { speed: 8,
         opacity: 0.4 },

    4: { speed: 10,
         opacity: 0.35 },

    5: { speed: 15,
         opacity: 0.3 },
         
    6: { speed: 20,
         opacity: 0.23 },

    7: { speed: 28,
         opacity: 0.2 },

    8: { speed: 32,
         opacity: 0.2 },

    9: { speed: 38,
         opacity: 0.15 },

    10: { speed: 44,
          opacity: 0.1 },

    11: { speed: 64,
          opacity: 0.05 }
  }
}

Stars.prototype = {
  init: function(canvas, n, speed, ratio) {
    this.opacity = 0.1;
    this.canvas = canvas;
    this.speed = speed;
    this.w = this.canvas.width;
    this.h = this.canvas.height;
    this.x = Math.round(this.w / 2);
    this.y = Math.round(this.h / 2);
    this.z = (this.w + this.h) / 2;
    this.ratio = ratio;
    this.color_ratio = 1 / this.z;

    for (var i = 0; i < n; i++) {
      this.stars.push(new Array(7));
      var index = this.stars.length - 1;
      this.stars[index] = new Array(5);
      this.stars[index][0] = Math.random() * this.w * 2 - this.x * 2;
      this.stars[index][1] = Math.random() * this.h * 2 - this.y * 2;
      this.stars[index][2] = Math.round(Math.random() * this.z);
      this.stars[index][3] = 0;
      this.stars[index][4] = 0;
      this.stars[index][5] = 0; // star_x_save
      this.stars[index][6] = 0; // star_y_save
    }
  },
  
  render: function(time) {
    for (var i = 0; i < this.stars.length; i++) {
      this.stars[i][5] = this.stars[i][3];
      this.stars[i][6] = this.stars[i][4];

      this.stars[i][2] -= this.speed;
      if (this.stars[i][2] > this.z) { this.stars[i][2] -= this.z; } 
      if (this.stars[i][2] < 0) { this.stars[i][2] += this.z; }

      this.stars[i][3] = this.x + (this.stars[i][0] / this.stars[i][2]) * this.ratio;
      this.stars[i][4] = this.y + (this.stars[i][1] / this.stars[i][2]) * this.ratio;
    }

    for (var i = 0; i < this.transitionSpeed; i++) {
      if (this.speed < this.warpFactor[this.warpIndex].speed - 0.1)
        this.speed += 0.1;
      else if (this.speed > this.warpFactor[this.warpIndex].speed + 0.1)
        this.speed -= 0.1;
    }

    if (this.opacity < this.warpFactor[this.warpIndex].opacity - 0.01)
      this.opacity += 0.01;
    else if (this.opacity > this.warpFactor[this.warpIndex].opacity + 0.01)
      this.opacity -= 0.01;
  },

  draw: function(context) {
    context.fillStyle = 'rgba(0, 0, 0, ' + this.opacity + ')';
    context.fillRect(0, 0, this.w, this. h);
    for (var i = 0; i < this.stars.length; i++) {
      if (this.stars[i][5] > 0 &&
          this.stars[i][5] < this.w &&
          this.stars[i][6] > 0 &&
          this.stars[i][6] < this.h) {
        context.strokeStyle = 'white';
        context.lineWidth = (1 - this.color_ratio * this.stars[i][2]) * 2;
        context.beginPath();
        context.moveTo(this.stars[i][5], this.stars[i][6]);
        context.lineTo(this.stars[i][3], this.stars[i][4]);
        context.stroke();
        context.closePath();
      }
    }
    context.font = '10px arial';
    context.fillStyle = 'red';
    switch(this.warpIndex) {
      case 0:
        context.fillText('1/4 IMPULSE', 10, 10);
        break;
      case 1:
        context.fillText('1/2 IMPULSE', 10, 10);
        break;
      case 2:
        context.fillText('FULL IMPULSE', 10, 10);
        break;
      default:
        var str = 'WARP FACTOR ' + (this.warpIndex - 2);
        context.fillText(str, 10, 10);
      break;
    }
    context.fillText('OPACITY: ' + this.opacity, 10, 20);
    context.fillText('SPEED: ' + this.speed, 10, 30);

  },

  increaseWarpIndex: function() {
    if (this.warpIndex < 11)
      this.warpIndex++;
  },

  decreaseWarpIndex: function() {
    if (this.warpIndex > 0)
      this.warpIndex--;
  },
};
