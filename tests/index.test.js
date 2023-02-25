const module = require('../src');

it('adds 1 + 2 to equal 3', () => {
  expect(module.sum(1, 2)).toBe(3);
});

it('capitalizes the first letter in my name', () => {
  expect(module.capitalize('julia')).toBe('Julia');
})

it('reverses the letters in my name', () => {
  expect(module.reverseString('julia')).toBe('ailuj');
})

it('adds 1 + 2 to equal three in the calculator object', () => {
  expect(module.calculator.add(1, 2)).toBe(3);
})

it('subtracts 5 - 2 to equal three in the calculator object', () => {
  expect(module.calculator.subtract(5, 2)).toBe(3);
})

it('correctly analyzes an array', () => {
  expect(module.analyzeArray([6,67,3,4,1])).toEqual( {
    'average': 16.2,
    'length': 5,
    'min': 1,
    'max': 67,
  })
})