const $arenas = document.querySelector(".arenas");
const $randomButton = document.querySelector(".button");

function getRandom(random) {
  return Math.ceil(Math.random() * random);
}

let player1 = {
  player: 1,
  name: "Sonya",
  hp: 100,
  img: "http://reactmarathon-api.herokuapp.com/assets/sonya.gif",
  weapon: ["pointed hat", "battle ax", "A wide sword"],
  attack: (name) => console.log(`${name} Fight... `),
  changeHP,
  elHP,
  renderHP,
};

let player2 = {
  player: 2,
  name: "Sub-Zero",
  hp: 100,
  img: "http://reactmarathon-api.herokuapp.com/assets/subzero.gif",
  weapon: ["ice scepter", "ice sword"],
  attack: (name) => console.log(`${name} Fight...`),
  changeHP,
  elHP,
  renderHP,
};

function createElement(tag, className) {
  const $tag = document.createElement(tag);
  if (className) {
    $tag.classList.add(className);
  }
  return $tag;
}

function createPlayer(playerObj) {
  const $player = createElement("div", "player" + playerObj.player);
  const $progressbar = createElement("div", "progressbar");
  const $character = createElement("div", "character");
  const $life = createElement("div", "life");
  const $name = createElement("div", "name");
  const $img = createElement("img");

  $life.style.width = playerObj.hp + "%";
  $name.innerText = playerObj.name;
  $img.src = playerObj.img;

  $progressbar.appendChild($name);
  $progressbar.appendChild($life);

  $character.appendChild($img);

  $player.appendChild($progressbar);
  $player.appendChild($character);

  return $player;
}

function changeHP(player) {
  const $playerLife = document.querySelector(
    ".player" + player.player + " .life"
  );
  player.hp -= getRandom(20);
  if (player.hp <= 0) {
    $arenas.appendChild(playerLose(player.name));
    player.hp = 0;
    $randomButton.disabled = true;
  }
  $playerLife.style.width = player.hp + "%";
}

function playerLose(name) {
  const $loseTitle = createElement("div", "loseTitle");
  $loseTitle.innerText = `${name} lose`;
  return $loseTitle;
}

$randomButton.addEventListener("click", function () {
  changeHP(player1);
  changeHP(player2);
});

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));
// TASK 2

//homework-4

function elHP() {
  return document.querySelector(".player" + this.player + ".life");
}

function changeHP(random) {
  this.hp -= random;
  if (this.hp <= 0) {
    this.hp = 0;
  }
}

function renderHP() {
  this.elHP().style.width = this.hp + "%";
}

function createReloadButton() {
  const $div = createElement("div", "reloadWrap");
  const $btn = createElement("button", "button");

  $btn.innerText = "Restart";

  $div.appendChild($btn);

  $btn.addEventListener("click", function () {
    window.location.reload();
  });
  return $div;
}
