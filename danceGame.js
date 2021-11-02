var gameScene;
var pauseScene;
var endScene;
var dancer;
var sceneManager;
var gameIsPaused = false;
var gameIsEnded = false;
var keyboard;

function onload() {
  sceneManager = new SceneManager();
  gameScene = new Scene(640, 480, "red");
  pauseScene = new Scene(1200, 1200, "blue");
  endScene = new Scene(1200, 1200, "pink");
  gameScene.start();
}

function update() {}
