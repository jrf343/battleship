const shipFactory = (shipType) => {
  const shipTypes = {
    carrier: {
      length: 5,
    },
    battleship: {
      length: 4,
    },
    submarine: {
      length: 3,
    },
    cruiser: {
      length: 3,
    },
    patrolBoat: {
      length: 2,
    },
  };

  const type = shipType;
  const length = shipTypes[type].length;
  let hits = { value: 0 };

  const hit = () => {
    hits.value++;
  };

  const isSunk = () => {
    if (hits.value === length) {
      return true;
    } else {
      return false;
    }
  };

  return {
    type,
    length,
    hits,
    hit,
    isSunk,
  };
};

module.exports = {
  shipFactory,
  
};
