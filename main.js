const $arenas = document.querySelector(".arenas");
const $randomButton = document.querySelector(".button");
const $winTitle = createElement("div", "loseTitle");

const ATTACK = ["head", "body", "foot"];

const HIT = {
    head: 30,
    body: 25,
    foot: 20,
};

// let player1 = {
//     player: 1,
//     name: "Sonya",
//     hp: 100,
//     img: "http://reactmarathon-api.herokuapp.com/assets/sonya.gif",
//     weapon: ["pointed hat", "battle ax", "A wide sword"],
//     attack: (name) => console.log(`${name} Fight... `),
//     changeHP,
//     elHP,
//     renderHP,
// };

// let player2 = {
//     player: 2,
//     name: "Sub-Zero",
//     hp: 100,
//     img: "http://reactmarathon-api.herokuapp.com/assets/subzero.gif",
//     weapon: ["ice scepter", "ice sword"],
//     attack: (name) => console.log(`${name} Fight...`),
//     changeHP,
//     elHP,
//     renderHP,
// };
const player1 = {
    player: 1,
    name: 'XIAO',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ["Двуручный", "Одноручный", "Лук", "Копьё", "Книга"],
    elHP,
    changeHP,
    renderHP
};

const player2 = {
    player: 2,
    name: 'MIKO',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
    weapon: ["Двуручный", "Одноручный", "Лук", "Копьё", "Книга"],
    elHP,
    changeHP,
    renderHP
};

/**
 * Фунцкия которая выдает случайное число в диапозоде от 0 до random
 * @param {number} random 
 * @returns {number}
 */
 function getRandom(random) {
    return random ? Math.ceil(Math.random() * random) : 20;
}

function elHP() {
    return document.querySelector('.player' + this.player + ' .life');
}

function renderHP() {
    this.elHP().style.width = this.hp + '%';
}

/**
 * Функция для подсчета урона игроку
 * @param {number} damage 
 */
 function changeHP(damage) {
    this.hp -= damage;

    if (this.hp <= 0) {
        this.hp = 0;
    }
}

/**
 * Функция атаки игрока
 * @returns 
 */
function enemyAttack(){
    const hit = ATTACK[getRandom(3) - 1];
    const defence = ATTACK[getRandom(3) - 1];

    return{
        value: getRandom(HIT[hit]),
        hit,
        defence,
    };
}

/**
 * Функция (шаблон) для создания html тегов
 * @param {string} tag 
 * @param {string} className 
 * @returns {HTMLElement}
 */
function createElement(tag, className) {
    const $tag = document.createElement(tag);
    if (className) {
        $tag.classList.add(className);
    }
    return $tag;
}

/**
 * Функция шаблон для создания игрока
 * @param playerObj 
 * @returns 
 */
 function createPlayer(playerObj) {
    const $player = createElement('div', 'player' + playerObj.player);
    const $progressbar = createElement('div', 'progressbar');
    const $character = createElement('div', 'character');
    const $life = createElement('div', 'life');
    const $name = createElement('div', 'name');
    const $img = createElement('img');

    $life.style.width = playerObj.hp + '%';
    $name.innerText = playerObj.name;
    $img.src = playerObj.img;

    $progressbar.appendChild($name);
    $progressbar.appendChild($life);

    $character.appendChild($img);

    $player.appendChild($progressbar);
    $player.appendChild($character);

    return $player;
}

/**
 * Функция для выведения информации о бое
 * @param {HTMLElement} className 
 * @param {string} text
 * @returns 
 */
 function createComment(className, text) {
    className.style.fontSize = '20px';
    className.innerText = text;

    return className;
}

/**
 * Функция для перезапуска страницы при клике на кнопку(Restart)
 * @returns {HTMLElement}
 */
function createReloadButton() {
    const $div = createElement('div', 'reloadWrap');
    const $btn = createElement('button', 'button');

    $btn.innerText = 'Restart';

    $div.appendChild($btn);

    $btn.addEventListener('click', function () {
        window.location.reload();
    });
    return $div;
}

/**
 * Функция которая управляет отображением кнопки
 * @param {boolean} bool 
 * @param control 
 */
function buttonRender(bool, control) {
    if (bool) {
        if (control) {
            for (let item of control) {
                if (item.tagName === 'INPUT' || item.tagName === 'BUTTON') {
                    item.disabled = true;
                }
            }
        }
        $arenas.appendChild(createReloadButton());
    }
}

/**
 * Функция удара игрока
 * @param {Element} formControl 
 * @returns 
 */
function playerAttack(formControl){
    const attack = {
        value: 0,
        hit: "",
        defence:"",
    };

    if(formControl){
        for(let item  of formControl){
            if(item.checked && item.name === "hit"){
                attack.value = getRandom(HIT[item.value]);
                attack.hit = item.value;
            }
            if(item.checked && item.name ==="defence"){
                attack.defence = item.value;
            }
            item.checked = false;
        }
    }
    return attack;
}

/**
 * Функция для боя
 * @param player1 
 * @param player2 
 */
function fight(player1, player2){
    const player = playerAttack($formControl);
    const enemy = enemyAttack();

    if(player.hit !== enemy.defence){
        player2.changeHP(player.value);
        player2.renderHP();
    }

    if(enemy.hit !== player.defence){
        player1.changeHP(enemy.value);
        player1.renderHP();
    }
}

function checkResult(player1, player2){
    if(player1.hp <= 0 || player2.hp <= 0){
        buttonRender(true, $formControl);
    }

    if(player1.hp === 0 && player2.hp === 0){
        $arenas.appendChild(playerWin($winTitle));
    } else if(player1.hp === 0 && player2.hp > 0){
        $arenas.appendChild(playerWin($winTitle, player2.name));
    }  else if(player1.hp > 0 && player2.hp === 0){
        $arenas.appendChild(playerWin($winTitle, player1.name));
    }
}

/**
 * Возвращает строку с победителем или с ничьей
 * @param {HTMLElement} element 
 * @param {string} [playerName]
 * @returns {HTMLElement}
 */
 function playerWin(element, playerName) {
    if (playerName) {
        element.style.fontSize = '36px';
        element.innerText = playerName + " WINER!";
    } else {
        element.innerText = "DEAD BOTH";
    }
    return element;
}

$formControl.addEventListener("submit", function (event){
    event.preventDefault();

    fight(player1, player2);

    checkResult(player1, player2);
});

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));
