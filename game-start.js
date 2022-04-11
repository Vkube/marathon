import { LOGS } from "./date.js";
import { getTime, getRandomNumber } from "./utils.js";

const chatBlock = document.querySelector(".chat");

const generateLogs = (type, player1, player2, damage = 0) => {
  const text = type.includes("start", "draw")
    ? LOGS[type]
    : LOGS[type][getRandomNumber(0, LOGS[type].length - 1)];

  const formattedDate = getTime();

  let logMessage = "";

  switch (type) {
    case "start":
      logMessage = `${formattedDate} - ${text}`
        .replace("[time]", formattedDate)
        .replace("[player1]", player1.name)
        .replace("[player2]", player2.name);
      break;
    case "end":
      logMessage = text
        .replace("[playerWins]", player1.name)
        .replace("[playerLose]", player2.name);
      break;
    case "hit":
      logMessage = `${formattedDate} - ${text} -${damage} [${player2.hp}/100]`
        .replace("[playerKick]", player1.name)
        .replace("[playerDefence]", player2.name);
      break;
    case "defence":
      logMessage = `${formattedDate} - ${text}`
        .replace("[playerDefence]", player1.name)
        .replace("[playerKick]", player2.name);
      break;
    default:
      logMessage = text;
  }
  chatBlock.insertAdjacentHTML("afterbegin", `<p>${logMessage}</p>`);
};

const generateTimeString = (time) => (time < 10 ? `0 ${time}` : time);

export { generateLogs, generateTimeString, chatBlock };
