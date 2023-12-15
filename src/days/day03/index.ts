import { readData } from "../../data";

function includesSymbol(str: string): boolean {
  const notSymbols = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
  return ![...str].every(char => notSymbols.includes(char));
}

function findNeighbours(asterisk: RegExpMatchArray, line: string) {
  const neighbours = [];
  for (const number of line.matchAll(/\d+/g)) {
    if (asterisk.index >= number.index - 1 && asterisk.index <= number.index + number[0].length) {
      neighbours.push(parseInt(number[0]));
    }
  }
  return neighbours;
}

export function part1(): number {
  const lines = readData(3, 1);
  let total = 0;
  for (let i = 0; i < lines.length; i++) {
    const firstLine = i === 0;
    const lastLine = i === lines.length - 1;
    for (const match of lines[i].matchAll(/\d+/g)) {
      const firstColumn = match.index === 0;
      const lastColumn = match.index + match[0].length === lines[i].length;
      if (
        (!firstLine && !firstColumn && includesSymbol(lines[i - 1][match.index - 1]))
        || (!firstLine && includesSymbol(lines[i - 1].slice(match.index, match.index + match[0].length)))
        || (!firstLine && !lastColumn && includesSymbol(lines[i - 1][match.index + match[0].length]))
        || (!firstColumn && includesSymbol(lines[i][match.index - 1]))
        || (!lastColumn && includesSymbol(lines[i][match.index + match[0].length]))
        || (!lastLine && !firstColumn && includesSymbol(lines[i + 1][match.index - 1]))
        || (!lastLine && includesSymbol(lines[i + 1].slice(match.index, match.index + match[0].length)))
        || (!lastLine && !lastColumn && includesSymbol(lines[i + 1][match.index + match[0].length]))
      ) {
        total += parseInt(match[0]);
      }
    }
  }
  return total;
}

export function part2(): number {
  const lines = readData(3, 2);
  let total = 0;
  for (let i = 0; i < lines.length; i++) {
    const firstLine = i === 0;
    const lastLine = i === lines.length - 1;
    for (const asterisk of lines[i].matchAll(/\*/g)) {
      const neighbours = [];
      if (!firstLine) {
        neighbours.push(...findNeighbours(asterisk, lines[i - 1]));
      }
      neighbours.push(...findNeighbours(asterisk, lines[i]));
      if (!lastLine) {
        neighbours.push(...findNeighbours(asterisk, lines[i + 1]));
      }
      if (neighbours.length == 2) {
        total += neighbours[0] * neighbours[1];
      }
    }
  }
  return total;
};
