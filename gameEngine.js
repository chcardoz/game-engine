var keysPressed = new Array(256);
var currentKeyPressed;

function SceneManager() {
  this.sceneList = new Array();

  /**
   * Hides the current scene and shows the next scene
   * @param {Scene} currentScene The scene that is currently displayed
   * @param {Scene} newScene The scene to be displayed
   */
  this.changeScenes = function (currentScene, newScene) {
    currentScene.hide();
    newScene.show();
  };

  /**
   * Initializes keyboard array, sets keyup and keydown to custom functions, iterates through the scene list to append it to the DOM and starts the update thread.
   */
  this.startGame = function () {
    this.initializeKeyboard();
    document.onkeydown = this.updateKeys;
    document.onkeyup = this.clearKeys;
    this.sceneList.forEach((scene) => document.body.appendChild(scene.canvas));
    this.intervalID = setInterval(localUpdate, 50);
  };

  /**
   * Stops the update thread by clearing the interval
   */
  this.stopGame = function () {
    clearInterval(this.intervalID);
  };

  /**
   * Adds the scene to the scene list of the scene manager
   * @param {Scene} scene Scene to be added
   */
  this.addScene = function (scene) {
    this.sceneList.push(scene);
  };

  /**
   * Sets the key pressed value to true for the respective key based on the keyboard event
   * @param {KeyboardEvent} e
   */
  this.updateKeys = function (e) {
    currentKeyPressed = e.key.toUpperCase();
    keysPressed[KEYS[e.key.toUpperCase()]] = true;
  };

  /**
   * Sets the key pressed value to false for the respective key based on the keyboard event
   * @param {KeyboardEvent} e
   */
  this.clearKeys = function (e) {
    currentKeyPressed = null;
    keysPressed[KEYS[e.key.toUpperCase()]] = false;
  };

  /**
   * Sets all of the values in the key pressed array to false
   */
  this.initializeKeyboard = function () {
    for (i = 0; i < keysPressed.length; i++) {
      keysPressed[i] = false;
    }
  };
}

function Scene(width, height, bgColor) {
  this.canvas = document.createElement("canvas");
  this.spriteList = new Array();
  this.context = this.canvas.getContext("2d");
  /**
   * Clears the rectangle in the context of the canvas
   */
  this.clearCanvas = function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  };

  /**
   * Sets the color of the canvas background
   * @param {string} color Name of the color - hexcode or color names
   */
  this.setBackgroundColor = function (color) {
    this.canvas.style.backgroundColor = color;
  };

  /**
   * Sets the width and height of the canvas
   * @param {number} width
   * @param {number} height
   */
  this.setSize = function (width, height) {
    this.canvas.width = width;
    this.canvas.height = height;
  };

  /**
   * Shows the scene by setting the display property of the canvas to block
   */
  this.show = function () {
    this.canvas.style.display = "block";
  };

  /**
   * Hides the scene by setting the display property of the canvas to none
   */
  this.hide = function () {
    this.canvas.style.display = "none";
  };

  /**
   * Adds a sprite to the scene's sprite
   * @param {Sprite} sprite
   */
  this.addSprite = function (sprite) {
    this.spriteList.push(sprite);
  };

  /**
   * Removes a sprite from the scene's sprite list, if it exists
   * @param {Sprite} sprite
   */
  this.removeSprite = function (sprite) {
    spriteIndex = this.spriteList.indexOf(sprite);
    if (index > -1) {
      this.spriteList.splice(spriteIndex, 1);
    } else {
      console.error("Sprite is not part of the scene");
    }
  };

  /**
   * Iterates throught the scene sprite list and calls their update function
   */
  this.updateSprites = function () {
    this.clearCanvas();
    this.spriteList.forEach((sprite) => sprite.update());
  };

  this.setSize(width, height);
  this.setBackgroundColor(bgColor);
}

function Sprite(scene, imageSrc, width, height) {
  this.width = width;
  this.height = height;
  this.scene = scene;
  this.canvas = scene.canvas;
  this.context = this.canvas.getContext("2d");
  this.image = new Image(width, height);
  this.setImage = function (imageSrc) {
    this.image.src = imageSrc;
  };
  this.x = this.canvas.width / 2;
  this.y = this.canvas.height / 2;
  this.dx = 0;
  this.dy = 0;
  this.ddy = 5;

  /**
   * Sets the visible attribute of the sprite to false so that the sprite can be hidden in the next frame
   */
  this.hide = function () {
    this.visible = false;
  };

  /**
   * Sets the visible attribute of the sprite to true so that the sprite can be shown in the next frame
   */
  this.show = function () {
    this.visible = true;
  };

  /**
   * Translates the context based on updated x and y values and blits the sprite to the canvas.
   */
  this.drawOnCanvas = function () {
    this.context.save();
    this.context.translate(this.x, this.y);
    this.context.drawImage(
      this.image,
      -this.width / 2,
      -this.height / 2,
      this.width,
      this.height
    );
    this.context.restore();
  };

  /**
   * Updates the speed in the y direction because of gravity, updates the x and y values of the position based on the component of speed in that direction.
   */
  this.update = function () {
    this.dy += this.ddy;
    this.x += this.dx;
    this.y += this.dy;
    this.checkBounds();
    if (this.visible) {
      this.drawOnCanvas();
    }
  };

  /**
   * Sets the speed value to the new speed and projects the speed vector to its components
   * @param {number} speed The new speed
   */
  this.setSpeed = function (speed) {
    this.speed = speed;
    this.projectSpeedVector();
  };

  /**
   * Converts the angle in degrees to radians and projects the speed vector to its components
   * @param {number} degrees The angle in degrees
   */
  this.setDirection = function (degrees) {
    degrees -= 90;
    this.direction = (degrees * Math.PI) / 180;
    this.projectSpeedVector();
  };

  /**
   * Creates the magnitude and direction of the speed vector based on the components dx and dy
   */
  this.createSpeedVector = function () {
    this.speed = Math.sqrt(this.dx * this.dx + this.dy * this.dy);
    this.direction = Math.atan2(this.dy, this.dx);
  };

  /**
   * Helper function to set the x value of position
   * @param {number} x The new x value of position.
   */
  this.setX = function (x) {
    this.x = x;
  };

  /**
   * Helper function to set the y value of position
   * @param {number} y The new y value of position.
   */
  this.setY = function (y) {
    this.y = y;
  };

  /**
   * Helper function to set the x component of speed
   * @param {number} dx The new x component of speed.
   */
  this.setDx = function (dx) {
    this.dx = dx;
  };

  /**
   * Helper function to set the y component of speed
   * @param {number} dy The new y component of speed.
   */
  this.setDy = function (dy) {
    this.dy = dy;
  };

  /**
   * If the sprite hits the groumd, sets its speed to 0. If the sprite cross the left or right, warps it around. Lastly, if the sprite hits the top of the screen, bounces it back.
   */
  this.checkBounds = function () {
    this.ddy = 5;
    if (this.x > this.canvas.width) {
      this.x = 0;
    }
    if (this.x < 0) {
      this.x = this.canvas.width;
    }
    if (this.y > this.canvas.height - this.height / 2) {
      this.ddy = 0;
      this.setSpeed(0);
    }
    if (this.y < 0) {
      this.setDy(-1 * this.dy);
      this.createSpeedVector();
    }
  };

  /**
   * Projects the speed vector into its components and set dx dy to that.
   */
  this.projectSpeedVector = function () {
    this.dx = this.speed * Math.cos(this.direction);
    this.dy = this.speed * Math.sin(this.direction);
  };

  this.setImage(imageSrc);
  this.setSpeed(0);
  this.setDirection(0);
  this.show();
}

function localUpdate() {
  update();
}

/**
 * Keys of the keyboard and their keycodes
 */
const KEYS = {
  A: 65,
  B: 66,
  C: 67,
  D: 68,
  E: 69,
  F: 70,
  G: 71,
  H: 72,
  I: 73,
  J: 74,
  K: 75,
  L: 76,
  M: 77,
  N: 78,
  O: 79,
  P: 80,
  Q: 81,
  R: 82,
  S: 83,
  T: 84,
  U: 85,
  V: 86,
  W: 87,
};
