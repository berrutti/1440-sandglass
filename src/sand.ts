import { UPDATE_INTERVAL } from "./utils";

let clock: string[][];

const getNewClock = (): string[][] => [
  ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
  ['#', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '#'],
  ['#', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '#'],
  ['#', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '#'],
  ['#', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '#'],
  ['#', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '#'],
  ['-', '#', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '#', '-'],
  ['-', '-', '#', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '#', '-', '-'],
  ['-', '-', '-', '#', '.', '.', '.', '.', '.', '.', '.', '.', '.', '#', '-', '-', '-'],
  ['-', '-', '-', '-', '#', '.', '.', '.', '.', '.', '.', '.', '#', '-', '-', '-', '-'],
  ['-', '-', '-', '-', '-', '#', '#', '.', '.', '.', '#', '#', '-', '-', '-', '-', '-'],
  ['-', '-', '-', '-', '-', '-', '-', '#', '.', '#', '-', '-', '-', '-', '-', '-', '-'],
  ['-', '-', '-', '-', '-', '-', '-', '#', ' ', '#', '-', '-', '-', '-', '-', '-', '-'],
  ['-', '-', '-', '-', '-', '-', '-', '#', ' ', '#', '-', '-', '-', '-', '-', '-', '-'],
  ['-', '-', '-', '-', '-', '#', '#', ' ', ' ', ' ', '#', '#', '-', '-', '-', '-', '-'],
  ['-', '-', '-', '-', '#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#', '-', '-', '-', '-'],
  ['-', '-', '-', '#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#', '-', '-', '-'],
  ['-', '-', '#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#', '-', '-'],
  ['-', '#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#', '-'],
  ['#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#'],
  ['#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#'],
  ['#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#'],
  ['#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#'],
  ['#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#'],
  ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#']
];

const moveGrains = (clock: string[][], elapsedGrains: number): void => {
  let counter = 0;
  for (let i = 1; i < 12 && counter < elapsedGrains; i++) {
    for (let j = 1; j < 16 && counter < elapsedGrains; j++) {
      let aux = clock[i][j];
      clock[i][j] = clock[24 - i][j];
      clock[24 - i][j] = aux;
      counter++;
    }
  }
}

const updateClock = (clock: string[][]): void => {
  for (let i = 22; i > 0; i--) {
    for (let j = 1; j < 16; j++) {
      if (clock[i][j] === '.') {
        if (clock[i + 1][j] === ' ') {
          clock[i][j] = ' ';
          clock[i + 1][j] = 'U';
        } else {
          if (clock[i + 1][j - 1] === ' ') {
            clock[i][j] = ' ';
            clock[i + 1][j - 1] = 'U';
          } else if (clock[i + 1][j + 1] === ' ') {
            clock[i][j] = ' ';
            clock[i + 1][j + 1] = 'U';
          } else if (clock[i + 1][j - 2] === ' ') {
            clock[i][j] = ' ';
            clock[i + 1][j - 2] = 'U';
          } else if (clock[i + 1][j + 2] === ' ') {
            clock[i][j] = ' ';
            clock[i + 1][j + 2] = 'U';
          }
        }
      }
    }
  }
}

const cleanClock = (clock: string[][]): void => {
  for (let i = 1; i < 24; i++) {
    for (let j = 1; j < 16; j++) {
      if (clock[i][j] === 'U') {
        clock[i][j] = '.';
      }
    }
  }
}

const getClockString = (clock: string[][]): string => {
  let clockString = '';
  for (let i = 0; i < clock.length; i++) {
    clockString += clock[i].join('').replace(/-/g, ' ') + '\n';
  }
  return clockString;
}

export function getSandglassMatrixHTML(now: Date): string {
  const halfSeconds = Math.floor(now.getTime() / UPDATE_INTERVAL) % 120;
  if (!clock) {
    clock = getNewClock();
    moveGrains(clock, halfSeconds);
  }
  if (halfSeconds === 0) {
    clock = getNewClock();
  }
  updateClock(clock);
  cleanClock(clock);
  const clockString = getClockString(clock);
  return clockString;
}