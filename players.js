import{createHTMLElement} from './utils.js';

const arenasBlock = document.querySelector('.arenas');

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

const createPlayer = (playerName, {name, hp, img }) => {
    const player = createPlayerMarkup(playerName, name, hp, img);

    arenasBlock.appendChild(player);
};

function changeHP(value) {
    this.hp -= value;

    if (this.hp < 0) {
        this.hp = 0;
    }
}

function elHP() {
    return document.querySelector(`.player${this.player} .life`);
}

function renderHP() {
    this.elHP().style.width =  `${this.hp}%`;
}

const createPlayerMarkup = (playerName, name, hp, pathToImg) => {
    const lifeEl = createHTMLElement('div', 'life');
    const nameEl = createHTMLElement('div', 'name', name);
    const imgEl = createHTMLElement('img');

    lifeEl.style.width = `${hp}%`;
    imgEl.src = pathToImg;

    const progressbarEl = createHTMLElement('div', 'progressbar', [lifeEl, nameEl]);
    const characterEl = createHTMLElement('div', 'character', [imgEl]);

    return createHTMLElement('div', playerName, [progressbarEl, characterEl]);
};

export{ player1, player2, createPlayer, createPlayerMarkup, arenasBlock };