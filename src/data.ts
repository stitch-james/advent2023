import { existsSync, readFileSync } from "fs";

export function readData(dayInt: number, partInt: number): string[] {
  const datadir = process.env.DATADIR || 'src/data';
  const pathPart = `${datadir}/day${String(dayInt).padStart(2, '0')}part${partInt}.txt`;
  if (existsSync(pathPart)) {
    return readFileSync(pathPart, 'utf-8').trim().split('\n');
  }
  const pathDay = `${datadir}/day${String(dayInt).padStart(2, '0')}.txt`;
  return readFileSync(pathDay, 'utf-8').trim().split('\n');
}
