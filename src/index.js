import _ from 'lodash';
import './stylesheet.css';

function sum(a, b) {
  return a + b;
}

function capitalize(string) {
  return string[0].toUpperCase() + string.slice(1);
}

function reverseString(string) {
  let splitString = string.slice('');
  let reversedString = '';
  for (let i = splitString.length - 1; i >= 0; i--) {
    reversedString += splitString[i];
  }
  return reversedString;
}

const calculator = {
  add : function (a, b) {
    return a + b;
  },
  subtract : function (a, b) {
    return a - b;
  },
  multiply : function (a, b) { 
    return a * b;
  },
  divide : function (a, b) {
    return a / b;
  },
}

function analyzeArray (array) {
  let sum = 0;
  for (let num of array) { 
    sum += num;
  }
  let average = sum / array.length;

  let min = array[0];
  for (let num of array) { 
    if (num < min) {
      min = num;
    }
  }

  let max = array[0];
  for (let num of array) { 
    if (num > max) {
      max = num;
    }
  }

  let length = array.length;

  let object = {
    'average': average,
    'length': length,
    'min': min,
    'max': max,
  }

  return object;
}

module.exports = { 
  sum,
  capitalize,
  reverseString,
  calculator,
  analyzeArray,
}