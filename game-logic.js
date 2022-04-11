import { ATTACK, HIT } from "./date.js";
import { getRandomNumber, createHTMLElement } from "./utils.js";
import { arenasBlock, player1, player2 } from "./players.js";
import { generateLogs } from "./game-start.js";

const formFight = document.querySelector(".control");

const renderPlayerWin = (name) => {
  const winnerName = name ? `${name} wins` : "draw";

  const winTitle = createHTMLElement("div", "winTitle", winnerName);

  arenasBlock.appendChild(winTitle);
};

function enemyAttack() {
  const length = ATTACK.length - 1;
  const hit = ATTACK[getRandomNumber(0, length)];
  const defence = ATTACK[getRandomNumber(0, length)];

  return {
    value: getRandomNumber(0, HIT[hit]),
    hit,
    defence,
  };
}

const playerAttack = () => {
  const attack = {};

  for (let item of formFight) {
    if (item.checked && item.name === "hit") {
      attack.value = getRandomNumber(0, HIT[item.value]);
      attack.hit = item.value;
    }
    if (item.checked && item.name === "defence") {
      attack.defence = item.value;
    }
    item.checked = false;
  }

  return attack;
};

const showResult = () => {
  const reloadButton = createReloadButton();

  reloadButton.addEventListener("click", () => {
    window.location.reload();
  });

  if (player1.hp === 0 || player2.hp === 0) {
    reloadButton.style.display = "block";

    for (let item of formFight) {
      item.disabled = true;
    }
  }

  if (player1.hp === 0 && player1.hp < player2.hp) {
    renderPlayerWin(player2.name);
    generateLogs("end", player2, player1);
  } else if (player2.hp === 0 && player2.hp < player1.hp) {
    renderPlayerWin(player1.name);
    generateLogs("end", player1, player2);
  } else if (player1.hp === 0 && player2.hp === 0) {
    renderPlayerWin();
    generateLogs("draw");
  }
};

const createReloadButton = () => {
  const reloadButton = createHTMLElement("button", "button", "Reload");
  const reloadButtonWrapper = createHTMLElement("div", "reloadWrap", [
    reloadButton,
  ]);

  arenasBlock.appendChild(reloadButtonWrapper);

  return reloadButton;
};

export {
  renderPlayerWin,
  enemyAttack,
  playerAttack,
  showResult,
  createReloadButton,
  formFight,
};
