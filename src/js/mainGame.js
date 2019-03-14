const Ship = require('./factories/ship');
const GameBoard = require('./factories/gameBoard');
const Player = require('./factories/player');
const {
  humanMakeChoice,
  computerMakeChoice,
} = require('./mixins/playerMixin');



// 1. Create two sets of ships
const fleet = {
  cruiser1: Ship(1),
  cruiser2: Ship(1),
  cruiser3: Ship(1),
  cruiser4: Ship(1),
  frigate1: Ship(2),
  frigate2: Ship(2),
  frigate3: Ship(2),
  destroyer1: Ship(3),
  destroyer2: Ship(3),
  carrier: Ship(4)
}

const fleet1 = Object.assign({}, fleet);
const fleet2 = Object.assign({}, fleet);
// 2. Create two gameBoards
const gameBoard1 = GameBoard(fleet1);
const gameBoard2 = GameBoard(fleet2);
// 3. Create two players
const player1 = Object.assign(Player(gameBoard2, 'receiveAttack'), {
  makeChoice: humanMakeChoice,
})

const player2 = Object.assign(Player(gameBoard1, 'receiveAttack'), {
  makeChoice: computerMakeChoice,
})

// 4. Create gameCycle function
//      1. Check all gameBoards ships are not sunk yet
while (!gameBoard1.allShipsSunk('isSunk') && !gameBoard2.allShipsSunk('isSunk')) {
  player1.turn(player1.makeChoice(index));
  if (!gameBoard2.allShipsSunk('isSunk')) player2.turn(player2.makeChoice());
}
gameEnd();

const gameEnd = () => {

}
//    a. Player 1 makes turn
//      1. 
//    b. Player 2 makes turn