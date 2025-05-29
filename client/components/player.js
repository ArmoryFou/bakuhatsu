import user from '../media/user.png';
import '../styles/player.css';

export function renderPlayers(players, mainPlayerIndex = 0, animate = false) {
  let container = document.querySelector('#playerContainer');
  if (!container) return;

  // If first render, create player elements
  if (!container.hasChildNodes()) {
    container.innerHTML = '';
    container.style.position = 'absolute';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100vw';
    container.style.height = '100vh';
    container.style.overflow = 'hidden';

    for (let i = 0; i < players; i++) {
      const playerEl = document.createElement('div');
      playerEl.className = 'player';
      playerEl.innerHTML = `
        <img src="${user}" />
        <div class="player-name">name</div>
      `;
      container.appendChild(playerEl);
    }
  }

  // Animate rotation and style transitions
  const playerEls = container.querySelectorAll('.player');
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const radius = 200;

  playerEls.forEach((playerEl, i) => {
    // Calculate angle so mainPlayerIndex is always at the bottom
    const angle = (2 * Math.PI * ((i - mainPlayerIndex + players) % players)) / players + Math.PI / 2;
    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;

    // Animate position
    playerEl.style.transition = animate
      ? 'left 0.5s cubic-bezier(.4,2,.6,1), top 0.5s cubic-bezier(.4,2,.6,1), transform 0.5s, width 0.5s, height 0.5s'
      : 'none';
    playerEl.style.position = 'absolute';
    playerEl.style.left = `${x}px`;
    playerEl.style.top = `${y}px`;
    playerEl.style.transform = 'translate(-50%, -50%)';
    playerEl.style.textAlign = 'center';
    playerEl.style.fontFamily = 'sans-serif';

    // Animate main/normal styles
    if (i === mainPlayerIndex) {
      playerEl.classList.add('main-player');
      playerEl.classList.remove('normal-player');
    } else {
      playerEl.classList.remove('main-player');
      playerEl.classList.add('normal-player');
    }
  });
}

