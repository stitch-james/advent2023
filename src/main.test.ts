import { days } from "./main";

interface TestInput {
  dayInt: number,
  part1: number,
  part2: number,
}

const testValues: TestInput[] = [
  {dayInt: 1, part1: 142, part2: 281},
  {dayInt: 2, part1: 8, part2: 2286},
  {dayInt: 3, part1: 4361, part2: 467835},
  {dayInt: 4, part1: 13, part2: 30},
]

test.each(testValues)('gets correct answer from example data, day $dayInt', ({ dayInt, part1, part2 }: TestInput) => {
  const day = days[dayInt - 1];
  expect(day.part1()).toBe(part1);
  expect(day.part2()).toBe(part2);
})
