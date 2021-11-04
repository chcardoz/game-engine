var gameScene;
var pauseScene;
var endScene;
var dancer;
var sceneManager;
var gameIsPaused = false;
var gameIsEnded = false;
var keyboard;
const GAME_HEIGHT = 480;
const GAME_WIDTH = 600;

function onload() {
  sceneManager = new SceneManager();
  gameScene = new Scene(GAME_WIDTH, GAME_HEIGHT, "aqua");
  pauseScene = new Scene(GAME_WIDTH, GAME_HEIGHT, "pink");

  sceneManager.addScene(gameScene);
  sceneManager.addScene(pauseScene);
  dancer = new Sprite(gameScene, "default.png", 300, 300);
  gameScene.addSprite(dancer);

  sceneManager.startGame();
  sceneManager.changeScenes(pauseScene, gameScene);
}

function update() {
  checkForGamePaused();
  handleDancerInput();
}

/**
 * Handles all of the keyboards events for the dancer sprite. Motion and sprite image change are handled by this function
 */
function handleDancerInput() {
  dancer.setImage("default.png");
  if (keysPressed[KEYS.A]) {
    dancer.setDirection(270);
    dancer.setSpeed(10);
  }
  if (keysPressed[KEYS.D]) {
    dancer.setImage("run_right.png");
    dancer.setDirection(90);
    dancer.setSpeed(10);
  }
  if (keysPressed[KEYS.W]) {
    dancer.setImage("jump.png");
    dancer.setDirection(0);
    dancer.setSpeed(20);
  }
}

/**
 * If the key E is pressed, changes the scene from game to pause menu based on variable gameIsPaused.
 */
function checkForGamePaused() {
  if (keysPressed[KEYS.E]) {
    gameIsPaused = !gameIsPaused;
  }
  if (gameIsPaused) {
    sceneManager.changeScenes(gameScene, pauseScene);
  } else {
    sceneManager.changeScenes(pauseScene, gameScene);
    gameScene.updateSprites();
  }
}
