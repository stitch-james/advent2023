import { readData } from "../../data";

interface MapRange {
  destinationRangeStart: number
  sourceRangeStart: number
  rangeLength: number
}

class Mapper {
  ranges: MapRange[] = [];

  map(source: number): number {
    for (let i = 0; i < this.ranges.length; i++) {
      const range = this.ranges[i];
      if (source >= range.sourceRangeStart && source < (range.sourceRangeStart + range.rangeLength)) {
        return (source - range.sourceRangeStart + range.destinationRangeStart);
      }
    }
    return source;
  }
}

class Almanac {
  seedToSoil: Mapper = new Mapper();
  soilToFertilizer: Mapper = new Mapper();
  fertilizerToWater: Mapper = new Mapper();
  waterToLight: Mapper = new Mapper();
  lightToTemperature: Mapper = new Mapper();
  temperatureToHumidity: Mapper = new Mapper();
  humidityToLocation: Mapper = new Mapper();

  constructor(lines: string[]) {
    let current = this.seedToSoil;
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line === '') {
        continue;
      }
      if (line === 'seed-to-soil map:') {
        current = this.seedToSoil;
      } else if (line === 'soil-to-fertilizer map:') {
        current = this.soilToFertilizer;
      } else if (line === 'fertilizer-to-water map:') {
        current = this.fertilizerToWater;
      } else if (line === 'water-to-light map:') {
        current = this.waterToLight;
      } else if (line === 'light-to-temperature map:') {
        current = this.lightToTemperature;
      } else if (line === 'temperature-to-humidity map:') {
        current = this.temperatureToHumidity;
      } else if (line === 'humidity-to-location map:') {
        current = this.humidityToLocation;
      } else {
        const [destinationRangeStart, sourceRangeStart, rangeLength] = line.split(' ').map(s => parseInt(s));
        current.ranges.push({
          destinationRangeStart,
          sourceRangeStart,
          rangeLength,
        });
      }
    }
  }

  seedToLocation(seed: number) {
    return this.humidityToLocation.map(
      this.temperatureToHumidity.map(
        this.lightToTemperature.map(
          this.waterToLight.map(
            this.fertilizerToWater.map(
              this.soilToFertilizer.map(
                this.seedToSoil.map(
                  seed
                )
              )
            )
          )
        )
      )
    )
  }
}

function readSeedsAndAlmanac(partInt: number): [number[], Almanac] {
  const lines = readData(5, partInt);
  const seeds = lines[0].split(': ')[1].split(' ').map(i => parseInt(i));
  return [seeds, new Almanac(lines.slice(2))];
}

export function part1(): number {
  const [seeds, almanac] = readSeedsAndAlmanac(1);
  const locations = seeds.map(seed => almanac.seedToLocation(seed));
  return Math.min(...locations);
}

export function part2(): number {
  return 0;
}
