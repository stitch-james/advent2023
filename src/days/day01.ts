import { readFileSync } from "fs";

export function part1(): number {
  const data = readFileSync('src/data/day01.txt', 'utf8').trim().split('\n');
  const calibrationValues = data.map(line => getCalibrationValue(line));
  return calibrationValues.reduce((a, c) => a + c, 0);
}

function getCalibrationValue(line: string): number {
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

export function part2(): number {
  console.log('Hello from day 1, part 2!');
  return 0;
}
