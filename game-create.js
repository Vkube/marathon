import { LOGS } from './constants.js';
import { getRandomNumber } from './utils.js';

class Logs {
   constructor ({
      chat,
   }) {
      this.root = chat;
   }

   generate = (player1Name, player2Name) => {
      this.generateLogs('start', player1Name, player2Name)
   }

   hit = (player1Name, player2Name, valueAttack, hp) => {
      this.generateLogs('hit', player1Name, player2Name, valueAttack, hp)
   }

   defence = (player1Name, player2Name, valueAttack, hp) => {
      this.generateLogs('defence', player1Name, player2Name, valueAttack, hp)
   }

   draw = () => {
      this.generateLogs('draw')
   }

   end = (player1Name, player2Name) => {
      this.generateLogs('end', player1Name, player2Name)
   }

   generateLogs = (type, player1, player2, valueAttack, hp) => {
      const time = new Date().toLocaleTimeString();

      let element;
      let text;

      switch (type) {
         case 'start':
               text = LOGS[type]
                  .replace('[player1]', player1)
                  .replace('[player2]', player2)
                  .replace('[time]', time);
            break;
         case 'hit': 
               text = LOGS[type][getRandomNumber(LOGS[type].length - 1)]
                  .replace('[playerKick]', player1)
                  .replace('[playerDefence]', player2) + 
                   `<span class="damage">${valueAttack} HP</span> [${hp}/100]`;
            break;
         case 'defence':
               text = LOGS[type][getRandomNumber(LOGS[type].length - 1)]
                  .replace('[playerKick]', player1)
                  .replace('[playerDefence]', player2) + 
                   `<span class="defence">${valueAttack} HP</span> [${hp}/100]`;
            break;
         case 'draw':
               text = LOGS[type];
            break;
         case 'end':
               text = LOGS[type][getRandomNumber(LOGS[type].length - 1)]
                  .replace('[playerWins]', player1)
                  .replace('[playerLose]', player2);
            break;
         default:
            break;
      }

      element = `<p>[${time}] ${text}</p>` ;

      this.root.insertAdjacentHTML('afterbegin', element);
   };
}

export default Logs;