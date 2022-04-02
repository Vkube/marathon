let player1 = {
    name: "Sonya",
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
    weapon: ['pointed hat', 'battle ax', 'A wide sword'],
    attack: () => console.log(`${player1.name} Fight... `)
}


let player2 = {
    name: 'Sub-Zero',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['ice scepter', 'ice sword'],
    attack: () => console.log(`${player2.name} Fight...`)
}
/*

*/
//task1
function createPlayer(classList, charName, lifeLevel, img) {

    let player = document.createElement('div');
    let arena = document.querySelector('.arenas');
    let progressbar = document.createElement('div');
    let life = document.createElement('div');
    let name = document.createElement('div');
    let character = document.createElement('div');
    let img = document.createElement('img');

    player.classList.add(classList);
    progressbar.classList.add('progressbar');
    character.classList.add('character');
    life.classList.add('life');
    name.classList.add('name');
    img.src = img;

    name.innerHTML = charName;
    life.style.width = lifeLevel + '%';

    arena.appendChild(player);
    player.appendChild(progressbar);
    player.appendChild(character);
    progressbar.appendChild(life);
    progressbar.appendChild(name);
    character.appendChild(img);

}
//task2
createPlayer('player1', player1.name, 50, player1.img);
createPlayer('player2', player2.name, 80, player2.img);
