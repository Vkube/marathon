import{createHTMLElement} from './utils.js';

class Player {
    constructor({player, name, hp, img}){
        this.name = name;
        this.hp = hp ? hp : 100;
        this.img = img;
        this.player = player;
        this.selector = `player${this.player}`;
    }

    changeHP = (value) => {
        this.hp -= value;
    
        if (this.hp < 0) {
            this.hp = 0;
        }
    }
    
    elHP = () => {
        return document.querySelector(`.${this.selector} .life`);
    }
    
     renderHP = () => {
        this.elHP().style.width = `${this.hp}%`;
    }

    createPlayer = () => {
        const arenasBlock = document.querySelector('.arenas');
        const player = createHTMLElement('div', this.selector);
        const progressbarEl = createHTMLElement('div', 'progressbar');
        const characterEl = createHTMLElement('div', 'character');
        const lifeEl = createHTMLElement('div', 'life');
        const nameEl = createHTMLElement('div', 'name');
        const imgEl = createHTMLElement('img');

        imgEl.src = this.img;

        lifeEl.style.width = this.hp + '%';
        nameEl.innerText = this.name;

        player.appendChild(progressbarEl);
        player.appendChild(characterEl);

        progressbarEl.appendChild(lifeEl);
        progressbarEl.appendChild(nameEl);

        characterEl.appendChild(imgEl);
        
        arenasBlock.appendChild(player);

        return player;
    };

    doAttack = (hpValue) => {
        this.changeHP(hpValue);
        this.renderHP();
    };
}

export default Player;