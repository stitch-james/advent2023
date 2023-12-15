import * as day01 from "./days/day01";
import * as day02 from "./days/day02";
import * as day03 from "./days/day03";

interface Part {
  (): number,
}

export interface Day {
  part1: Part,
  part2: Part,
}

const days: Day[] = [
  day01,
  day02,
  day03,
];

const dayInt = parseInt(process.argv[2]);
const day = days[dayInt - 1];

console.log(`Day ${dayInt}`);
console.log(`Part 1: ${day.part1()}`);
console.log(`Part 2: ${day.part2()}`);
