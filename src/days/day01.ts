import { readFileSync } from "fs";

export function part1(): number {
  const data = readData();
  const calibrationValues = data.map(line => getCalibrationValueDigits(line));
  return calibrationValues.reduce((a, c) => a + c, 0);
}

export function part2(): number {
  const data = readData();
  const calibrationValues = data.map(line => getCalibrationValueAll(line));
  return calibrationValues.reduce((a, c) => a + c, 0);
}

function readData(): string[] {
  return readFileSync('src/data/day01.txt', 'utf8').trim().split('\n');
}

function getCalibrationValueDigits(line: string): number {
  const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  let first: string;
  let last: string;
  for (let i = 0; i < line.length; i++) {
    if (digits.includes(line[i])) {
      if (!first) {
        first = line[i];
      }
      last = line[i];
    }
  }
  return parseInt([first, last].join(''));
}

function getCalibrationValueAll(line: string): number {
  let first: string;
  let last: string;
  for (let i = 0; i < line.length; i++) {
    const match = matchNumber(line.slice(i));
    if (match) {
      if (!first) {
        first = match;
      }
      last = match;
    }
  }
  return parseInt([first, last].join(''));
}

function matchNumber(lineSlice: string): string | undefined {
  const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const numbers = [
    {name: 'zero', value: '0'},
    {name: 'one', value: '1'},
    {name: 'two', value: '2'},
    {name: 'three', value: '3'},
    {name: 'four', value: '4'},
    {name: 'five', value: '5'},
    {name: 'six', value: '6'},
    {name: 'seven', value: '7'},
    {name: 'eight', value: '8'},
    {name: 'nine', value: '9'},
  ];
  if (digits.includes(lineSlice[0])) {
    return lineSlice[0];
  }
  for (let n = 0; n < numbers.length; n++) {
    const number = numbers[n];
    if (lineSlice.startsWith(number.name)) {
      return number.value;
    }
  }
}