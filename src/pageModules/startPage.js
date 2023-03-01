const game = require("../gameloop");

function startForm () {

    const form = document.createElement('div');
    form.id = 'form';

    const playerName = document.createElement('input');
    playerName.id = 'playerName';
    playerName.setAttribute('type', 'text');
    playerName.setAttribute('placeholder', 'Enter your name...')
    form.appendChild(playerName);

    const submitName = document.createElement('button');
    submitName.id = 'submitName';
    submitName.classList.add('btn');
    submitName.textContent = "start game";
    submitName.addEventListener('click', () => {
        if (playerName.value === "") {
            alert('Please enter a name to begin the game.')
        } else {
            const player = playerName.value;
            form.classList.add('hidden');
            game.gameLoop(player);
        }
    })
    form.appendChild(submitName);

    return form;

}

function startPage () {
    const form = startForm();
    document.body.appendChild(form);
}

module.exports = {
    startPage,
}
