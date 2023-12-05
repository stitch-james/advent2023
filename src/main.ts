import * as day01 from "./days/day01";

const days = [
  day01,
];

const dayInt = parseInt(process.argv[2]);
const day = days[dayInt - 1];

console.log(`Day ${dayInt}`);
console.log(`Part 1: ${day.part1()}`);
console.log(`Part 2: ${day.part2()}`);
