import "./styles/menu.css"

// Import the SDK
import { DiscordSDK } from "@discord/embedded-app-sdk";
import { renderPlayers } from "./components/player.js";
import { setPlayers, setMainPlayerIndex } from "./components/gameState.js";

let auth;

const discordSdk = new DiscordSDK(import.meta.env.VITE_DISCORD_CLIENT_ID);

setupDiscordSdk().then(() => {
  console.log("Discord SDK is authenticated");

  // We can now make API calls within the scopes we requested in setupDiscordSDK()
  // Note: the access_token returned is a sensitive secret and should be treated as such

  
});

async function setupDiscordSdk() {
  await discordSdk.ready();
  console.log("Discord SDK is ready");

  // Authorize with Discord Client
  const { code } = await discordSdk.commands.authorize({
    client_id: import.meta.env.VITE_DISCORD_CLIENT_ID,
    response_type: "code",
    state: "",
    scope: [
      "identify",
      "guilds",
      "applications.commands"
    ],
  });

  // Retrieve an access_token from your activity's server
  // Note: We need to prefix our backend `/api/token` route with `/.proxy` to stay compliant with the CSP.
  // Read more about constructing a full URL and using external resources at
  // https://discord.com/developers/docs/activities/development-guides/networking#construct-a-full-url
  const response = await fetch("/.proxy/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      code,
    }),
  });
  const { access_token } = await response.json();

  const {user} = await discordSdk.commands.authenticate({
  access_token: access_token,
});

let avatarSrc = '';
if (user.avatar) {
  avatarSrc = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=256`;
} else {
  const defaultAvatarIndex = (BigInt(user.id) >> 22n) % 6n;
  avatarSrc = `https://cdn.discordapp.com/embed/avatars/${defaultAvatarIndex}.png`
}

const username = user.global_name ?? `${user.username}#${user.discriminator}`;
  const players = [
  { avatarSrc: avatarSrc, username: username, lives: 3 },
  { avatarSrc: "https://cdn.discordapp.com/embed/avatars/0.png", username: "Player 2", lives: 3 },
  { avatarSrc: "https://cdn.discordapp.com/embed/avatars/1.png", username: "Player 3", lives: 3 },
];

setPlayers(players);
setMainPlayerIndex(0);
renderPlayers(players, 0, true);

  // Authenticate with Discord client (using the access_token)
  auth = await discordSdk.commands.authenticate({
    access_token,
  });
  

  if (auth == null) {
    throw new Error("Authenticate command failed");
  }

}

document.querySelector('#gameContainer').style.display = 'none';

document.querySelector('#menuContainer').innerHTML = `
<button id="startGameButton">Start Game</button>
<button id="settingsButton">Settings</button>
<button id="aboutButton">About</button>
`;
document.querySelector('#startGameButton').addEventListener('click', () => {
  document.querySelector('#menuContainer').style.display = 'none';
  document.querySelector('#gameContainer').style.display = 'block';
  startBombSequence();
});

import "./components/bomb.js";
import "./components/controlPanel.js";