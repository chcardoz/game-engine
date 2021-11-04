# CSCI 437 GAME ENGINE

This game engine is based on the simpleGame engine by Professor Harris and also the Unity Game Engine.

## How to run this program

Clone the reposity the and open the index.html document in a browser that supports HTML5 Canvas.

## How to play this game

## Keyboard mapping

W - Jump
A - Move left
D - Move right
E - Pause Menu

## Game Engine Classes

### Scene Manager class

The Scene Manager class is reponsible for

- Starting and stopping the main game thread
- Intiliazing any input devices like the keyboard
- Changing scenes based on input
- Keeping track of all the scenes in the game

### Scene class

The Scene class is responsible for

- Creating and clearing the scene canvas element after every frame
- Keeping a track of all the sprites that are in the scene.
- Updating each sprite after every frame
- Showing and hiding itself on the webpage

### Sprite class

The Sprite class is responsible for

- Initiliazing the sprite position, velocity and direction
- Drawing itself on the canvas of the scene it is related to.
- Helpers functions for setting speed and direction
- Checking any boundary conditions for the scene canvas

## Dependency list

No dependencies, this program runs on the browser
