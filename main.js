const LOGS = {
    start: 'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
    end: [
    'Результат удара [playerWins]: [playerLose] - труп',
    '[playerLose] погиб от удара бойца [playerWins]',
    'Результат боя: [playerLose] - жертва, [playerWins] - убийца',
    ],
    hit: [
    '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
    '[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
    '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
    '[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',
    '[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
    '[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
    '[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
    '[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
    '[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',
    '[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
    '[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
    '[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
    '[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
    '[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
    '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
    '[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
    '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
    '[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.',
    ],
    defence: [
    '[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
    '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
    '[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
    '[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
    '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
    '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
    '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
    '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.'
    ],
    draw: 'Ничья - это тоже победа!'
    };
    
const HIT = {
    head: 30,
    body: 25,
    foot: 20,
};

const ATTACK = ["head", "body", "foot"];

const arenasBlock = document.querySelector('.arenas');
const formFight = document.querySelector('.control');
const chatBlock = document.querySelector('.chat');

const player1 = {
    player: 1,
    name: 'Sun-ZERO',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ["Двуручный", "Одноручный", "Лук", "Копьё", "Книга"],
    elHP,
    changeHP,
    renderHP
};

const player2 = {
    player: 2,
    name: 'Sonya',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
    weapon: ["Двуручный", "Одноручный", "Лук", "Копьё", "Книга"],
    elHP,
    changeHP,
    renderHP
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

const getRandomNumber = (min = 1, max = 20)=> {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

const createHTMLElement = (tag = 'div', classname, content) => {
    const element = document.createElement(tag);
    if (classname) {
        element.classList.add(classname);
    }
    if (typeof content === 'string') {
        element.innerHTML = content;
    }
    if (Array.isArray(content)) {
        content.forEach((item) => element.appendChild(item));
    }
    return element;
};

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

const createPlayer = (playerName, {name, hp, img }) => {
    const player = createPlayerMarkup(playerName, name, hp, img);

    arenasBlock.appendChild(player);
};

const renderPlayerWin = (name) =>{
    const winnerName = name ? `${name} wins` : 'draw';

    const winTitle = createHTMLElement('div', 'winTitle', winnerName);

    arenasBlock.appendChild(winTitle);
};

 const createReloadButton = () =>{
    const reloadButton = createHTMLElement('button', 'button', 'Reload');
    const reloadButtonWrapper = createHTMLElement('div', 'reloadWrap', [reloadButton]);

    arenasBlock.appendChild(reloadButtonWrapper);

    return reloadButton;
}

 function enemyAttack(){
     const length = ATTACK.length - 1;
    const hit = ATTACK[getRandomNumber(0, length)];
    const defence = ATTACK[getRandomNumber(0, length)];

    return{
        value: getRandomNumber(0, HIT[hit]),
        hit,
        defence,
    };
}

const playerAttack = () => {
    const attack = {};

        for(let item  of formFight){
            if(item.checked && item.name === "hit"){
                attack.value = getRandomNumber(0, HIT[item.value]);
                attack.hit = item.value;
            }
            if(item.checked && item.name ==="defence"){
                attack.defence = item.value;
            }
            item.checked = false;
        }
    
    return attack;
}

const showResult = () => {
    const reloadButton = createReloadButton();

    reloadButton.addEventListener('click', ()=> {
        window.location.reload();
    });

    if(player1.hp === 0 || player2.hp === 0){
        reloadButton.style.display = 'block';

        for(let item of formFight){
            item.disabled = true;
        }
    }

    if(player1.hp === 0 && player1.hp < player2.hp){
        renderPlayerWin(player2.name);
        generateLogs('end', player2, player1);
    }else if(player2.hp === 0 && player2.hp < player1.hp){
        renderPlayerWin(player1.name);
        generateLogs('end', player1, player2);
    }else if(player1.hp === 0 && player2.hp === 0){
        renderPlayerWin();
        generateLogs('draw');
    }
}

const generateTimeString = (time) => time < 10 ? `0 ${time}` : time;

const getTime = () =>{
    
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const formattedDate = `${generateTimeString(hours)} : ${generateTimeString(minutes)} : ${generateTimeString(seconds)}`;
    return formattedDate;
}

const generateLogs = (type, player1, player2, damage = 0) =>{
   

    const text = type.includes('start', 'draw') ? LOGS[type] : LOGS[type] [getRandomNumber(0, LOGS[type].length - 1)];

    const formattedDate = getTime();

    let logMessage = '';

    switch(type){
        case 'start':
            logMessage = `${formattedDate} - ${text}`.replace('[time]', formattedDate).replace('[player1]', player1.name).replace('[player2]', player2.name);
            break;
        case 'end':
            logMessage = text.replace('[playerWins]', player1.name).replace('[playerLose]', player2.name);
            break;
        case 'hit':
            logMessage = `${formattedDate} - ${text} -${damage} [${player2.hp}/100]`.replace('[playerKick]', player1.name).replace('[playerDefence]', player2.name);
            break;
        case 'defence':
            logMessage = `${formattedDate} - ${text}`.replace('[playerDefence]', player1.name).replace('[playerKick]', player2.name);
            break;
        default:
            logMessage = text;
    }
    chatBlock.insertAdjacentHTML('afterbegin', `<p>${logMessage}</p>`);
}

formFight.addEventListener('submit', (e) => {
    e.preventDefault();

    const enemy = enemyAttack();
    const attack = playerAttack();

    let damagePlayer1 = 0;
    let damagePlayer2 = 0;

    if(enemy.hit === attack.defence){
        generateLogs('defence', player2, player1, damagePlayer1);
    }else{
        damagePlayer1 = enemy.value;

        player1.changeHP(damagePlayer1);
        player1.renderHP();

        generateLogs('hit', player2, player1, damagePlayer1);
    }

    if(attack.hit === enemy.defence){
        generateLogs('defence', player1, player2, damagePlayer1);
    } else{
        damagePlayer2 = attack.value;

        player2.changeHP(damagePlayer2);
        player2.renderHP();

        generateLogs('hit', player1, player2, damagePlayer2);
    }

    showResult();
    });

    createPlayer('player1', player1);
    createPlayer('player2', player2);
    generateLogs('start', player1, player2);