import { readData } from "../../data";

class Scratchcard {
  index: number
  winningNumbers: number[]
  numbersYouHave: number[]

  constructor(line: string) {
    const [name, numbers] = line.split(/\:\s+/);
    this.index = parseInt(name.split(/\s+/)[1]);
    
    const [winning, have] = numbers.split(/\s+\|\s+/);
    this.winningNumbers = winning.split(/\s+/).map(n => parseInt(n));
    this.numbersYouHave = have.split(/\s+/).map(n => parseInt(n));
  }

  score(): number {
    const winning = this.winningNumbers.filter(n => this.numbersYouHave.includes(n));
    return winning.length;
  }
}

function readDataAsScratchcards(partInt: number): Scratchcard[] {
  return readData(4, partInt).map(line => new Scratchcard(line));
}

export function part1(): number {
  const scratchcards = readDataAsScratchcards(1);
  const points = scratchcards.map(card => card.score()).map(score => {
    if (score === 0) {
      return 0;
    }
    return 2 ** (score - 1);
  });
  return points.reduce((p, c) => p + c, 0);
}

export function part2(): number {
  const scratchcards = readDataAsScratchcards(2);
  const count = scratchcards.map(() => 1);
  for (let i = 0; i < scratchcards.length; i++) {
    const card = scratchcards[i];
    const score = card.score();
    for (let j = 0; j < score; j++) {
      count[i + j + 1] += count[i];
    }
  }
  return count.reduce((p, c) => p + c, 0);
}
