import "../style.css";

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
      <div id="question">間に合う</div>
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

// set time limit for the bomb
let limitTime = 10 // seconds;

// start third video after timer ends
video1.addEventListener('play', () => {
  if (!timerStarted) {
    timerStarted = true;

    setTimeout(() => {
      video3.style.display = 'block';
      video3.play();
      video2.style.display = 'none'; // hide looping video
      question.style.display = 'none'; // hide question
      response.style.display = 'none'; // show response
    }, limitTime * 1000);
  }
});

video3.addEventListener('ended', () => {
  video3.style.display = 'none'; // hide explosion video
});

// start second video when first video ends
video1.addEventListener('timeupdate', () => {
  const remaining = video1.duration - video1.currentTime;

  if (remaining <= 0.1 && video2.paused) {
    video2.style.display = 'block';
    video2.currentTime = 0;
    video2.loop = true;
    video2.play();
  }
// hide the first video when the timer is almost over
  if (remaining <= 0.01) {
    video1.style.display = 'none';
  }
});