import * as day01 from "./days/day01";

const days = [
  day01,
];

const day = days[parseInt(process.argv[2]) - 1];

day.part1();
day.part2();
