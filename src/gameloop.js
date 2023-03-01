const player = require("./factories/player");
const ai = require("./factories/ai");
const shipSetup = require("./pageModules/shipSetupPage")

function gameLoop(playerName) {

    let user = player.playerFactory(playerName);
    let userBoard = user.board.getBoard;
    let computer = ai.aiFactory();
    let computerBoard = computer.board.getBoard;

    const players = [user, computer];

    shipSetup.shipSetupPage(user, computer);

    let activePlayer = players[0];

}


module.exports = {
    gameLoop,
}
