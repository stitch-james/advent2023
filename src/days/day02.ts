import { readFileSync } from "fs";

class Handful {
  red: number = 0
  green: number = 0
  blue: number = 0

  constructor(handfulStr: string) {
    this.red = 0;
    this.green = 0;
    this.blue = 0;
    const redMatch = handfulStr.match(/(\d+) red/);
    if (redMatch) {
      this.red = parseInt(redMatch[1]);
    }
    const greenMatch = handfulStr.match(/(\d+) green/);
    if (greenMatch) {
      this.green = parseInt(greenMatch[1]);
    }
    const blueMatch = handfulStr.match(/(\d+) blue/);
    if (blueMatch) {
      this.blue = parseInt(blueMatch[1]);
    }
  
  }
}

class Bag {
  red: number
  green: number
  blue: number

  constructor({red, green, blue}: {red: number, green: number, blue: number}) {
    this.red = red;
    this.green = green;
    this.blue = blue;
  }
}

class Game {
  id: number
  handfuls: Handful[]

  constructor(line: string) {
    const [complete, idStr, handfulsStr] = line.match(/Game (\d+): (.*)/);
    this.id = parseInt(idStr);
    this.handfuls = handfulsStr.split('; ').map(h => new Handful(h));
  }
}

function readData(): Game[] {
  const lines = readFileSync('src/data/day02.txt', 'utf8').trim().split('\n');
  return lines.map(l => new Game(l));
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
  const bag = new Bag({
    red: 12,
    green: 13,
    blue: 14,
  });
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
