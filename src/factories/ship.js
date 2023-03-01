const shipFactory = (shipType) => {
  const shipTypes = [
    {name: 'carrier', length: 5 },
    {name: 'battleship', length: 4 },
    {name: 'submarine', length: 3 },
    {name: 'cruiser', length: 3 },
    {name: 'patrolBoat', length: 2 },
  ];

  const ship = shipTypes.find(obj => obj.name === shipType)
  const name = ship.name;
  const length = ship.length;
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
    name,
    length,
    hits,
    hit,
    isSunk,
  };
};

module.exports = {
  shipFactory,
};
