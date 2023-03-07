"use strict";
window.addEventListener("load", ready);

let points = 0;
let lives = 0;

function ready(){
    console.log("ready");
    document.querySelector("#btn_start").addEventListener("click", start);
    document.querySelector("#btn_go_to_start").addEventListener("click", showStartScreen);
    document.querySelector("#btn_restart").addEventListener("click", start);
}

function showStartScreen(){
    document.querySelector("#start").classList.remove("hidden");
    document.querySelector("#game_over").classList.add("hidden");
    document.querySelector("#level_complete").classList.add("hidden");
}

function start() {
  console.log("Hejsa");


  resetPoints();


  resetLives();

  showGameScreen();

  document.querySelector("#start").classList.add("hidden");

  document.querySelector("#sound_start").play();



  
  startAnimationer();

  startTimer();

  click();

  startPositioner();
}

function startTimer() {
    document.querySelector("#time_sprite").classList.remove("shrink");
    document.querySelector("#time_sprite").offsetWidth;
    document.querySelector("#time_sprite").classList.add("shrink");


    document.querySelector("#time_sprite").addEventListener("animationend", timeIsUp);

}


function timeIsUp(){
    console.log("tid udløbet");

    if(points >= 10){
        levelComplete();
    } else{
        gameOver();
    }
}

function showGameScreen() {
    document.querySelector("#start").classList.add("hidden");
    document.querySelector("#game_over").classList.add("hidden");
    document.querySelector("#level_complete").classList.add("hidden");
}

function resetPoints() {
    points = 0;

    displayPoints();
}

function resetLives() {
    lives = 3;

    document.querySelector("#heart1").classList.remove("broken_heart");
    document.querySelector("#heart2").classList.remove("broken_heart");
    document.querySelector("#heart3").classList.remove("broken_heart");
    document.querySelector("#heart1").classList.add("active_heart");
    document.querySelector("#heart2").classList.add("active_heart");
    document.querySelector("#heart3").classList.add("active_heart");
}

function startPositioner() {
    document.querySelector("#barn1_container").classList.add("position1");
    document.querySelector("#barn2_container").classList.add("position2");
    document.querySelector("#terrorist1_container").classList.add("position3");
    document.querySelector("#terrorist2_container").classList.add("position4");
    document.querySelector("#bombe_container").classList.add("position5");
}

function startAnimationer() {
    document.querySelector("#barn1_container").classList.add("falling");
    document.querySelector("#barn2_container").classList.add("falling");
    document.querySelector("#terrorist1_container").classList.add("falling");
    document.querySelector("#terrorist2_container").classList.add("falling");
    document.querySelector("#bombe_container").classList.add("falling");
}

function click() {
    document
        .querySelector("#barn1_container")
        .addEventListener("click", clickBarn);
    document
        .querySelector("#barn2_container")
        .addEventListener("click", clickBarn);
    document
        .querySelector("#terrorist1_container")
        .addEventListener("click", clickTerrorist);
    document
        .querySelector("#terrorist2_container")
        .addEventListener("click", clickTerrorist);
    document
        .querySelector("#bombe_container")
        .addEventListener("click", clickBombe);
}

function clickBarn() {
  console.log("Click barn");
  console.log(this);

  let barn = this;
  
  barn.removeEventListener("click", clickBarn);

  
  barn.classList.add("paused");

  
  barn.querySelector("img").classList.add("zoom_out");


  barn.addEventListener("animationend", barnGone);

  document.querySelector("#sound_barn").currentTime = 0;
  document.querySelector("#sound_barn").play();

  decrementLives();

}


function barnGone() {
console.log("barn væk");

let barn = this;

  barn.removeEventListener("animationend", barnGone);

  barn.querySelector("img").classList.remove("zoom_out");

  barn.classList.remove("paused");

  barn.classList.remove("falling");
  barn.offsetWidth;
  barn.classList.add("falling");

  barn.classList.remove(
    "position1",
    "position2",
    "position3",
    "position4",
    "position5"
  );

  let pos = Math.floor(Math.random() * 6) + 1;
  barn.classList.add("position" + pos);

  barn.addEventListener("click", clickBarn);
}

function clickBombe() {
  console.log("Click bomb");

  let bombe = this;

  bombe.removeEventListener("click", clickBombe);

  bombe.classList.add("paused");

  bombe.querySelector("img").classList.add("zoom_in");

  bombe.addEventListener("animationend", bombeGone);

  document.querySelector("#sound_bombe").currentTime = 0;
  document.querySelector("#sound_bombe").play();

  incrementPoints();

}

function bombeGone() {
    console.log("bombe væk");

    let bombe = this;

  bombe.removeEventListener("animationend", bombeGone);

  bombe.querySelector("img").classList.remove("zoom_in");

  bombe.classList.remove("paused");

  bombe.classList.remove("falling");
  bombe.offsetWidth;
  bombe.classList.add("falling");

  bombe.addEventListener("click", clickBombe);
}

function clickTerrorist() {
  console.log("tt");
  console.log(this);

  let terrorist = this;

  terrorist.removeEventListener("click", clickTerrorist);
  terrorist.classList.add("paused");
  terrorist.querySelector("img").classList.add("zoom_out");
  terrorist.addEventListener("animationend", terroristGone);

  document.querySelector("#sound_terrorist").currentTime = 0;
  document.querySelector("#sound_terrorist").play();

  incrementPoints();
}

function terroristGone() {
  console.log("tttt");

  let terrorist = this;

  terrorist.removeEventListener("animationend", terroristGone);

  terrorist.querySelector("img").classList.remove("zoom_out");

  terrorist.classList.remove("paused");

  terrorist.classList.remove("falling");
  terrorist.offsetWidth;
  terrorist.classList.add("falling");

  terrorist.classList.remove(
    "position1",
    "position2",
    "position3",
    "position4",
    "position5"
  );

  let pos = Math.floor(Math.random() * 6) + 1;
  terrorist.classList.add("position" + pos);

  terrorist.addEventListener("click", clickTerrorist);
}

function incrementPoints() {
  console.log("Plus point");
  points = points + 1;
  console.log("har nu " + points + " point");
  displayPoints();
  if (points >= 10) {
    levelComplete();
  }
}

function displayPoints() {
  console.log("vis point");
  document.querySelector("#point_count").textContent = points;
}

function decrementLives() {
  console.log("mist et liv");
  showDecrementedLives();
  lives--;
  if (lives <= 0) {
    gameOver();
  }
}

function incrementLives() {
  console.log("få et liv");
  lives++;
  showIncrementedLives();
  if ((lives = 3)) {
  }
}

function showDecrementedLives() {
  document.querySelector("#heart" + lives).classList.remove("active_heart");
  document.querySelector("#heart" + lives).classList.add("broken_heart");
}

function showIncrementedLives() {
  document.querySelector("#heart" + lives).classList.remove("broken_heart");
  document.querySelector("#heart" + lives).classList.add("active_heart");
}

function gameOver() {
  console.log("GameOver");
  document.querySelector("#game_over").classList.remove("hidden");
  endGame();
}

function levelComplete() {
  console.log("LevelComplete");
  document.querySelector("#level_complete").classList.remove("hidden");
  endGame();
}

function maxLives() {}

function endGame(){
  
  document.querySelector("#barn1_container").classList.remove("falling");
  document.querySelector("#barn2_container").classList.remove("falling");
  document.querySelector("#terrorist1_container").classList.remove("falling");
  document.querySelector("#terrorist2_container").classList.remove("falling");
  document.querySelector("#bombe_container").classList.remove("falling");

  document.querySelector("#barn1_container").removeEventListener("click", clickBarn);
  document.querySelector("#barn2_container").removeEventListener("click", clickBarn);
  document.querySelector("#terrorist1_container").removeEventListener("click", clickTerrorist);
  document.querySelector("#terrorist2_container").removeEventListener("click", clickTerrorist);
  document.querySelector("#bombe_container").removeEventListener("click", clickBombe);

  document.querySelector("#sound_start").pause();
  document.querySelector("#sound_start").currentTime = 0;
}