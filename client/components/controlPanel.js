import './bomb.js';
import { players, mainPlayerIndex, setMainPlayerIndex, setWord, currentAnswer, compareAnswer, setcurrentAnswer } from "./gameState.js";
import { renderPlayers } from "./player.js";
import * as wanakana from 'wanakana';

// Simple control panel with input and button
const controlPanel = document.querySelector('#controlPanel');
const panel = document.createElement('div');
panel.style.position = 'fixed';
panel.style.top = '50%';
panel.style.left = '40px';
panel.style.transform = 'translateY(-50%)';
panel.style.background = 'rgba(30,30,30,0.95)';
panel.style.padding = '20px 30px';
panel.style.borderRadius = '16px';
panel.style.boxShadow = '0 2px 16px rgba(0,0,0,0.2)';
panel.style.display = 'flex';
panel.style.flexDirection = 'column';
panel.style.gap = '10px';
panel.style.zIndex = '1000';

const input = document.createElement('input');
input.type = 'text';
input.placeholder = 'Your answer...';
input.style.padding = '8px 12px';
input.style.fontSize = '1rem';
input.style.borderRadius = '6px';
input.style.border = '1px solid #888';
input.style.outline = 'none';
input.style.background = '#222';
input.style.color = '#fff';

const button = document.createElement('button');
button.textContent = 'Submit & Next Turn';
button.style.padding = '8px 18px';
button.style.fontSize = '1rem';
button.style.borderRadius = '6px';
button.style.border = 'none';
button.style.background = '#4a90e2';
button.style.color = '#fff';
button.style.cursor = 'pointer';

panel.appendChild(input);
panel.appendChild(button);
controlPanel.appendChild(panel);

button.addEventListener('click', () => {
    let answer = input.value.trim();
    if(!wanakana.isJapanese(answer)) {
        answer = wanakana.toHiragana(answer);
    }
    setcurrentAnswer(answer);
    if (compareAnswer()) {
        setWord();
  let newIndex = mainPlayerIndex;
  let found = false;
  for (let i = 1; i <= players.length; i++) {
    const idx = (mainPlayerIndex + i) % players.length;
    if (players[idx].lives > 0) {
      newIndex = idx;
      found = true;
      break;
    }
  }
  if (found) {
    setMainPlayerIndex(newIndex);
    renderPlayers(players, newIndex, true);
  }
  input.value = '';
    }
});

input.addEventListener('input', () => {
  const answer = input.value;
  let response = document.querySelector('#response');
  response.textContent = answer;
});

input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    button.click();
  }
});