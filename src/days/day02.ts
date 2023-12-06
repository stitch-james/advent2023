import { readFileSync } from "fs";

interface Handful {
  red: number,
  green: number,
  blue: number,
}

interface Bag {
  red: number,
  green: number,
  blue: number,
}

interface Game {
  id: number,
  handfuls: Handful[],
}

function readData(): Game[] {
  const lines = readFileSync('src/data/day02.txt', 'utf8').trim().split('\n');
  return lines.map(readLine);
}

function readLine(line: string): Game {
  const [complete, idStr, handfulsStr] = line.match(/Game (\d+): (.*)/);
  const handfuls = handfulsStr.split('; ').map(readHandful);
  return {
    id: parseInt(idStr),
    handfuls,
  }
}

function readHandful(handfulStr: string): Handful {
  const result = {
    red: 0,
    green: 0,
    blue: 0,
  };
  const redMatch = handfulStr.match(/(\d+) red/);
  if (redMatch) {
    result.red = parseInt(redMatch[1]);
  }
  const blueMatch = handfulStr.match(/(\d+) blue/);
  if (blueMatch) {
    result.blue = parseInt(blueMatch[1]);
  }
  const greenMatch = handfulStr.match(/(\d+) green/);
  if (greenMatch) {
    result.green = parseInt(greenMatch[1]);
  }
  return result;
}

function isPossible(bag: Bag, game: Game): boolean {
  return (
    game
      .handfuls
      .every(handful => (
        handful.red <= bag.red
        && handful.blue <= bag.blue
        && handful.green <= bag.green
      ))
  );
}

function power(game: Game): number {
  const minimum = {
    red: Math.max(...game.handfuls.map(h => h.red)),
    blue: Math.max(...game.handfuls.map(h => h.blue)),
    green: Math.max(...game.handfuls.map(h => h.green)),
  };
  return minimum.red * minimum.blue * minimum.green;
}

export function part1(): number {
  const games = readData();
  const bag = {
    red: 12,
    green: 13,
    blue: 14,
  };
  return (
    games
      .filter(game => isPossible(bag, game))
      .reduce((prev, curr) => prev + curr.id, 0)
  );
}

export function part2(): number {
  const games = readData();
  return games.reduce((prev, curr) => prev + power(curr), 0);
}
