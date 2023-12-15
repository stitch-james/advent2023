import { Day } from "./main";
import * as day01 from "./days/day01";
import * as day02 from "./days/day02";
import * as day03 from "./days/day03";

interface TestInput {
  label: string,
  day: Day,
  part1: number,
  part2: number,
}

test.each([
  {label: 'day 01', day: day01, part1: 142, part2: 281},
  {label: 'day 02', day: day02, part1: 8, part2: 2286},
  {label: 'day 03', day: day03, part1: 4361, part2: 467835},
])('gets correct answer from example data, $label', ({ day, part1, part2 }: TestInput) => {
  expect(day.part1()).toBe(part1);
  expect(day.part2()).toBe(part2);
})
