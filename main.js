import Game from './game.js';

const arenasBlock = document.querySelector('.arenas');
const chat = document.querySelector('.chat');

const game = new Game({
    root: arenasBlock,
    chat: chat,
});
game.start();