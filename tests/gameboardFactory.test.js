const module = require('../src/factories/gameboardFactory');

it('generates a new gameboard', () => {
    const board = module.gameboardFactory();
    expect(board.getBoard()).toEqual( [
        [
          { occupied: false, miss: false, ship: '' },
          { occupied: false, miss: false, ship: '' },
          { occupied: false, miss: false, ship: '' },
          { occupied: false, miss: false, ship: '' },
          { occupied: false, miss: false, ship: '' },
          { occupied: false, miss: false, ship: '' },
          { occupied: false, miss: false, ship: '' },
          { occupied: false, miss: false, ship: '' },
          { occupied: false, miss: false, ship: '' },
          { occupied: false, miss: false, ship: '' }
        ],
        [
          { occupied: false, miss: false, ship: '' },
          { occupied: false, miss: false, ship: '' },
          { occupied: false, miss: false, ship: '' },
          { occupied: false, miss: false, ship: '' },
          { occupied: false, miss: false, ship: '' },
          { occupied: false, miss: false, ship: '' },
          { occupied: false, miss: false, ship: '' },
          { occupied: false, miss: false, ship: '' },
          { occupied: false, miss: false, ship: '' },
          { occupied: false, miss: false, ship: '' }
        ],
        [
          { occupied: false, miss: false, ship: '' },
          { occupied: false, miss: false, ship: '' },
          { occupied: false, miss: false, ship: '' },
          { occupied: false, miss: false, ship: '' },
          { occupied: false, miss: false, ship: '' },
          { occupied: false, miss: false, ship: '' },
          { occupied: false, miss: false, ship: '' },
          { occupied: false, miss: false, ship: '' },
          { occupied: false, miss: false, ship: '' },
          { occupied: false, miss: false, ship: '' }
        ],
        [
          { occupied: false, miss: false, ship: '' },
          { occupied: false, miss: false, ship: '' },
          { occupied: false, miss: false, ship: '' },
          { occupied: false, miss: false, ship: '' },
          { occupied: false, miss: false, ship: '' },
          { occupied: false, miss: false, ship: '' },
          { occupied: false, miss: false, ship: '' },
          { occupied: false, miss: false, ship: '' },
          { occupied: false, miss: false, ship: '' },
          { occupied: false, miss: false, ship: '' }
        ],
        [
          { occupied: false, miss: false, ship: '' },
          { occupied: false, miss: false, ship: '' },
          { occupied: false, miss: false, ship: '' },
          { occupied: false, miss: false, ship: '' },
          { occupied: false, miss: false, ship: '' },
          { occupied: false, miss: false, ship: '' },
          { occupied: false, miss: false, ship: '' },
          { occupied: false, miss: false, ship: '' },
          { occupied: false, miss: false, ship: '' },
          { occupied: false, miss: false, ship: '' }
        ],
        [
          { occupied: false, miss: false, ship: '' },
          { occupied: false, miss: false, ship: '' },
          { occupied: false, miss: false, ship: '' },
          { occupied: false, miss: false, ship: '' },
          { occupied: false, miss: false, ship: '' },
          { occupied: false, miss: false, ship: '' },
          { occupied: false, miss: false, ship: '' },
          { occupied: false, miss: false, ship: '' },
          { occupied: false, miss: false, ship: '' },
          { occupied: false, miss: false, ship: '' }
        ],
        [
          { occupied: false, miss: false, ship: '' },
          { occupied: false, miss: false, ship: '' },
          { occupied: false, miss: false, ship: '' },
          { occupied: false, miss: false, ship: '' },
          { occupied: false, miss: false, ship: '' },
          { occupied: false, miss: false, ship: '' },
          { occupied: false, miss: false, ship: '' },
          { occupied: false, miss: false, ship: '' },
          { occupied: false, miss: false, ship: '' },
          { occupied: false, miss: false, ship: '' }
        ],
        [
          { occupied: false, miss: false, ship: '' },
          { occupied: false, miss: false, ship: '' },
          { occupied: false, miss: false, ship: '' },
          { occupied: false, miss: false, ship: '' },
          { occupied: false, miss: false, ship: '' },
          { occupied: false, miss: false, ship: '' },
          { occupied: false, miss: false, ship: '' },
          { occupied: false, miss: false, ship: '' },
          { occupied: false, miss: false, ship: '' },
          { occupied: false, miss: false, ship: '' }
        ],
        [
          { occupied: false, miss: false, ship: '' },
          { occupied: false, miss: false, ship: '' },
          { occupied: false, miss: false, ship: '' },
          { occupied: false, miss: false, ship: '' },
          { occupied: false, miss: false, ship: '' },
          { occupied: false, miss: false, ship: '' },
          { occupied: false, miss: false, ship: '' },
          { occupied: false, miss: false, ship: '' },
          { occupied: false, miss: false, ship: '' },
          { occupied: false, miss: false, ship: '' }
        ],
        [
          { occupied: false, miss: false, ship: '' },
          { occupied: false, miss: false, ship: '' },
          { occupied: false, miss: false, ship: '' },
          { occupied: false, miss: false, ship: '' },
          { occupied: false, miss: false, ship: '' },
          { occupied: false, miss: false, ship: '' },
          { occupied: false, miss: false, ship: '' },
          { occupied: false, miss: false, ship: '' },
          { occupied: false, miss: false, ship: '' },
          { occupied: false, miss: false, ship: '' }
        ]
      ]);
})
