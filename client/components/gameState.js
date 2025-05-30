import { renderPlayers } from "./player.js";
import { data } from '../decks/n3.js';

export let players = [];
export let mainPlayerIndex = 0;
export let word = '';
export let answers = [];
export let currentAnswer = '';

export function setPlayers(newPlayers) {
  players = newPlayers;
}
export function setMainPlayerIndex(idx) {
  mainPlayerIndex = idx;
}
export function setcurrentAnswer(answer) {
  currentAnswer = answer;
}
export function loseLife() {
  if (players[mainPlayerIndex].lives > 0) {
    players[mainPlayerIndex].lives -= 1;
    let newIndex = mainPlayerIndex;
    let found = false;
    for (let i = 1; i <= players.length; i++) {
      const idx = (mainPlayerIndex + i) % players.length;
      if (players[idx].lives > 0) {
        newIndex = idx;
        mainPlayerIndex = newIndex;
        found = true;
        break;
      }
    }
    renderPlayers(players, mainPlayerIndex, true);
  }
}

export function setWord() {
//   fetch('http://localhost:8000/n3.json')
//     .then(response => response.json())
//     .then(data => {
      const cards = data.cards;
      const randomIndex = Math.floor(Math.random() * cards.length);
      const card = cards[randomIndex];
      word = card.question;
      answers = card.answer;
      document.querySelector('#question').textContent = `${word}`;
      // document.querySelector('#response').textContent = `Meaning: ${card.meaning}`; // Uncomment if you want to show the meaning
    // });
}

export function compareAnswer() {
  // Compare currentAnswer with answers
  if (answers.includes(currentAnswer)) {
    // Reset current answer
    currentAnswer = '';
    return true;
  } else {
    document.querySelector('#response').textContent = 'Wrong answer!';
    loseLife();
    return false;
  }
}