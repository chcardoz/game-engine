var keysPressed = new Array(256);
var currentKeyPressed;

function SceneManager() {
  this.changeScenes = function (currentScene, newScene) {
    currentScene.hide();
    currentScene.stop();
    newScene.start();
    newScene.show();
  };
}

function Scene(width, height, bgColor) {
  this.canvas = document.createElement("canvas");
  this.spriteList = new Array();

  this.start = function () {
    document.body.appendChild(this.canvas);
    this.context = this.canvas.getContext("2d");
    this.intervalID = setInterval(localUpdate, 50);
    document.onkeydown = this.updateKeys;
    document.onkeyup = this.clearKeys;
  };

  this.stop = function () {
    clearInterval(this.intervalID);
  };

  this.clearCanvas = function () {
    this.context.clearRect(0, 0, this.width, this.height);
  };

  this.setBackgroundColor = function (color) {
    this.canvas.style.backgroundColor = color;
  };

  this.setSize = function (width, height) {
    this.canvas.style.width = width.toString() + "px";
    this.canvas.style.height = height.toString() + "px";
  };

  this.show = function () {
    this.canvas.style.display = "block";
  };

  this.hide = function () {
    this.canvas.style.display = "none";
  };

  this.addSprite = function (sprite) {
    this.spriteList.push(sprite);
  };

  this.removeSprite = function (sprite) {
    spriteIndex = this.spriteList.indexOf(sprite);
    if (index > -1) {
      this.spriteList.splice(spriteIndex, 1);
    } else {
      console.error("Sprite is not part of the scene");
    }
  };

  this.updateSprites = function () {
    this.spriteList.forEach((sprite) => sprite.update());
  };

  this.initializeKeyboard = function () {
    for (i = 0; i < keysPressed.length; i++) {
      keysPressed[i] = false;
    }
  };

  this.updateKeys = function (e) {
    currentKeyPressed = e.key.toUpperCase();
    keysPressed[e.key.toUpperCase()] = true;
  };

  this.clearKeys = function (e) {
    currentKeyPressed = null;
    keysPressed[e.key.toUpperCase()] = false;
  };

  this.setSize(width, height);
  this.setBackgroundColor(bgColor);
}

function Sprite(scene, imageSrc, width, height) {
  this.scene = scene;
  this.canvas = scene.canvas;
  this.context = this.canvas.getContext("2d");
  this.image = new Image(width, height);
  this.x = this.setImage = function (imageSrc) {
    this.image.src = imageSrc;
  };

  this.hide = function () {
    this.visible = false;
  };

  this.show = function () {
    this.visible = true;
  };

  this.drawOnCanvas = function () {
    //TODO
  };

  this.update = function () {};

  this.setSpeed = function (speed) {
    this.speed = speed;
    this.projectSpeedVector();
  };

  this.setDirection = function (degrees) {
    //TODO
  };

  this.projectSpeedVector = function () {
    this.dx = this.speed * Math.cos(this.direction);
    this.dy = this.speed * Math.sin(this.direction);
  };

  this.setImage(imageSrc);
}

function localUpdate() {
  update();
}

KEYS = {
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
};
