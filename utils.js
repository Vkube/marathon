import { generateTimeString } from "./game-start.js";

const getTime = () => {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const formattedDate = `${generateTimeString(hours)} : ${generateTimeString(
    minutes
  )} : ${generateTimeString(seconds)}`;
  return formattedDate;
};

const getRandomNumber = (min = 1, max = 20) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const createHTMLElement = (tag = "div", classname, content) => {
  const element = document.createElement(tag);
  if (classname) {
    element.classList.add(classname);
  }
  if (typeof content === "string") {
    element.innerHTML = content;
  }
  if (Array.isArray(content)) {
    content.forEach((item) => element.appendChild(item));
  }
  return element;
};

export { getTime, getRandomNumber, createHTMLElement };
