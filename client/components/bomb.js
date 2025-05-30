import "../style.css";
import { players, mainPlayerIndex, loseLife, setWord } from "./gameState.js";

import bomb1 from '../media/bomb/bomb1.webm';
import bomb1after from '../media/bomb/bomb1after.mp4';
import bomb2 from '../media/bomb/bomb2.mp4';
import bomb2after from '../media/bomb/bomb2after.mp4';
import bomb3 from '../media/bomb/bomb3.mp4';
import bomb4 from '../media/bomb/bomb4.mp4';
import bombend from '../media/bomb/end.webm';
import bombstart from '../media/bomb/start.webm';

document.querySelector('#bomb').innerHTML = `
  <div style="display: flex; flex-direction: column; align-items: center;">
    <div style="position: relative; display: flex; justify-content: center; align-items: center;">
      <video autoplay muted playsinline id="bombVideo">
        <source src="${bombstart}" type="video/webm">
        Your browser does not support HTML5 video.
      </video>
      <video muted playsinline loop id="bombVideo2" style="display: none;">
        <source src="${bomb1}" type="video/webm">
      </video>
      <video muted playsinline id="bombVideo3" style="display: none;">
        <source src="${bombend}" type="video/webm">
      </video>
      <div id="question"></div>
    </div>
    <div id="response"></div>
  </div>
`;

const video1 = document.getElementById('bombVideo');   // bombstart
const video2 = document.getElementById('bombVideo2');  // bomb1 (loop)
const video3 = document.getElementById('bombVideo3');  // bombend (explosion)

video2.load();
video3.load();

// set timer state
let timerStarted = false;
let bombTimeout = null;


// set time limit for the bomb
let limitTime = 10 // seconds;

setWord(); // Initialize the word and answers

function startBombSequence() {
  // Reset UI
  video1.style.display = 'block';
  video1.currentTime = 0;
  video2.style.display = 'none';
  video2.currentTime = 0;
  video3.style.display = 'none';
  video3.currentTime = 0;
  question.style.display = 'block';
  response.style.display = 'block';
  timerStarted = false;

  // Play the start video (not looped)
  video1.play();
}

// When the start video ends, switch to the looping video
video1.addEventListener('ended', () => {
  video1.style.display = 'none';
  video2.style.display = 'block';
  video2.currentTime = 0;
  video2.play();

  // Start the timer here, not in video2's play event
  timerStarted = true;
  bombTimeout = setTimeout(() => {
    // Timer ends: show explosion
    video2.style.display = 'none';
    video2.pause();
    video3.style.display = 'block';
    video3.currentTime = 0;
    video3.play();
    question.style.display = 'none';
    response.style.display = 'none';
    loseLife();
  }, limitTime * 1000);
});

// When the explosion ends, reset for next round
video3.addEventListener('ended', () => {
  video3.style.display = 'none';
  timerStarted = false;
  clearTimeout(bombTimeout);
  setTimeout(startBombSequence, 1000);
});

// Initial start
startBombSequence();