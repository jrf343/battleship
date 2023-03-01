const { check } = require("prettier");

const shipTypes = [
    {type: 'carrier', length: 5 },
    {type: 'battleship', length: 4 },
    {type: 'submarine', length: 3 },
    {type: 'cruiser', length: 3 },
    {type: 'patrolBoat', length: 2 },
];

const gridTypes = [
    {userGrid: ''},
    {userViewAiGrid: ''},
    {aiGrid: ''},
    {aiViewuserGrid: ''},
];

function generateGrid (gridContainer, gridType, size) {
    let grid = [];
    for (let i = 0; i < size; i++) {
        grid[i] = [];
        for (let j = 0; j < size; j++) {
            grid[i].push({x: i, y: j});
            let square = document.createElement('div');
            square.classList.add('box');
            square.classList.add(`${gridType}`);
            square.style.gridRow = `${i +1 } / ${i + 1}`;
            square.style.gridColumn = `${j + 1} / ${j + 1}`;
            square.dataset.occupied = false;
            gridContainer.appendChild(square);
        }
    }

    gridTypes[gridType] = grid;
}

function promptUser (user) {
    const promptContainer = document.createElement('div');
    promptContainer.id = 'promptContainer';

    const prompt = document.createElement('h2');
    prompt.id = 'shipSetupPrompt';
    prompt.textContent = "Place your battalion in the waters."
    promptContainer.appendChild(prompt);

    const shipPromptContainer = document.createElement('div');
    shipPromptContainer.id = 'shipContainer';

    for (let obj of shipTypes) {
        let shipPrompt = document.createElement('div');
        shipPrompt.id = obj.type;
        shipPrompt.classList.add('shipPrompt');
        shipPrompt.draggable = true;
        shipPrompt.textContent = obj.type;
        shipPrompt.dataset.placed = false;
        shipPromptContainer.appendChild(shipPrompt);
    }
    
    promptContainer.appendChild(shipPromptContainer);
    
    const directionStatus = document.createElement('div');
        directionStatus.id = 'directionStatus';

        const label = document.createElement('label');
            label.classList.add('label');

            const status = document.createElement('input');
                status.classList.add('status');
                status.setAttribute('type', 'checkbox');
                label.appendChild(status);

            const slider = document.createElement('div');
                slider.classList.add('slider');
                slider.setAttribute('unchecked', 'vertical');
                slider.setAttribute('checked', 'horizontal');
                label.appendChild(slider);
            
    directionStatus.appendChild(label);  
    
    promptContainer.appendChild(directionStatus);
    
    document.body.appendChild(promptContainer);

    setUpUserGrid(user);

}

function setUpUserGrid (user) {
    let userBoard = user.board.getBoard;

    const playerGrid = document.createElement('div');
    playerGrid.classList.add('grid');
    playerGrid.id = 'playerGrid';

    generateGrid(playerGrid, 'userGrid', userBoard.length);

    document.body.appendChild(playerGrid);

    placeUserShips(user);

}

function placeUserShips(user) {
    const userBoxes = document.querySelectorAll('.userGrid');
    const ships = document.querySelectorAll('.shipPrompt')
    const shipContainer = document.querySelector('#shipContainer');
    let direction = 'vertical';
    let placedArray = [];

    const slider = document.querySelector('.slider');
    slider.addEventListener('click', () => {
        if (direction === 'vertical') {
            direction = 'horizontal';
        } else {
            direction = 'vertical';
        }

    })

    addEventListeners(shipContainer);

    userBoxes.forEach(box => {
        addEventListeners(box);
    })

    ships.forEach(ship => {
        ship.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', e.target.id);
        })
    })

    userBoxes.forEach(box => {
        box.addEventListener('drop', (e) => {
            e.preventDefault();

            const id = e.dataTransfer.getData('text/plain');
            let dragged = document.getElementById(id);
            let parentNode = dragged.parentNode;

            let spanArray = generateAdjacentSquares(box, direction, dragged.id);

            let collision = checkCollision(spanArray);

            if (collision) {
                return;
            }

            for (let box of spanArray) {
                removeEventListeners(box);
                box.classList.remove('drag-over');
                dragged.dataset.placed = true;
                box.dataset.occupied = true;
                box.dataset.ship = dragged.id;
            }

            e.target.appendChild(dragged)


            if (parentNode.dataset.occupied) {
                for (let elem of placedArray) {
                    if (elem.ship === parentNode.dataset.ship) {
                        let index = placedArray.indexOf(elem);
                        let x = placedArray.splice(index, 1);

                        let parentDirection = elem.direction;
                        let oldSpanArray = generateAdjacentSquares(parentNode, parentDirection, elem.ship);
                        for (let box of oldSpanArray) {
                            box.dataset.occupied = false;
                            box.removeAttribute('data-ship');
                            addEventListeners(box);
                        }
                    }
                }
            }

            placedArray.push({ship: dragged.id, x: (e.target.style.gridRowStart - 1), y: (e.target.style.gridColumnStart - 1), direction: direction});

            if (placedArray.length === 5) {
                console.log('all placed');
            };

        })
    })

    shipContainer.addEventListener('drop', (e) => {
        e.preventDefault();

        const id = e.dataTransfer.getData('text/plain');
        let dragged = document.getElementById(id);
        let parentNode = dragged.parentNode;

        e.target.classList.remove('drag-over');

        for (let elem of placedArray) {
            if (elem.ship === parentNode.dataset.ship) {
                let parentDirection = elem.direction;
                let oldSpanArray = generateAdjacentSquares(parentNode, parentDirection, elem.ship);
                for (let box of oldSpanArray) {
                    box.dataset.occupied = false;
                    box.removeAttribute('data-ship');
                    addEventListeners(box);
                }
            }
        }

        dragged.dataset.placed = false;

        e.target.appendChild(dragged);
        addEventListeners(parentNode);

        for (let elem of placedArray) {
            if (dragged.id === elem.ship) {
                let index = placedArray.indexOf(elem);
                let x = placedArray.splice(index, 1);
            }
        }
    });

}

function generateAdjacentSquares(square, direction, shipType) {
    const userBoxes = document.querySelectorAll('.userGrid');
    const x = parseInt(square.style.gridRowStart);
    const y = parseInt(square.style.gridColumnStart);
    const length = parseInt(getShipLength(shipType));

    let spanArray = [];

    if (direction === 'vertical') {
        for (let i = x; i < (x + length); i++) {
            for (let box of userBoxes) {
                if (box.style.gridRowStart === `${i}` && box.style.gridColumnStart === `${y}`) {
                    spanArray.push(box);
                }
            }
        }
    } else {
        for (let box of userBoxes) {
            for (let i = y; i < (y + length); i++) {
                if (box.style.gridRowStart === `${x}` && box.style.gridColumnStart === `${i}`) {
                    spanArray.push(box);
                }
            }
        }
    }

    return spanArray;
}

function checkCollision (spanArray) {
    let collision = false;
    for (let box of spanArray) {
        if (box.dataset.occupied === 'true') {
            collision = true;
        } 
    }
    return collision;
}

function getShipLength(shipType) {
    let length = null;
    for (let ship of shipTypes) {
        if (shipType === ship.type) {
            length = ship.length;
        }
    }
    return length;
}

function addEventListeners(target) {
    target.addEventListener('dragenter', dragenter);

    target.addEventListener('dragover', dragover);

    target.addEventListener('dragleave', dragleave);

}

function dragenter(e) {
    if (e.target.matches('.userGrid') || e.target.matches('#shipContainer')) {
        e.preventDefault();
        e.target.classList.add('drag-over');
    }
}

function dragover(e) {
    if (e.target.matches('.userGrid')|| e.target.matches('#shipContainer')) {
        e.preventDefault();
        e.target.classList.add('drag-over');
    }
}

function dragleave(e) {
    if (e.target.matches('.userGrid') || e.target.matches('#shipContainer')) {
        e.target.classList.remove('drag-over');
    }
}

function removeEventListeners(target) {
    target.removeEventListener('dragenter', dragenter);

    target.removeEventListener('dragover', dragover);

    target.removeEventListener('dragleave', dragleave);
}

function shipSetupPage (user, computer) {
    promptUser(user);
}

module.exports = {
    shipSetupPage,
}