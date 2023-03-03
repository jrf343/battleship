const { isUndefined } = require("lodash");
const { check } = require("prettier");

const shipTypes = [
  { type: "carrier", length: 5 },
  { type: "battleship", length: 4 },
  { type: "submarine", length: 3 },
  { type: "cruiser", length: 3 },
  { type: "patrolBoat", length: 2 },
];

const gridTypes = [
  { userGrid: "" },
  { userViewAiGrid: "" },
  { aiGrid: "" },
  { aiViewuserGrid: "" },
];

function generateGrid(gridType, size) {
  let grid = [];
  for (let i = 0; i < size; i++) {
    grid[i] = [];
    for (let j = 0; j < size; j++) {
      grid[i].push({ x: i, y: j });
    }
  }
  gridTypes[gridType] = grid;
  return grid;
}

/* Set up user board in UI where user will make their ship placement choices */

function promptUser() {
  const promptContainer = document.createElement("div");
  promptContainer.id = "promptContainer";

  const prompt = document.createElement("h2");
  prompt.id = "shipSetupPrompt";
  prompt.textContent = "Place your battalion in the waters.";
  promptContainer.appendChild(prompt);

  const shipPromptContainer = document.createElement("div");
  shipPromptContainer.id = "shipContainer";

  for (let obj of shipTypes) {
    let shipPrompt = document.createElement("div");
    shipPrompt.id = obj.type;
    shipPrompt.classList.add("shipPrompt");
    shipPrompt.classList.add('shipImage');
    shipPrompt.draggable = true;
    shipPrompt.dataset.placed = false;
    shipPromptContainer.appendChild(shipPrompt);
  }

  promptContainer.appendChild(shipPromptContainer);

  const directionStatus = document.createElement("div");
  directionStatus.id = "directionStatus";

  const label = document.createElement("label");
  label.classList.add("label");

  const status = document.createElement("input");
  status.classList.add("status");
  status.setAttribute("type", "checkbox");
  label.appendChild(status);

  const slider = document.createElement("div");
  slider.classList.add("slider");
  slider.setAttribute("unchecked", "vertical");
  slider.setAttribute("checked", "horizontal");
  label.appendChild(slider);

  directionStatus.appendChild(label);

  promptContainer.appendChild(directionStatus);

  const submitButton = document.createElement("button");
  submitButton.id = "submitPlacement";
  submitButton.classList.add("btn");
  submitButton.innerText = "begin battle";
  promptContainer.appendChild(submitButton);

  document.body.appendChild(promptContainer);
}

function generateUserGrid(user) {
  let userBoard = user.board.getBoard;

  const playerGrid = document.createElement("div");
  playerGrid.classList.add("grid");
  playerGrid.id = "playerGrid";

  let userGrid = generateGrid("userGrid", userBoard.length);

  for (let elem of userGrid.flat()) {
    let x = elem.x + 1;
    let y = elem.y + 1;
    let square = document.createElement("div");
    square.classList.add("box");
    square.classList.add("userGrid");
    square.style.gridRow = `${x} / ${x}`;
    square.style.gridColumn = `${y} / ${y}`;
    square.dataset.occupied = false;
    square.dataset.shipName = "";
    playerGrid.appendChild(square);
  }

  document.body.appendChild(playerGrid);

}

function placeUserShips(user) {
  const userBoxes = document.querySelectorAll(".userGrid");
  const ships = document.querySelectorAll(".shipPrompt");
  const shipContainer = document.querySelector("#shipContainer");
  const submitButton = document.getElementById("submitPlacement");
  let direction = "vertical";

  const slider = document.querySelector(".slider");
  slider.addEventListener("click", () => {
    if (direction === "vertical") {
      direction = "horizontal";
    } else {
      direction = "vertical";
    }
  });

  addEventListeners(shipContainer);

  userBoxes.forEach((box) => {
    addEventListeners(box);
  });

  ships.forEach((ship) => {
    ship.addEventListener("dragstart", dragstart);
  });

  userBoxes.forEach((box) => {
    box.addEventListener("drop", (e) => {
      e.preventDefault();

      const id = e.dataTransfer.getData("text/plain");
      let dragged = document.getElementById(id);

      try {
        user.board.placeShip(
          dragged.id,
          box.style.gridRowStart - 1,
          box.style.gridColumnStart - 1,
          direction
        );
      } catch (err) {
        alert(err + " Try again!");
        return;
      }

      e.target.appendChild(dragged);
      dragged.removeEventListener("dragstart", dragstart);
      dragged.draggable = false;
      dragged.dataset.placed = true;
      updateBoard(userBoxes, user.board.getBoard, direction);
    });
  });

  shipContainer.addEventListener("drop", (e) => {
    e.preventDefault();
    shipContainer.classList.remove("drag-over");
  })

  submitButton.addEventListener("click", () => {
    if ((shipContainer.children = isUndefined)) {
      return;
    } else {
      alert("You must place all 5 ships!");
    }
  });
}

function dragstart(e) {
  e.dataTransfer.setData("text/plain", e.target.id);
}

function addEventListeners(target) {
  target.addEventListener("dragenter", dragenter);

  target.addEventListener("dragover", dragover);

  target.addEventListener("dragleave", dragleave);
}

function dragenter(e) {
  if (e.target.matches(".userGrid") || e.target.matches("#shipContainer")) {
    e.preventDefault();
    e.target.classList.add("drag-over");
  }
}

function dragover(e) {
  if (e.target.matches(".userGrid") || e.target.matches("#shipContainer")) {
    e.preventDefault();
    e.target.classList.add("drag-over");
  }
}

function dragleave(e) {
  if (e.target.matches(".userGrid") || e.target.matches("#shipContainer")) {
    e.target.classList.remove("drag-over");
  }
}

function removeEventListeners(target) {
  target.removeEventListener("dragenter", dragenter);

  target.removeEventListener("dragover", dragover);

  target.removeEventListener("dragleave", dragleave);
}

function updateBoard(boxes, gameboard) {
  board = gameboard.flat();
  for (let i = 0; i < board.length; i++) {
    if (boxes[i].dataset.occupied !== `${board[i].occupied}`) {
      boxes[i].dataset.occupied = board[i].occupied;
      boxes[i].dataset.shipName = board[i].shipName;
      removeEventListeners(boxes[i]);
      boxes[i].classList.remove("drag-over");
    }
  }
}

/* Set up AI board */

function generateAiGrid(computer) {
  let computerBoard = computer.board.getBoard;
}

function shipSetup(user, computer) {
  promptUser();
  generateUserGrid(user);
  placeUserShips(user);
}

module.exports = {
  shipSetup,
};
