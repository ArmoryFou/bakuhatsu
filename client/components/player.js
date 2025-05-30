import '../styles/player.css';

export function renderPlayers(players, mainPlayerIndex = 0, animate = false) {
  let container = document.querySelector('#playerContainer');
  if (!container) return;

  // Ensure container is styled
  container.style.position = 'absolute';
  container.style.top = '0';
  container.style.left = '0';
  container.style.width = '100vw';
  container.style.height = '100vh';
  container.style.overflow = 'hidden';

  // Adjust number of player elements
  let playerEls = Array.from(container.querySelectorAll('.player'));
  // Add missing elements
  while (playerEls.length < players.length) {
    const playerEl = document.createElement('div');
    playerEl.className = 'player';
    container.appendChild(playerEl);
    playerEls.push(playerEl);
  }
  // Remove extra elements
  while (playerEls.length > players.length) {
    container.removeChild(playerEls.pop());
  }

  // Update content and animate
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const radius = 200;

  playerEls.forEach((playerEl, i) => {
    playerEl.innerHTML = `
      <img src="${players[i].avatarSrc}" style="${players[i].lives === 0 ? 'filter: grayscale(100%); opacity: 0.5;' : ''}" />
      <div class="player-name">${players[i].username}</div>
      <div class="player-lives">${players[i].lives} lives</div>
    `;

    const angle = (2 * Math.PI * ((i - mainPlayerIndex + players.length) % players.length)) / players.length + Math.PI / 2;
    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;

    playerEl.style.transition = animate
      ? 'left 0.5s cubic-bezier(.4,2,.6,1), top 0.5s cubic-bezier(.4,2,.6,1), transform 0.5s, width 0.5s, height 0.5s'
      : 'none';
    playerEl.style.position = 'absolute';
    playerEl.style.left = `${x}px`;
    playerEl.style.top = `${y}px`;
    playerEl.style.transform = 'translate(-50%, -50%)';
    playerEl.style.textAlign = 'center';
    playerEl.style.fontFamily = 'sans-serif';

    if (i === mainPlayerIndex) {
      playerEl.classList.add('main-player');
      playerEl.classList.remove('normal-player');
    } else {
      playerEl.classList.remove('main-player');
      playerEl.classList.add('normal-player');
    }
  });
}

